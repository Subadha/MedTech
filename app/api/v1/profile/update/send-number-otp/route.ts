import { registerOtp } from "@/actions/auth/registerOtp";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json();
      const {phone} = body
      const data = await registerOtp(phone)
      return NextResponse.json({status:true, message:"Send Successfully"});
     }catch(err){
        console.log(err);     
     }
}