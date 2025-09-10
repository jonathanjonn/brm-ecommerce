import { AbstractAuthModuleProvider, MedusaError, isString } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/framework/types";
import {
  AuthIdentityProviderService,
  AuthenticationInput,
  AuthenticationResponse,
} from "@medusajs/framework/types";
import setupOtpAuthWorkflow from "../../workflows/auth/setup-otp-auth";
import {
  OtpAuthenticationInput,
  OtpAuthResult,
  ProviderMetadata,
  UserMetadata,
} from "./types";

type InjectedDependencies = {
  logger: Logger;
};

/**
 * OTP WhatsApp Authentication Provider for Medusa v2
 * 
 * Implements phone-based authentication using OTP verification via WhatsApp.
 * Creates and manages auth identities with proper app_metadata mapping for JWT generation.
 */
class OtpAuthProviderService extends AbstractAuthModuleProvider {
  static identifier = "auth_otp";
  static DISPLAY_NAME = "OTP WhatsApp Authentication";
  
  protected readonly logger_: Logger;

  constructor({ logger }: InjectedDependencies, options = {}) {
    super();
    this.logger_ = logger;
  }

  /**
   * Validates customer_id parameter from authentication input
   */
  private validateCustomerId(data: AuthenticationInput): string {
    const { customer_id } = data.body as { customer_id?: string };
    
    if (!customer_id || !isString(customer_id)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Customer ID is required and must be a string"
      );
    }
    
    return customer_id;
  }

  /**
   * Creates auth identity with provider identity for new customer
   */
  private async createAuthIdentity(
    customerId: string,
    authIdentityProviderService: AuthIdentityProviderService
  ): Promise<any> {
    this.logger_.info(`Creating new auth identity for customer: ${customerId}`);
    
    const providerMetadata: ProviderMetadata = {
      verified_at: new Date().toISOString(),
      auth_method: "otp",
    };
    
    const userMetadata: UserMetadata = {
      phone_verified: true,
      customer_id: customerId,
    };
    
    return await authIdentityProviderService.create({
      entity_id: customerId,
      provider_metadata: providerMetadata,
      user_metadata: userMetadata,
    });
  }

  /**
   * Sets up app_metadata for auth identity to enable proper JWT actor_id mapping
   */
  private async setupAuthMetadata(
    authIdentityId: string,
    customerId: string
  ): Promise<void> {
    this.logger_.debug(`Setting up auth metadata for identity: ${authIdentityId}`);
    
    try {
      await setupOtpAuthWorkflow().run({
        input: {
          authIdentityId,
          customerId,
        },
      });
      
      this.logger_.debug(`Successfully configured auth metadata`);
    } catch (error) {
      this.logger_.error(`Failed to setup auth metadata:`, error);
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to configure authentication metadata"
      );
    }
  }

  /**
   * Updates provider metadata with login timestamp
   */
  private async updateLoginMetadata(
    customerId: string,
    authIdentityProviderService: AuthIdentityProviderService,
    existingMetadata: any
  ): Promise<void> {
    try {
      await authIdentityProviderService.update(customerId, {
        provider_metadata: {
          ...existingMetadata,
          verified_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        },
      });
    } catch (error) {
      // Non-critical error - log but don't fail authentication
      this.logger_.warn(error);
    }
  }

  /**
   * Validates provider identity exists and matches customer
   */
  private validateProviderIdentity(authIdentity: any, customerId: string): any {
    const providerIdentity = authIdentity.provider_identities?.find(
      (pi: any) => pi.provider === this.provider
    );

    if (!providerIdentity) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No provider identity found for ${this.provider}`
      );
    }

    if (providerIdentity.entity_id !== customerId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Provider identity entity_id mismatch: expected ${customerId}, got ${providerIdentity.entity_id}`
      );
    }

    return providerIdentity;
  }

  async authenticate(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    try {
      const customerId = this.validateCustomerId(data);
      this.logger_.info(`OTP authenticate for customer: ${customerId}`);

      let authIdentity: any;
      let isNewIdentity = false;

      // Try to retrieve existing auth identity
      try {
        authIdentity = await authIdentityProviderService.retrieve({
          entity_id: customerId,
        });
        this.logger_.debug(`Found existing auth identity: ${authIdentity.id}`);
      } catch (error) {
        if (error.type === MedusaError.Types.NOT_FOUND) {
          // Create new auth identity if not found
          authIdentity = await this.createAuthIdentity(customerId, authIdentityProviderService);
          isNewIdentity = true;
        } else {
          throw error;
        }
      }

      // Setup app_metadata for new identities to enable JWT actor_id mapping
      if (isNewIdentity) {
        await this.setupAuthMetadata(authIdentity.id, customerId);
        
        // Retrieve updated auth identity with app_metadata
        authIdentity = await authIdentityProviderService.retrieve({
          entity_id: customerId,
        });
      }

      // Validate provider identity
      const providerIdentity = this.validateProviderIdentity(authIdentity, customerId);

      // Update login metadata for existing identities
      if (!isNewIdentity) {
        await this.updateLoginMetadata(
          customerId,
          authIdentityProviderService,
          providerIdentity.provider_metadata
        );
      }

      this.logger_.info(`✅ OTP authentication successful for customer: ${customerId}`);

      return {
        success: true,
        authIdentity: JSON.parse(JSON.stringify(authIdentity)), // Clean copy
      };
    } catch (error) {
      this.logger_.error(`OTP authentication failed:`, error);
      
      return {
        success: false,
        error: error instanceof MedusaError ? error.message : "Authentication failed",
      };
    }
  }

  /**
   * Registers a new customer for OTP authentication
   * 
   * Note: For OTP authentication, registration and authentication are typically
   * the same process since verification happens via OTP.
   */
  async register(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    try {
      const customerId = this.validateCustomerId(data);
      this.logger_.info(`OTP register for customer: ${customerId}`);

      // Check if auth identity already exists
      try {
        await authIdentityProviderService.retrieve({
          entity_id: customerId,
        });
        
        return {
          success: false,
          error: "Authentication identity already exists for this customer",
        };
      } catch (error) {
        if (error.type === MedusaError.Types.NOT_FOUND) {
          // Create new auth identity with registration metadata
          const authIdentity = await this.createAuthIdentity(customerId, authIdentityProviderService);
          
          // Setup app_metadata for proper JWT mapping
          await this.setupAuthMetadata(authIdentity.id, customerId);
          
          this.logger_.info(`✅ Successfully registered customer: ${customerId}`);
          
          return {
            success: true,
            authIdentity: JSON.parse(JSON.stringify(authIdentity)),
          };
        } else {
          throw error;
        }
      }
    } catch (error) {
      this.logger_.error(`OTP registration failed:`, error);
      
      return {
        success: false,
        error: error instanceof MedusaError ? error.message : "Registration failed",
      };
    }
  }

  /**
   * Updates provider metadata for an existing auth identity
   */
  async update(
    data: Record<string, unknown>,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    try {
      const { customer_id } = data;
      
      if (!customer_id || !isString(customer_id)) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Customer ID is required for update operation"
        );
      }

      this.logger_.info(`Updating provider metadata for customer: ${customer_id}`);

      const authIdentity = await authIdentityProviderService.retrieve({
        entity_id: customer_id,
      });

      await authIdentityProviderService.update(customer_id, {
        provider_metadata: {
          updated_at: new Date().toISOString(),
        },
      });

      return {
        success: true,
        authIdentity,
      };
    } catch (error) {
      this.logger_.error(`Provider update failed:`, error);
      
      return {
        success: false,
        error: error instanceof MedusaError ? error.message : "Update failed",
      };
    }
  }

  /**
   * Validates authentication callback
   * 
   * OTP authentication is a direct method and doesn't require callback validation
   * since verification happens immediately through OTP codes.
   */
  async validateCallback(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    this.logger_.warn("Callback validation attempted for OTP authentication");
    
    return {
      success: false,
      error: "Callback validation is not supported for OTP authentication. Use direct authentication instead.",
    };
  }
}

export default OtpAuthProviderService;
