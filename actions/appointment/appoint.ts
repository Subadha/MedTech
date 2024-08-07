"use server";
import { Appointment } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getIsAppointmentByUserId } from "@/data/appointment";
import { getUserByEmail } from "@/data/user";

export const book = async (values: z.infer<typeof Appointment>) => {
  try {
    // Parse and validate input data
    const data = Appointment.parse(values);    
    // Ensure the date string includes a time component
    const user = await getUserByEmail(data.email);
    if (!user) {
      return { error: "User not found." };
    }    
    // Construct date with time
    const dateWithTime = new Date(`${data.date}T00:00:00Z`).toISOString();
    
    // Fetch existing appointments for the user on the specified date
    const appointmentsForUser = await getIsAppointmentByUserId(user.id);
    if (!appointmentsForUser) {
      return { error: "Failed to fetch appointments." };
    }
    
    // Filter appointments for the specified date
    const appointmentsToday = appointmentsForUser.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toISOString().slice(0, 10) === dateWithTime.slice(0, 10);
    });
    
    if (appointmentsToday.length >= 2) {
      return { error: "You already have two appointments on this date." };
    }
    
    // Create the appointment record
    const appointment = await db.appointment.create({
      data: {
        userId: user.id,
        ...data,
        date: dateWithTime, // Ensuring full ISO-8601 format
      },
    });
    
    return { success: "Appointment successfully booked." };
  } catch (error) {
    return { error: "Failed to book the appointment." };
  }
};
