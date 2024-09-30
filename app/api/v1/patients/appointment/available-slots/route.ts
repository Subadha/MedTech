import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { id, date } = body;

    const appointment = await db.bookedAppointment.findFirst({
      where: {
        id: id,
      },
    });

    const availability = await db.doctorAvailabilityDetails.findFirst({
      where: { userId: appointment?.doctor_id },
    });

    // Get the available time slots for the doctor
    const allSlots = availability?.availableTimeSlot;

    if (!allSlots) {
      return NextResponse.json({ error: "No available slots found" });
    }

    // Fetch the booked appointments for the doctor on the given date
    const bookedAppointments = await db.bookedAppointment.findMany({
      where: { doctor_id:appointment?.doctor_id, date: date },
      select: {
        time: true, 
      },
    });

    // Get the array of booked times
    const bookedSlots = bookedAppointments.map(appointment => appointment.time);

    // Filter out the booked slots from the available slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    return NextResponse.json({
      success: "Fetched successfully",
      availableSlots: availableSlots,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
};
