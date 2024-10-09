"use server"
import { db } from "@/lib/db";

export const getAllAppointment = async (id: string, role: string) => {
  let appointments;
  try {
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('Invalid ID format');
    }

    console.log("Role = ", role);

    if (role !== 'DOCTOR') {
      appointments = await db.bookedAppointment.findMany({
        where: { userId: id },
      });
    } else {
      appointments = await db.bookedAppointment.findMany({
        where: { doctor_id: id },
      });
    }

    const uniqueAppointmentsMap = new Map();

    const statusPriority = { confirmed: 1, completed: 2, 'not-confirm': 3,canceled:4 };

    for (const appointment of appointments) {
      const existingAppointment = uniqueAppointmentsMap.get(appointment.doctor_id);

      if (!existingAppointment) {
        uniqueAppointmentsMap.set(appointment.doctor_id, appointment);
      } else {
        if (statusPriority[appointment.status] < statusPriority[existingAppointment.status]) {
          uniqueAppointmentsMap.set(appointment.doctor_id, appointment);
        }
      }
    }

    const uniqueAppointments = Array.from(uniqueAppointmentsMap.values());

    console.log("These are unique appointments:", uniqueAppointments);

    if (!appointments || appointments.length === 0) {
      return { success: true, message: "No appointments found for this user." };
    }

    return { success: true, data: appointments,updatedData: uniqueAppointments };

  } catch (err) {
    console.error("Error fetching appointments:", err);
    return { error: "Internal server error" };
  }
};
