import {
  createStep,
  createWorkflow,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";

type Input = { phone: string; otp: string };

const formatPhone = createStep("format-phone", async ({ phone }: { phone: string }) => {
  if (phone.startsWith("0")) return new StepResponse("62" + phone.slice(1));
  if (phone.startsWith("+62")) return new StepResponse(phone.slice(1));
  if (phone.startsWith("62")) return new StepResponse(phone);
  return new StepResponse("62" + phone);
});

// generate otp
const verif = createStep(
  "verif",
  async ({ phone, otp }: Input, { container }) => {
    const redis = container.resolve(Modules.CACHE);
    try {
      const cached = await redis.get(phone);
      const match = cached === otp;
      if (match) {
        await redis.invalidate(phone);
      }
      return new StepResponse(match);
    } catch (err) {
      console.error("Redis error (verify OTP):", err);
      return new StepResponse(false);
    }
  },
);

// Hubungkan output -> input berikutnya
const verifOtpWorkflow = createWorkflow(
  "verify-otp",
  ({ phone, otp }: Input) => {
    const formattedPhone = formatPhone({ phone });
    const verified = verif({ phone:formattedPhone, otp });
    return new WorkflowResponse({ verified });
  },
);

export default verifOtpWorkflow;
