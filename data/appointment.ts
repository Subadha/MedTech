import { db } from "@/lib/db";
import { Appointment } from "@prisma/client";

  export const getIsAppointmentByUserId = async (id: string): Promise<Appointment[] | null> => {
    try {
      if (!db || !db.appointment) {
        throw new Error('Database or appointment model is not defined');
      }
  
      const appointments = await db.appointment.findMany({
        where: {
          userId: id,
        },
      });
  
      return appointments;
    } catch (error) {
      console.error('Error fetching appointments by user ID:', error);
      return null;
    }
  };
  
  