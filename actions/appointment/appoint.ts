"use server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const BookAppointment = async (data:any) => {
  try {
    // Ensure the date string includes a time component
    const user = await getUserById(data.userId);
    if (!user) {
      return { error: "User not found." };
    }    
    console.log(user);
    console.log(data);
    const doctor = await db.user.findUnique({
      where: { id:data.doctor_id },
    })
    if (!doctor) {
      return { error: "Doctor not found." };
    }   
    console.log("doctor",doctor);
    
    // Construct date with time

    
  
    // Create the appointment record
    const appointment = await db.doctorAppointment.create({
      data: {
        userId: user.id,
        ...data,
        doctorName:doctor.name
      },
    });
    console.log(appointment);
    
    return { success: "Appointment successfully booked." };
  } catch (error) {
    return { error: "Failed to book the appointment." };
  }
};
