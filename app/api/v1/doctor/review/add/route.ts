import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const {patientId,doctorId,rating,message}:any = body
        const patient = await getUserById(patientId)
        const result = await db.reviews.create({
            data: {
              userId: doctorId,
              patientId:patientId,
              message:message,
              rating: rating,
              patientName:patient?.name|| "Unknown",
              patientProfilePic:patient?.image||'https://avatar.iran.liara.run/public'
            },
          });
        if (result){
            return NextResponse.json({message:"Review added successfully",review:result})
        }  
        return NextResponse.json({message:"Unable to add review"})
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({message:"Internal Error",error})
    }
}