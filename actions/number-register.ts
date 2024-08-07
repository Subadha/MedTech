"use server";
import { RegisterwithPhoneSchema } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByNumber, getUserOtp } from "@/data/user";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import twilio from "twilio";
import { generatePasswordResetToken } from "@/lib/tokens";

export const NumberRegister = async (
  values: z.infer<typeof RegisterwithPhoneSchema>
) => {
  const validate = RegisterwithPhoneSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }

  const { name, role, phone, otp } = validate.data;

  const existingUser = await getUserByNumber(phone);
  if (existingUser) {
    return { error: "Mobile number already exists" };
  }
  // const user = await getUserOtp(otp);
  // if (!user || !user.phone) {
  //   return { error: "Resend otp" };
  // }

  const isValidOtp = await getUserOtp(otp.toString());

  const valid = await db.otp.findFirst({
    where: {
      phone,
    },
  });

  if (valid) {
    const result = await db.user.create({
      data: {
        name,
        role,
        phone,
        numberVerified: true,
      },
    });
    if (result?.id) {
      return { success: "Registered successfully" };
    }
    return { error: "Failed to send otp" };
  }

};
