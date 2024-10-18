import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId, date } = body;

    // Validate user ID and date
    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }

    if (!date || isNaN(Date.parse(date))) {
      throw new Error("Invalid date format");
    }

    // Parse the date and set the range for the entire day
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0); // Start of the day

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999); // End of the day

    // Fetch appointments for the specific doctor and date range
    const appointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }},
        include: {
          patient: true, 
        },
      orderBy: {
        date: "asc", // Order appointments by ascending date and time
      },
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No appointments found for the selected date." });
    }

    return NextResponse.json({ success: "Success", data: appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
