import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const request = await req.json();
    const { userId } = request;

    // Query to fetch only doctor_name and date fields
    const appointments = await db.bookedAppointment.findMany({
      where: {
        userId: userId,
      },
      select: {
        doctorName: true, 
        date: true, 
      },
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No appointments found for this user." });
    }

    return NextResponse.json({ success:"Fetched all data", data: appointments });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
