"use server";

import { Appointment } from "@/schema";
import * as z from "zod";
import { db } from "@/lib/db";

export const book = async (values: z.infer<typeof Appointment>) => {
  try {
    // Parse and validate input data
    const data = Appointment.parse(values);

    // Ensure the date string includes a time component
    const dateWithTime = new Date(`${data.date}T00:00:00Z`).toISOString();

    // Create the appointment record
    const appointment = await db.appointment.create({
      data: {
        ...data,
        date: dateWithTime, // Ensuring full ISO-8601 format
      },
    });

    return { success: "Appointment successfully booked." };
  } catch (error) {
    console.error(error);
    return { error: "Failed to book the appointment." };
  }
};
