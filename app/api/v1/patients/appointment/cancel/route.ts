import { CANCELED } from "@/lib/constants";
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
    const { id } = body;

    const details = {
      status: CANCELED,
    };

    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });
    const doctor = await db.user.findFirst({
      where: { id: appointment?.doctor_id },
    });
    if (!doctor || !doctor.email) {
      return NextResponse.json({
        success: "Appointment canceled.",
        user: appointment,
      });
    }

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: doctor.email,
      subject: "Appointment canceled",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Canceled</title>
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
      color: #d9534f;
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
    <h1>Appointment Canceled</h1>
    <p>Dear Dr. ${doctor.name},</p>
    <p>We regret to inform you that your appointment with <strong>${appointment.name}</strong> has been canceled by the patient.</p>
    
    <div class="appointment-info">
      <p><strong>Appointment Details:</strong></p>
      <p><strong>Patient Name:</strong> ${appointment.name}</p>
      <p><strong>Appointment Date:</strong> ${appointment.date}</p>
      <p><strong>Reason:</strong> Patient request</p>
    </div>

    <p>If you have any questions, please contact us or the patient directly.</p>

    <div class="footer">
      <p>Best Regards,<br>The Medical Team</p>
    </div>
  </div>
</body>
</html>
`,
    });

    if (appointment) {
      return NextResponse.json({
        success: "Appointment canceled.",
        user: appointment,
      });
    }
    return NextResponse.json({ error: "Failed to canceled." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to canceled the appointment." });
  }
};
