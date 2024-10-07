import { getUserById } from "@/data/user";
import { CANCELED, CONFIRMED } from "@/lib/constants";
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
    const { id, userId } = body;

    const doctor = await getUserById(userId);
    if (doctor?.role !== "DOCTOR") {
      return NextResponse.json({ error: "You are unauthorized." });
    }
    const details = {
      status: CANCELED,
    };

    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });
    const user = await db.user.findFirst({
      where: { id: appointment?.userId },
    });
    if (!user || !user.email) {
      return NextResponse.json({
        success: "Appointment Canceled.",
        user: appointment,
      });
    }

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Appointment Canceled",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Cancellation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #d9534f;
      font-size: 24px;
    }
    p {
      color: #333333;
      font-size: 16px;
    }
    .appointment-details {
      margin-top: 20px;
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #dddddd;
    }
    .appointment-details strong {
      color: #333333;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Appointment Canceled</h1>
    <p>Dear ${user?.name || "Patient"},</p>
    <p>We regret to inform you that your appointment with <strong>${
      appointment.doctorName
    }</strong> has been canceled.</p>
    
    <div class="appointment-details">
      <p><strong>Appointment ID:</strong> ${appointment.id}</p>
      <p><strong>Doctor Name:</strong> ${appointment.doctorName}</p>
      <p><strong>Scheduled Date:</strong> ${new Date(
        appointment.date
      ).toLocaleDateString()}</p>
    </div>

    <p>If you would like to reschedule, please visit our platform to book a new appointment.</p>
    
    <div class="footer">
      <p>Best regards,<br/>MedTech Team</p>
    </div>
  </div>
</body>
</html>
`,
    });

    if (appointment) {
      return NextResponse.json({
        success: "Appointment Canceled.",
        user: appointment,
      });
    }
    return NextResponse.json({ error: "Failed to Canceled." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to Canceled the appointment." });
  }
};
