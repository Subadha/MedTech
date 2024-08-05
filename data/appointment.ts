import { db } from "@/lib/db";
import { Appointment } from "@prisma/client";

export const getIsAppointmentByEmail = async (email: string,phone:string): Promise<Appointment | null> => {
    try {
      const appointment = await db.appointment.findUnique({
        where: {
            email_phone: { 
              email,
              phone,
            },
          },
      });
      return appointment;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  };