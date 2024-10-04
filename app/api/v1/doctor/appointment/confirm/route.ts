import { CONFIRMED } from "@/lib/constants";
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
      status:CONFIRMED,
    };
    
    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });
    const user = await db.user.findFirst({
        where: { id: appointment?.userId },
      });
      if(!user ||!user.email) {
        return  NextResponse.json({ success: "Appointment Confirmed.", user: appointment });
      }
      
      await transporter.sendMail({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Appointment Confirmed",
        html: `<p>Your Appointment with <strong>${appointment.doctorName}</strong> is confirmed by ${appointment.doctorName}.</p>`,
      });


    if (appointment) {
      return  NextResponse.json({ success: "Appointment Confirmed.", user: appointment });
    }
    return NextResponse.json({ error: "Failed to Confirmed." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to Confirmed the appointment." });
  }
};
