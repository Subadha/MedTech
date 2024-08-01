"use server";
import { LoginUsingOtpSchema } from "@/schema";
import { signIn } from "@/auth";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByNumber, getUserOtp } from "@/data/user";
export const  optlogin = async (values:z.infer<typeof LoginUsingOtpSchema>)=>{

    const validate = LoginUsingOtpSchema.safeParse(values);
    if(!validate.success){
        return{error : "Invalid Error"}
    }   
    
    const {phone,otp} = validate.data;


    const existingUser = await getUserByNumber(phone);

    if(!existingUser){
        return {error:"User Doesnt Exist"}
    }
    const user = await getUserOtp(otp)
    if(!user||user.phone!==existingUser.phone){
        return {error:"Invalid OTP"}
    }
    try {
        // await signIn("credentials",{
        //    
        //     redirectTo:DEFAULT_LOGIN_REDIRECT,
        // })
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error : "Invalid credentials"}
                default :
                    return {error :"Something went wrong"}
            }
        }
        throw error;
    }
}