"use server";
import { RegisterwithPhoneSchema } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByNumber } from "@/data/user";
import {sendOtp } from "@/lib/tokens";

export const NumberRegister = async (values: z.infer<typeof RegisterwithPhoneSchema>) => {
  const validate = RegisterwithPhoneSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }

  const {name, role, phone} = validate.data;

  const existingUser = await getUserByNumber(phone);
  if (existingUser) {
    return { error: "Mobile number already exists" };
  }  
  await db.user.create({
    data: {
      name,
      role,
      phone, 
    },
  });

  const result = await sendOtp(phone);
  if(result){
    return { success: "Otp send successfully" };
  }
  return { error: "Failed to send otp" };
};
