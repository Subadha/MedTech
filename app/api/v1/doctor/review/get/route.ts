import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { doctorId }: any = body; // Extract doctorId from the request body

        if (!doctorId) {
            return NextResponse.json({ message: "No doctorId provided" });
        }

        // Fetch reviews by doctorId
        const reviews = await db.reviews.findMany({
            where: {
                userId: doctorId,
            },
            include: {
                patient: {
                  select: {
                    image: true,
                    name: true,
                  },
                },
              },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!reviews || reviews.length === 0) {
            return NextResponse.json({ message: "No reviews found for this doctor" });
        }

        // Return reviews if found
        return NextResponse.json({
            message: "Reviews fetched successfully",
            reviews
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ message: "Internal Server Error", error });
    }
};
