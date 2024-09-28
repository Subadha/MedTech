import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }
    const doctor = await db.user.findFirst({
      where: {
        id: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) {
      return NextResponse.json({error:"Doctor with ID ${id} not found."});
    }

    const profile = await db.doctorProfile.findFirst({
      where: {
        userId: doctor.id,
      },
    });

    const availability = await db.doctorAvailabilityDetails.findFirst({
      where: {
        userId: doctor.id,
      },
    });

    const liscense = await db.doctorLicense.findFirst({
      where: {
        userId: doctor.id,
      },
    });

    const doctorWithDetails = {
      profile:profile?true:false,
      availability:availability?true:false,
      liscense:liscense?true:false,
    };
    return NextResponse.json({success:"Success",data:doctorWithDetails});
  } catch (error) {
    console.error("Error fetching doctor with details:", error);
    return NextResponse.json({error:"Internal Error"});
  }
};
