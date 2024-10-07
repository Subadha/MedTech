import { getUserById } from "@/data/user";
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
      pass: "fdqv fzjl zxna qhmp", // Consider using an environment variable for security
    },
  });

  try {
    const body = await req.json();
    const { id, userId } = body;

    const doctor = await getUserById(userId);
    if (doctor?.role !== "DOCTOR") {
      return NextResponse.json({ error: "You are unauthorized." });
    }

    const details = {
      status: CONFIRMED,
    };

    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });

    const user = await db.user.findFirst({
      where: { id: appointment?.userId },
    });

    // Check if user has a valid email
    if (!user || !user.email) {
      return NextResponse.json({
        success: "Appointment Confirmed.",
        user: appointment,
      });
    }

    // Email content for the patient
    const patientEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #28a745;
            font-size: 24px;
          }
          p {
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
          }
          .appointment-info {
            background-color: #f2f2f2;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
          }
          .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Appointment Confirmed</h1>
          <p>Dear ${user.name},</p>
          <p>We are pleased to inform you that your appointment with <strong>${appointment.doctorName}</strong> has been confirmed.</p>
          
          <div class="appointment-info">
            <p><strong>Appointment Details:</strong></p>
            <p><strong>Doctor:</strong> ${appointment.doctorName}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
          </div>

          <p>If you have any questions or need to reschedule, please contact us.</p>

          <div class="footer">
            <p>Thank you for choosing our service.</p>
            <p>Best Regards,<br>The Medical Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email content for the doctor
    const doctorEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #28a745;
            font-size: 24px;
          }
          p {
            color: #333333;
            font-size: 16px;
            line-height: 1.6;
          }
          .appointment-info {
            background-color: #f2f2f2;
            padding: 10px;
            border-radius: 8px;
            margin-top: 10px;
          }
          .footer {
            font-size: 14px;
            color: #888888;
            margin-top: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Appointment Confirmed</h1>
          <p>Dear Dr. ${doctor.name},</p>
          <p>We are pleased to inform you that your appointment with <strong>${user.name}</strong> has been confirmed.</p>
          
          <div class="appointment-info">
            <p><strong>Appointment Details:</strong></p>
            <p><strong>Patient:</strong> ${user.name}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
          </div>

          <p>If you have any questions or need to reach out, please feel free to contact us.</p>

          <div class="footer">
            <p>Thank you for your dedication to our patients.</p>
            <p>Best Regards,<br>The Medical Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to the patient
    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Appointment Confirmed",
      html: patientEmailContent,
    });

    // Send email to the doctor
    if(doctor.email){await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: doctor.email,
      subject: "Appointment Confirmed",
      html: doctorEmailContent,
    });}

    if (appointment) {
      return NextResponse.json({
        success: "Appointment Confirmed.",
        user: appointment,
      });
    }
    return NextResponse.json({ error: "Failed to Confirm." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to Confirm the appointment." });
  }
};
