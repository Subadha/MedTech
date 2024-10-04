import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { appointmentId, rating, message }: any = body;

    const details = {
      rating:'true',
    };
    
    const appointment = await db.bookedAppointment.update({
      where: { id: appointmentId },
      data: details,
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" });
    }
    const patient = await getUserById(appointment.userId);
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" });
    }
    const doctor = await getUserById(appointment.doctor_id);
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" });
    }
    const review = await db.reviews.findFirst({where: { appointmentId: appointment.id }});
    if (review) {
      return NextResponse.json({ error: "Review is already added" });
    }
    const result = await db.reviews.create({
      data: {
        userId: doctor.id,
        patientId: patient?.id,
        message: message,
        appointmentId: appointment.id,
        rating: rating,
        patientName: patient?.name || "Unknown",
        patientProfilePic:
          patient?.image || "https://avatar.iran.liara.run/public",
      },
    });
    if (result) {
      return NextResponse.json({
        success: "Review added successfully",
        review: result,
      });
    }
    return NextResponse.json({ error: "Unable to add review" });
  } catch (erro) {
    console.log(erro);
    return NextResponse.json({ error: "Internal Error", erro });
  }
};
