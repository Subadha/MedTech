import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Step 1: Fetch all doctors with their reviews
    const doctorsWithReviews = await db.user.findMany({
      where: {
        role: "DOCTOR",
        doctorLicenses: { documentsVerified: true },
      },
      include: {
        reviews: true,
        doctorProfile: true,
        doctorAvailabilityDetails: true,
      },
    });

    // Step 2: Calculate the average rating for each doctor
    const doctorsWithAverageRatings = doctorsWithReviews
    .filter((doctor) => doctor.reviews.length > 0) // Only include doctors with at least one review
    .map((doctor) => {
      const ratings = doctor.reviews.map((review) => parseFloat(review.rating));
      const averageRating =
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      
      return {
        ...doctor,
        averageRating,
      };
    });

    // Step 3: Sort doctors by average rating in descending order and select the top 3
    const top3Doctors = doctorsWithAverageRatings
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 3);

    // Step 4: Prepare the response format
    const top3DoctorsWithDetails = top3Doctors.map((doctor) => ({
      id: doctor.id,
      name: doctor.name,
      image: doctor.image,
      averageRating: doctor.averageRating,
      availabilityDetails: doctor.doctorAvailabilityDetails,
      doctorProfile: doctor.doctorProfile,
    }));

    return NextResponse.json({ data: top3DoctorsWithDetails });
  } catch (error) {
    console.error("Error in fetching top-rated doctors:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
