import { AuthenticationInput, AuthenticationResponse } from "@medusajs/framework/types";

export interface OtpAuthenticationInput extends AuthenticationInput {
  body: {
    customer_id: string;
  };
}

export interface OtpAuthResult {
  success: boolean;
  authIdentity?: any;
  error?: string;
}

export interface ProviderMetadata extends Record<string, unknown> {
  verified_at: string;
  auth_method: "otp";
  last_login?: string;
}

export interface UserMetadata extends Record<string, unknown> {
  phone_verified: boolean;
  customer_id: string;
}

export interface SetupOtpAuthInput {
  authIdentityId: string;
  customerId: string;
}
