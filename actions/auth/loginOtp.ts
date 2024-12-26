"use server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { ResetUsingNumber } from "@/schema";
import { getUserByNumber } from "@/data/user";
import twilio from "twilio";
import { db } from "@/lib/db";
import axios from "axios";

export const loginOtp = async (
  values: z.infer<typeof ResetUsingNumber>
) => {
  const validatedFields = ResetUsingNumber.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Enter a valid number" };
  }

  const { phone } = validatedFields.data;

  // Check if user exists with the provided phone number
  const existingUser = await getUserByNumber(phone);

  if (!existingUser) {
    return { error: "Number Not Register" };
  }

  // Generate a six-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    const sendOTP = async () => {
      const url = 'https://www.fast2sms.com/dev/bulkV2';
      const route = 'otp';
      const data = {
        variables_values: otp,
        route: route,
        numbers: phone,
      };
    
      try {
        const response = await axios.post(url, null, {
          headers: {
            authorization: process.env.F2S_API_KEY,
          },
          params: data,
        });
    
        console.log('Response:', response.data);
      } catch (error:any) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
    sendOTP()

await db.otp.deleteMany({
  where: {
    phone: phone,
  },
});

await db.otp.create({
  data: {
    phone: phone,
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
