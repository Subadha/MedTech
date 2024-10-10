import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId, rangeType } = body;

    // Validate user ID
    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }

    // Use today's date by default
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setUTCHours(0, 0, 0, 0); // Set to start of the day

    let endDate = new Date(today);

    // Set the end date based on the range type
    switch (rangeType) {
      case "daily":
        endDate.setUTCHours(23, 59, 59, 999); // End of the day
        break;
      case "weekly":
        endDate.setDate(endDate.getDate() + 6); // Add 6 days to include today for a week
        endDate.setUTCHours(23, 59, 59, 999);
        break;
      case "15-days":
        endDate.setDate(endDate.getDate() + 14); // Add 14 days to include today for a total of 15 days
        endDate.setUTCHours(23, 59, 59, 999);
        break;
      default:
        throw new Error("Invalid range type. Valid options are 'daily', 'weekly', or '15-days'.");
    }

    // Fetch appointments for the specific doctor and date range
    const appointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: userId,
        date: {
          gte: startOfDay,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc", // Order appointments by ascending date and time
      },
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No appointments found for the selected date range." });
    }

    return NextResponse.json({ success: "Success", data: appointments });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
