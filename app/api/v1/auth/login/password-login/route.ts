import { login } from "@/actions/auth/login";
import { NextResponse } from "next/server";

export const POST = async(req:any)=>{
     try{
      const body = await req.json(); 
      const data = await login(body)
      return NextResponse.json(data);
     }catch(err){
        console.log(err);
        return NextResponse.json(err);
     }
}