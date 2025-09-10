import {
  createStep,
  createWorkflow,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";
import { randomInt } from "crypto";
import { Modules } from "@medusajs/framework/utils";

type Phone = { phone: string };
type formatPhone = { formattedPhone: string };

const formatPhone = createStep("format-phone", async ({ phone }: Phone) => {
  if (phone.startsWith("0")) return new StepResponse("62" + phone.slice(1));
  if (phone.startsWith("+62")) return new StepResponse(phone.slice(1));
  if (phone.startsWith("62")) return new StepResponse(phone);
  return new StepResponse("62" + phone);
});

// generate otp
const genOtp = createStep(
  "gen-otp",
  async ({ formattedPhone }: formatPhone, { container }) => {
    const redis = container.resolve(Modules.CACHE);
    const otp = randomInt(100000, 999999).toString();
    await redis.set(
      formattedPhone,
      otp,
      Number(process.env.OTP_TTL_SECONDS || 300),
    );
    return new StepResponse(otp);
  },
);

// send otp
const sendWa = createStep(
  "send-wa",
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try{
    await fetch(process.env.N8N_WHATSAPP_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    return new StepResponse(true);
    } catch (error) {
      console.error("Error sending OTP to webhook:", error);
      return new StepResponse(false);
    }
  },
);

// Hubungkan output -> input berikutnya
const sendOtpWorkflow = createWorkflow("send-otp", ({ phone }: Phone) => {
  const formattedPhone = formatPhone({ phone });
  const otp = genOtp({ formattedPhone });
  sendWa({ phone, otp });
  return new WorkflowResponse({ otp });
});

export default sendOtpWorkflow;
