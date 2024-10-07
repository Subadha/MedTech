"use server"
import crypto from "crypto";
import { ResetSchema } from "@/schema";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { db } from "@/lib/db";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const phone = existingUser.phone; // Assuming phone is a property of existingUser

  if (!phone) {
    return { error: "Phone number not found" };
  }

  const otp = crypto.randomInt(100000, 999999).toString();

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

  await sendPasswordResetMail(passwordResetToken.email, otp);

  // Optionally, you can send a password reset link instead of just an OTP
  // await sendPasswordReset(
  //   passwordResetToken.email,
  //   passwordResetToken.token
  // );

  return { sucess: "Reset mail sent" };
};
