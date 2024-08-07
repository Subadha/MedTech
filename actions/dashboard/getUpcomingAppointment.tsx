"use server"
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const getUpcomingAppointment = async (id: string) => {
  if (id) {
    const user = await getUserById(id);
    if (user) {
      const currentDateTime = new Date().toISOString();

      const appointments = await db.appointment.findMany({
        where: {
          userId: id,
          date: {
            gt: currentDateTime, 
          },
        },
        orderBy: {
          date: 'asc',
        },
      });
      return appointments;
    }
    return null;
  }
  return null;
};
