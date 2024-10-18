import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetch all doctors and sort them based on the number of booked appointments
    const recommendedDoctors = await db.doctorProfile.findMany({
      include: {
        user: {
          select: {
            image: true,
            name: true,
          },
        },
      },
    });

    // Sort the doctors and get the top 3
    const top3Doctors = recommendedDoctors
      .sort((a, b) => b.bookedAppointment - a.bookedAppointment)
      .slice(0, 3);

    const doctorDetailsPromises = top3Doctors.map(async (doctor) => {
      const availabilityDetails = await db.doctorAvailabilityDetails.findUnique({
        where: { userId: doctor.userId },
      });
      return { ...doctor, availabilityDetails };
    });

    const top3DoctorsWithDetails = await Promise.all(doctorDetailsPromises);

    return NextResponse.json({ data: top3DoctorsWithDetails });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
