import Patient from "@/app/(protected)/dashboard/patient/page";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST=async (req:any)=>{
    try{
        const request =await req.json()
        const {userId,status}=request
        const query:any = {
          where: {
            doctor_id: userId,
            ...(status && { status }),  
          },
          include: {
            patient: {
              select: {
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            date: 'asc', 
          },
        };
        const appointments = await db.bookedAppointment.findMany(query);
          if (!appointments || appointments?.length === 0) {
            return NextResponse.json({error: "No appointments found for this user." });
          }
          
          return NextResponse.json({ success:"Successfully fetched", data: appointments });
    }
    catch (err) {
        console.log(err);
        
        return NextResponse.json({error:"Internal server error"})
    }
}