import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { setAuthAppMetadataStep } from "@medusajs/core-flows";
import { SetupOtpAuthInput } from "../../modules/auth_otp/types";

/**
 * Workflow to set up authentication metadata for OTP-based auth identities.
 * 
 * This workflow configures the app_metadata.customer_id field in the auth identity,
 * which is essential for proper JWT actor_id mapping in Medusa v2.
 * 
 * @param input - Contains authIdentityId and customerId
 * @returns The updated auth identity with proper app_metadata
 */
const setupOtpAuthWorkflow = createWorkflow(
  "setup-otp-auth",
  (input: SetupOtpAuthInput) => {
    // Set app_metadata to link auth identity with customer for JWT actor_id mapping
    const authIdentity = setAuthAppMetadataStep({
      authIdentityId: input.authIdentityId,
      actorType: "customer",
      value: input.customerId,
    });

    return new WorkflowResponse({ authIdentity });
  }
);

export default setupOtpAuthWorkflow;
