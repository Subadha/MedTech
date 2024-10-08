"use server"
import { db } from "@/lib/db";

export const  getAllAppointment = async (id: string,role:string) => {
  let appointments
  try {    
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('Invalid ID format');
    }
    console.log("Role = ",role)
if(role!='DOCTOR'){
    appointments = await db.bookedAppointment.findMany({
      where: { 
        userId: id ,
        // status:"confirmed"
      },   
    });
  }
  else{
     appointments = await db.bookedAppointment.findMany({
      where: { 
        doctor_id: id,
        // status:"confirmed"
       },
    });
  }

  const uniqueAppointments = Array.from(
    new Map(
      appointments
        .sort((a, b) => {  // Sort to prioritize 'confirmed' > 'completed' > others
          const statusPriority = { confirmed: 1, completed: 2, "not-confirm": 3 };
          return statusPriority[a.status] - statusPriority[b.status];
        })
        .map(appointment => [appointment.doctor_id, appointment])  // Map by doctor_id
    ).values()
  );
  

  console.log("These are unique Apoointments",uniqueAppointments);
  
  

  console.log("appointments = ",appointments)
    if (!appointments || appointments?.length === 0) {
      return { success: true, message: "No appointments found for this user." };
    }

    return { success: true, data: appointments, updatedData:uniqueAppointments };
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return { error: "Internal server error" };
  }
};
