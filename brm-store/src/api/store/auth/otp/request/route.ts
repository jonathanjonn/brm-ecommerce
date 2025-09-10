import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import sendOtpWorkflow from "../../../../../workflows/customer/send-otp";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { phone } = req.body as { phone?: string };
  if (!phone) return res.status(400).json({ error: "Phone is required" });

  const sendOtp = await sendOtpWorkflow(req.scope).run({ input: { phone } });

  // event audit (optional)
  // req.scope.eventBus_.emit("otp.sent", { phone });

  return res.json({ success: true, result: sendOtp.result });
}
