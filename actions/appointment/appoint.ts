"use server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { NOT_CONFIRM } from "@/lib/constants";
import nodemailer from "nodemailer";

export const BookAppointment = async (data: any) => {
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
    const user = await getUserById(data.userId);
    if (!user) {
      return { error: "User not found." };
    }

    const doctor = await db.user.findUnique({
      where: { id: data.doctor_id },
    });
    if (!doctor) {
      return { error: "Doctor not found." };
    }

    const details = {
      userId: user.id,
      doctor_id: doctor.id,
      time: data.time as string,
      date: data.date,
      slot: data.slot,
      doctorName: doctor.name ?? "",
      purpose: data.purpose as string,
      reschedule: "false",
      reviewed: "false",
      status: NOT_CONFIRM,
      mode: data.mode || "both",
      age: data.age,
      name: data.name as string,
      gender: data.gender as string,
    };

    const appointment = await db.bookedAppointment.create({
      data: details,
    });

    // Prepare the email content for the doctor
    const doctorEmailContent = `
      <p>Dear Dr. ${doctor.name},</p>
      <p>You have a new appointment scheduled with <strong>${user.name}</strong>.</p>
      
      <div style="background-color: #f2f2f2; padding: 10px; border-radius: 8px; margin-top: 10px;">
        <p><strong>Appointment Details:</strong></p>
        <p><strong>Patient Name:</strong> ${user.name}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Purpose:</strong> ${data.purpose}</p>
      </div>

      <p>Thank you for your service, and we look forward to seeing you.</p>

      <div style="font-size: 14px; color: #888888; margin-top: 20px; text-align: center;">
        <p>Best Regards,<br>The Medical Team</p>
      </div>
    `;

    // Prepare the email content for the patient
    const patientEmailContent = `
      <p>Dear ${user.name},</p>
      <p>Your appointment has been successfully booked with <strong>Dr. ${doctor.name}</strong>.</p>
      
      <div style="background-color: #f2f2f2; padding: 10px; border-radius: 8px; margin-top: 10px;">
        <p><strong>Appointment Details:</strong></p>
        <p><strong>Doctor's Name:</strong> Dr. ${doctor.name}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Purpose:</strong> ${data.purpose}</p>
      </div>

      <p>Thank you for choosing us for your healthcare needs. We look forward to seeing you.</p>

      <div style="font-size: 14px; color: #888888; margin-top: 20px; text-align: center;">
        <p>Best Regards,<br>The Medical Team</p>
      </div>
    `;

    // Send email to the doctor
    if (doctor.email) {
      await transporter.sendMail({
        from: "subadha.co.in@gmail.com",
        to: doctor.email,
        subject: "New Appointment Booked",
        html: doctorEmailContent,
      });
    }

    // Send email to the patient
    if (user.email) {
      await transporter.sendMail({
        from: "subadha.co.in@gmail.com",
        to: user.email,
        subject: "Appointment Confirmation",
        html: patientEmailContent,
      });
    }
    if (appointment) {
      return { success: "Appointment successfully booked.", user: appointment };
    }
    return { error: "Failed to book." };
  } catch (error) {
    console.log(error);
    return { error: "Failed to book the appointment." };
  }
};
