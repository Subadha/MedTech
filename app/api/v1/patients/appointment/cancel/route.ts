import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const POST = async (req: any) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "subadha.co.in@gmail.com",
          pass: "fdqv fzjl zxna qhmp",
        },
      });
  try {
    const body = await req.json();    
    const {id} = body;

    const details = {
      status:'Cancled'
    };
    
    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });
    const doctor = await db.user.findFirst({
        where: { id: appointment?.doctor_id },
      });
      if(!doctor ||!doctor.email) {
        return  NextResponse.json({ success: "Appointment canceled.", user: appointment });
      }
      console.log(doctor);
      
      await transporter.sendMail({
        from: "onboarding@resend.dev",
        to: doctor.email,
        subject: "OTP for verification",
        html: `<p>Your Appointment with <strong>${appointment.name}</strong> is canceled because of patient request.</p>`,
      });


    if (appointment) {
      return  NextResponse.json({ success: "Appointment canceled.", user: appointment });
    }
    return NextResponse.json({ error: "Failed to canceled." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to canceled the appointment." });
  }
};
