import { optlogin } from "@/actions/otp-login";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json(); 
      const data = await optlogin(body)
      return NextResponse.json(data);
     }catch(err){
        console.log(err);
        
     }
}