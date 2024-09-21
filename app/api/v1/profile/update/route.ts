import { updateProfile } from "@/actions/profile/updateProfile"
import { NextResponse } from "next/server"

export const POST= async(req:any)=>{
   const request= await req.json()
   const update = await updateProfile(request,request.userId)
   return NextResponse.json(update)
}