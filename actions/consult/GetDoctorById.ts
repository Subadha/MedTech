"use server";

import { db } from "@/lib/db";

export const GetDoctorById = async (id: string) => {
  try {
    const doctor = await db.user.findFirst({
      where: {
        id: id,
        role: "DOCTOR",
      },
      include: {
        doctorProfile: true,
        doctorAvailabilityDetails: true,
        doctorLicenses: true
      },
    });
    const reviews = await db.reviews.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate total reviews and average rating
    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) /
          totalReviews
        : 0;

    if (!doctor) {
      console.error(`Doctor with ID ${id} not found.`);
      return null;
    }

    return {doctor,totalReviews, avgRating};
  } catch (error) {
    console.error("Error fetching doctor with details:", error);
    return null;
  }
};
