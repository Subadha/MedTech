"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }

  const { email, password, name, role, phone } = validate.data;
  const normalizedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(normalizedEmail);
  if (existingUser) {
    return { error: "Email already exists" };
  }

  const Val= await db.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      phone, 
    },
  });
 console.log(Val);
 
  const verificationToken = await getVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: "Confirmation email sent" };
};
