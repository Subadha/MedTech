"use server"
import { db } from "@/lib/db";

export const getAllAppointment = async (id: string) => {
  try {
    console.log(id);
    
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('Invalid ID format');
    }

    const appointments = await db.bookedAppointment.findMany({
      where: { userId: id },
    });

    if (!appointments || appointments.length === 0) {
      return { success: true, message: "No appointments found for this user." };
    }

    return { success: true, data: appointments };
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return { error: "Internal server error" };
  }
};
