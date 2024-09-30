import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const request = await req.json();
    const { userId } = request;

    // Get today's date in UTC, but strip the time part
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set time to 00:00 UTC to compare only the date

    const appointments = await db.bookedAppointment.findMany({
      where: {
        userId: userId,
        date: {
          gte: today, // Compare only from today's date in UTC
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    if (!appointments || appointments?.length === 0) {
      return NextResponse.json({ error: "No appointments found for this user." });
    }

    return NextResponse.json({ success: true, data: appointments });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
