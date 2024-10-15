import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }

    const appointments = await db.bookedAppointment.findMany({
      where: { doctor_id: userId },
    });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No appointments found." });
    }

    // Extract unique patient userIds from the appointments and convert Set to an array
    const uniquePatientIds = Array.from(new Set(appointments.map(app => app.userId)));

    // Fetch details of all unique users
    const patients = await db.user.findMany({
      where: {
        id: {
          in: uniquePatientIds,
        },
      },
      include: {
        patientReportsDoc: true,
      }
    });

    return NextResponse.json({ success: "Success", data: patients });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
