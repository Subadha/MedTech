"use server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { ResetUsingNumber } from "@/schema";
import { getOtpData, getUserByNumber, getUserOtp } from "@/data/user";
import twilio from "twilio";
import { db } from "@/lib/db";

export const registerOtp1 = async (
  values: z.infer<typeof ResetUsingNumber>
) => {
  const validatedFields = ResetUsingNumber.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Enter a valid number" };
  }

  const { phone } = validatedFields.data;

  
  const otpData = await getOtpData(phone);

  console.log(otpData);
  

  const existingUser = await getUserByNumber(phone);

  if (existingUser?.numberVerified) {
    return { error: "Number Already Exists" };
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  try {
    if (otpData==null) {
      await db.otp.create({
        data: {
          phone,
          otp: otp,
          expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires after 10 minutes
        },
      });
    } else {
      await db.otp.update({
        where:{phone:phone},
        data: {
          phone,
          otp: otp,
          expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires after 10 minutes
        },
      });
    }

        await client.messages.create({
          body: `Your OTP is: ${otp}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        });

    return { success: "OTP sent!" };
  } catch (err) {
    console.log(err);
    return { error: "Could not send OTP" };
  }
};
