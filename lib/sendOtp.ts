import crypto from "node:crypto";
import twilio from "twilio";
import { db } from "@/lib/db";

export const sendOtp = async (phone: string) => {
  try {
    const otp = (crypto.randomBytes(3).readUIntBE(0, 3) % 1000000)
      .toString()
      .padStart(6, "0");
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    await db.otp.create({
      data: {
        phone,
        otp: otp,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    return { success: "OTP sent!" };
  } catch (err) {
    console.log(err);
    return { error: "Could not send OTP" };
  }
};
