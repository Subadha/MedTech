import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  try {
    const body = await req.json();
    const { values, userId } = body;

    // Check if the user exists
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // Check if the doctor's availability details exist for the given user
    const existingAvailability = await db.doctorAvailabilityDetails.findFirst({
      where: { userId: userId },
    });

    if (!existingAvailability) {
      return NextResponse.json({
        error: "Doctor availability details do not exist for this user",
      });
    }

    // Update the existing doctor availability details
    const updatedResult = await db.doctorAvailabilityDetails.update({
      where: { id: existingAvailability.id },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ message: "Availability details updated successfully", data: updatedResult });
  } catch (error) {
    console.error("Error updating doctor availability details:", error);
    return NextResponse.json({ error: "Failed to update availability details", details: error });
  }
};
