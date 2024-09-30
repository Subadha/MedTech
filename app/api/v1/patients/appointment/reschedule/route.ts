import { db } from "@/lib/db";

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
      return { success: "Appointment rescheduled.", user: appointment };
    }
    return { error: "Failed to book." };
  } catch (error) {
    console.log(error);
    return { error: "Failed to book the appointment." };
  }
};
