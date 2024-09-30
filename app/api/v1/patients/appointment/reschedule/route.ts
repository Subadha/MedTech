import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { id, time, date } = body;

    const details = {
      time: time as string,
      date: date,
    };

    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });
    if (appointment) {
      return  NextResponse.json({ success: "Appointment rescheduled.", user: appointment });
    }
    return NextResponse.json({ error: "Failed to book." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to book the appointment." });
  }
};
