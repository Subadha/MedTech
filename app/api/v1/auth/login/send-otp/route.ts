import { loginOtp } from "@/actions/loginOtp";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json(); 
      const data = await loginOtp(body)
      return NextResponse.json(data);
     }catch(err){
        return NextResponse.json(err);
     }
}