import { COMPLETED } from "@/lib/constants";
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
      pass: "fdqv fzjl zxna qhmp", // Replace with your actual password or use an environment variable
    },
  });

  try {
    const body = await req.json();
    const { id } = body;

    const details = {
      status: COMPLETED,
    };

    // Update the appointment status
    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });

    // Fetch doctor and patient details
    const doctor = await db.user.findFirst({
      where: { id: appointment?.doctor_id },
    });
    const patient = await db.user.findFirst({
      where: { id: appointment?.userId },
    });

    if (doctor?.id) {
      await db.doctorProfile.update({
        where: { userId: doctor.id },
        data: {
          bookedAppointment: {
            increment: 1, // Increment bookedAppointment by 1
          },
        },
      });
    }

    // Ensure both doctor and patient have valid emails
    if (!doctor || !doctor.email || !patient || !patient.email) {
      return NextResponse.json({ success: "Appointment completed.", user: appointment });
    }

    // Prepare the email content for the doctor
    const doctorEmailContent = `
      <p>Dear ${doctor.name},</p>
      <p>We are pleased to inform you that your appointment with <strong>${appointment.name}</strong> has been successfully completed.</p>
      
      <div style="background-color: #f2f2f2; padding: 10px; border-radius: 8px; margin-top: 10px;">
        <p><strong>Appointment Details:</strong></p>
        <p><strong>Patient Name:</strong> ${appointment.name}</p>
        <p><strong>Appointment Date:</strong> ${appointment.date}</p>
      </div>

      <p>Thank you for your service, and we look forward to assisting you with future appointments.</p>

      <div style="font-size: 14px; color: #888888; margin-top: 20px; text-align: center;">
        <p>Best Regards,<br>The Medical Team</p>
      </div>
    `;

    // Prepare the email content for the patient
    const patientEmailContent = `
      <p>Dear ${patient.name},</p>
      <p>Your appointment with <strong>${doctor.name}</strong> has been successfully completed.</p>
      
      <div style="background-color: #f2f2f2; padding: 10px; border-radius: 8px; margin-top: 10px;">
        <p><strong>Appointment Details:</strong></p>
        <p><strong>Doctor's Name:</strong> ${doctor.name}</p>
        <p><strong>Appointment Date:</strong> ${appointment.date}</p>
      </div>

      <p>Thank you for choosing us for your healthcare needs. We look forward to seeing you again.</p>

      <div style="font-size: 14px; color: #888888; margin-top: 20px; text-align: center;">
        <p>Best Regards,<br>The Medical Team</p>
      </div>
    `;

    // Send email to the doctor
    await transporter.sendMail({
      from: "subadha.co.in@gmail.com",
      to: doctor.email,
      subject: "Appointment Completed",
      html: doctorEmailContent,
    });

    // Send email to the patient
    await transporter.sendMail({
      from: "subadha.co.in@gmail.com",
      to: patient.email,
      subject: "Appointment Completed",
      html: patientEmailContent,
    });

    return NextResponse.json({ success: "Appointment completed.", user: appointment });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to complete the appointment." });
  }
};
