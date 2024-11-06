"use server"
import { db } from '@/lib/db';

export const IsDoctorEnrolled = async (id:any) => {
  try {
    if (!id) {
      return {
        profile: false,
        availability: false,
        license: false,
      };
    }
  
    const profile = await db.doctorProfile.findFirst({
      where: {
        userId: id,
      },
    });
  
    const availability = await db.doctorAvailabilityDetails.findFirst({
      where: {
        userId: id,
      },
    });
  
    const license = await db.doctorLicense.findFirst({
      where: {
        userId: id,
      },
    });
  
    return {
      profile: !!profile,       
      availability: !!availability, 
      license: !!license,       
    };
  } catch (error) {
    console.log(error);  
  }
};
