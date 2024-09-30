import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id } = body;
    const availability = await db.doctorAvailabilityDetails.findFirst({
      where: { userId: id },
    });
    if (availability) {
      return NextResponse.json({
        success: "Fetched successfully",
        days: availability.availableDays,
      });
    }
    return NextResponse.json({ error: "Unable to find availability" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};
