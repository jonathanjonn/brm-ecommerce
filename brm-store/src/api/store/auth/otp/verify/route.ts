import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import verifOtpWorkflow from "../../../../../workflows/customer/verify-otp";
import { Modules } from "@medusajs/framework/utils";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { phone, otp } = req.body as { phone?: string; otp?: string };
  if (!phone || !otp)
    return res.status(400).json({ error: "Phone & code required" });

  const result = await verifOtpWorkflow(req.scope).run({
    input: { phone, otp },
  });
  const ok = result.result.verified;
  if (!ok) return res.status(401).json({ error: "Invalid or expired OTP" });

  // customerService bawaan Medusa
  const customerService = req.scope.resolve(Modules.CUSTOMER);
  const customers = await customerService.listCustomers({
    phone: phone,
  } as any);
  let customer = customers?.[0];
  if (!customer) {
    customer = await customerService.createCustomers({
      phone: phone,
      has_account: true, // Set has_account to true for OTP customers
    });
  }

  // Return customer info only, let frontend handle auth via sdk.auth.login()
  // This follows Medusa v2 pattern where frontend calls sdk.auth.login() with customer_id
  return res.json({ customer, ok });
}
