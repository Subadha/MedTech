import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req:any) => {
  try {
    const body = await req.json();    
    const { review, rating, name } = body;
    if (!review || !rating || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.PlatformReview.create({
      data: {
        rating: parseInt(rating), // Convert to string if `rating` is a number
        name: name,
        review: review,
      },
    });

   // Check if the review was successfully added
    if (result) {
      return NextResponse.json({
        success: "Review added successfully",
        review: result,
      });
    }

    return NextResponse.json({ error: "Unable to add review" }, { status: 500 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error", err:error }, { status: 500 });
  }
};
