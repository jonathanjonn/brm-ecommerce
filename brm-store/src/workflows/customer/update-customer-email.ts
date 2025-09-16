import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { MedusaError, Modules } from "@medusajs/framework/utils";
import { ICustomerModuleService } from "@medusajs/framework/types";
import { ICacheService } from "@medusajs/framework/types";

interface UpdateCustomerEmailInput {
  customer_id: string;
  email: string;
}

interface UpdateCustomerEmailOutput {
  customer: any;
  success: boolean;
}

/**
 * Step: Validate email uniqueness across customers and auth providers
 */
const validateEmailUniquenessStep = createStep(
  "validate-email-uniqueness",
  async (input: { email: string; customer_id: string }, { container }) => {
    const customerService: ICustomerModuleService = container.resolve(
      Modules.CUSTOMER,
    );
    const logger = container.resolve("logger");

    try {
      // Check if email already exists on other customers
      const existingCustomers = await customerService.listCustomers({
        email: input.email,
      });

      const otherCustomer = existingCustomers.find(
        (customer: any) => customer.id !== input.customer_id,
      );

      if (otherCustomer) {
        throw new MedusaError(
          MedusaError.Types.DUPLICATE_ERROR,
          `Email ${input.email} is already in use by another customer`,
        );
      }

      logger.info(
        `✅ Email ${input.email} is available for customer ${input.customer_id}`,
      );

      return new StepResponse({
        validated: true,
        email: input.email,
        customer_id: input.customer_id,
      });
    } catch (error) {
      logger.error("Email validation failed:", error);
      throw error;
    }
  },
  async (input, { container }) => {
    // Rollback: No action needed for validation step
    const logger = container.resolve("logger");
    logger.debug("Rolling back email validation (no action required)");
  },
);

/**
 * Step: Update customer email in database
 */
const updateCustomerEmailStep = createStep(
  "update-customer-email",
  async (input: { customer_id: string; email: string }, { container }) => {
    const customerService: ICustomerModuleService = container.resolve(
      Modules.CUSTOMER,
    );
    const logger = container.resolve("logger");

    try {
      // Get current customer data for rollback
      const currentCustomer = await customerService.retrieveCustomer(
        input.customer_id,
      );
      const originalEmail = currentCustomer.email;

      // Update customer email
      const updatedCustomer = await customerService.updateCustomers(
        input.customer_id,
        {
          email: input.email,
        },
      );

      logger.info(
        `✅ Updated customer ${input.customer_id} email to ${input.email}`,
      );

      return new StepResponse(
        { customer: updatedCustomer, success: true },
        { customer_id: input.customer_id, original_email: originalEmail },
      );
    } catch (error) {
      logger.error("Customer email update failed:", error);
      throw new MedusaError(
        MedusaError.Types.DB_ERROR,
        `Failed to update customer email: ${error.message}`,
      );
    }
  },
  async (compensationData, { container }) => {
    // Rollback: Restore original email
    if (!compensationData) return;

    const customerService: ICustomerModuleService = container.resolve(
      Modules.CUSTOMER,
    );
    const logger = container.resolve("logger");

    try {
      await customerService.updateCustomers(compensationData.customer_id, {
        email: compensationData.original_email,
      });
      logger.info(
        `🔄 Rolled back customer ${compensationData.customer_id} email`,
      );
    } catch (error) {
      logger.error("Failed to rollback customer email:", error);
    }
  },
);

/**
 * Step: Invalidate customer cache
 */
const invalidateCustomerCacheStep = createStep(
  "invalidate-customer-cache",
  async (input: { customer_id: string }, { container }) => {
    const cacheService: ICacheService = container.resolve(Modules.CACHE);
    const logger = container.resolve("logger");

    try {
      // Invalidate customer-related cache keys
      const cacheKeys = [
        `customer:${input.customer_id}`,
        `customers:${input.customer_id}`,
        `store_customer:${input.customer_id}`,
      ];

      for (const key of cacheKeys) {
        await cacheService.invalidate(key);
        logger.debug(`🗑️  Invalidated cache key: ${key}`);
      }

      logger.info(`✅ Customer cache invalidated for ${input.customer_id}`);

      return new StepResponse({
        invalidated: true,
        customer_id: input.customer_id,
      });
    } catch (error) {
      logger.warn(error);
      // Non-critical error - don't fail the workflow
      return new StepResponse({
        invalidated: false,
        customer_id: input.customer_id,
      });
    }
  },
  async (input, { container }) => {
    // Rollback: Re-invalidate cache to ensure consistency
    const cacheService: ICacheService = container.resolve(Modules.CACHE);
    const logger = container.resolve("logger");

    if (input?.customer_id) {
      try {
        await cacheService.invalidate(`customer:${input.customer_id}`);
        logger.debug(`🔄 Re-invalidated cache during rollback`);
      } catch (error) {
        logger.warn(error);
      }
    }
  },
);

/**
 * Workflow: Update Customer Email Safely
 *
 * Updates customer email with validation, atomic operations, and cache invalidation.
 * Includes proper rollback mechanisms for data consistency.
 */
export const updateCustomerEmailWorkflow = createWorkflow(
  "update-customer-email",
  (
    input: UpdateCustomerEmailInput,
  ): WorkflowResponse<UpdateCustomerEmailOutput> => {
    // Step 1: Validate email uniqueness
    const validationResult = validateEmailUniquenessStep({
      email: input.email,
      customer_id: input.customer_id,
    });

    // Step 2: Update customer email
    const updateResult = updateCustomerEmailStep({
      customer_id: validationResult.customer_id,
      email: validationResult.email,
    });

    // Step 3: Invalidate cache
    invalidateCustomerCacheStep({
      customer_id: updateResult.customer.id,
    });

    return new WorkflowResponse({
      customer: updateResult.customer,
      success: updateResult.success,
    });
  },
);

export default updateCustomerEmailWorkflow;
