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
      pass: "fdqv fzjl zxna qhmp", // Replace with your actual password or use environment variable
    },
  });

  try {
    const body = await req.json();    
    const { id, time, date } = body;

    // Fetch the current appointment details
    const currentAppointment = await db.bookedAppointment.findUnique({
      where: { id: id },
    });

    if (!currentAppointment) {
      return NextResponse.json({ error: "Appointment not found." });
    }

    const details = {
      time: time,
      date: date,
    };
    
    // Update the appointment with new details
    const appointment = await db.bookedAppointment.update({
      where: { id: id },
      data: details,
    });

    // Fetch doctor and patient details for sending emails
    const doctor = await db.user.findFirst({
      where: { id: appointment?.doctor_id },
    });
    const patient = await db.user.findFirst({
      where: { id: appointment?.userId },
    });

    // Ensure both doctor and patient have valid emails
    if (!doctor || !doctor.email || !patient || !patient.email) {
      return NextResponse.json({ success: "Appointment rescheduled.", user: appointment });
    }

    // Prepare the email content for the doctor
    const doctorEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Rescheduled</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 20px;
                  background-color: #f4f4f4;
              }
              .container {
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
              }
              .footer {
                  font-size: 12px;
                  color: #888;
                  text-align: center;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Appointment Rescheduled</h2>
              <p>Dear <strong>${doctor.name}</strong>,</p>
              <p>Your appointment with <strong>${patient.name}</strong> has been successfully rescheduled.</p>
              
              <h4>Previous Appointment Details:</h4>
              <p><strong>Date:</strong> ${currentAppointment.date}<br>
                 <strong>Time:</strong> ${currentAppointment.time}</p>

              <h4>New Appointment Details:</h4>
              <p><strong>Date:</strong> ${date}<br>
                 <strong>Time:</strong> ${time}</p>

              <p>Thank you for your understanding, and we look forward to seeing you.</p>
          </div>
          <div class="footer">
              <p>Best Regards,<br>The Medical Team</p>
          </div>
      </body>
      </html>
    `;

    // Prepare the email content for the patient
    const patientEmailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Rescheduled</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 0;
                  padding: 20px;
                  background-color: #f4f4f4;
              }
              .container {
                  background: #ffffff;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h2 {
                  color: #333;
              }
              p {
                  color: #555;
              }
              .footer {
                  font-size: 12px;
                  color: #888;
                  text-align: center;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Appointment Rescheduled</h2>
              <p>Dear <strong>${patient.name}</strong>,</p>
              <p>Your appointment with <strong>${doctor.name}</strong> has been successfully rescheduled.</p>
              
              <h4>Previous Appointment Details:</h4>
              <p><strong>Date:</strong> ${currentAppointment.date}<br>
                 <strong>Time:</strong> ${currentAppointment.time}</p>

              <h4>New Appointment Details:</h4>
              <p><strong>Date:</strong> ${date}<br>
                 <strong>Time:</strong> ${time}</p>

              <p>Thank you for your understanding, and we look forward to seeing you.</p>
          </div>
          <div class="footer">
              <p>Best Regards,<br>The Medical Team</p>
          </div>
      </body>
      </html>
    `;

    // Send email to the doctor
    await transporter.sendMail({
      from: "subadha.co.in@gmail.com",
      to: doctor.email,
      subject: "Appointment Rescheduled",
      html: doctorEmailContent,
    });

    // Send email to the patient
    await transporter.sendMail({
      from: "subadha.co.in@gmail.com",
      to: patient.email,
      subject: "Appointment Rescheduled",
      html: patientEmailContent,
    });

    if (appointment) {
      return NextResponse.json({ success: "Appointment rescheduled.", user: appointment });
    }
    return NextResponse.json({ error: "Failed to reschedule." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to reschedule the appointment." });
  }
};
