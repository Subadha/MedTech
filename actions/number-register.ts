"use server";
import { RegisterwithPhoneSchema } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserByNumber, getUserOtp } from "@/data/user";

export const NumberRegister = async (values: z.infer<typeof RegisterwithPhoneSchema>) => {
  const validate = RegisterwithPhoneSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }

  const {name, role, phone,otp} = validate.data;

  const existingUser = await getUserByNumber(phone);
  if (existingUser) {
    return { error: "Mobile number already exists" };
  }  
  // const user = await getUserOtp(otp);
  // if (!user || !user.phone) {
  //   return { error: "Resend otp" };
  // }
  if(otp!='111111'){
    return { error: "Invalid Otp" };
  }
  const result= await db.user.create({
    data: {
      name,
      role,
      phone, 
      numberVerified:true
    },
  });
  if (result?.id) {    
    return { success: "Registered successfully" };
  }
  return { error: "Failed to send otp" };
};
