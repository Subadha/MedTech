"use server"

import { db } from "@/lib/db"

export const VerifyOtp = async(otp:string)=>{
   try {
     const result = await db.emailOtp.findFirst({
         where: {
           otp: otp, 
         },
       });
       if(result?.email){
         return result.email;
       }
       return null
   } catch (error) {
    console.log(error);
    
   }
}