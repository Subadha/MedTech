import { GetTrack } from "@/actions/tracker/getTrack";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId, patientId } = body;

    if (typeof userId !== "string" || !userId.trim()) {
      return NextResponse.json(
        { error: "Doctor userId is required" },
        { status: 400 }
      );
    }
    if (typeof patientId !== "string" || !patientId.trim()) {
      return NextResponse.json(
        { error: "patientId is required" },
        { status: 400 }
      );
    }

    const appointment = await db.bookedAppointment.findFirst({
      where: {
        doctor_id: userId,
        userId: patientId,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Patient not found or you do not have access to this patient" },
        { status: 403 }
      );
    }

    const result = await GetTrack(patientId);

    if ("error" in result) {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in doctor/patients/tracker/get:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
