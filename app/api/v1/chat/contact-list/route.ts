import { getAllAppointment } from "@/actions/appointment/getOppintments"
import { NextResponse } from "next/server"

export const POST =async(req:any)=>{
    try {
    const {userId,role}= await req.json()
       const data= await getAllAppointment(userId,role)
       return NextResponse.json({success:"Fetched",data:data})
    } catch (error) {
        console.log(error);
      return NextResponse.json({error:"Internal Server Error"})
    }
}