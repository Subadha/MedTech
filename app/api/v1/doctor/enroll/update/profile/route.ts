import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
  try {
    const body = await req.json();
    const { values, userId } = body;
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const existingProfile = await db.doctorProfile.findFirst({
      where: { userId: userId },
    });
    if (!existingProfile) {
      return NextResponse.json({
        error: "Doctor profile does not exist for this user",
      });
    }

    const result = await db.doctorProfile.update({
      where: { id: existingProfile.id },
      data: {
        ...values,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully", user: result });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return NextResponse.json({ error: "Failed to update profile", details: error });
  }
};
