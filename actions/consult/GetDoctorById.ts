"use server";

import { db } from "@/lib/db";

export const GetDoctorById = async (id: string) => {
  try {
    const doctor = await db.user.findFirst({
      where: {
        id: id,
        role: 'DOCTOR',
      },
      include: {
        doctorProfile: true,
        doctorAvailabilityDetails: true,
        reviews: true        
      },
      
    });

    if (!doctor) {
      console.error(`Doctor with ID ${id} not found.`);
      return null;
    }

    return doctor;
  } catch (error) {
    console.error('Error fetching doctor with details:', error);
    return null;
  }
};
