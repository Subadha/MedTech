import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const request = await req.json();
    const { userId, status } = request;

    // Build query object conditionally, handle multiple statuses if passed as an array
    const query = {
      where: {
        userId: userId,
        ...(status && { status: Array.isArray(status) ? { in: status } : status }),  // Use 'in' for multiple statuses
      },
    };

    const appointments = await db.bookedAppointment.findMany(query);

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({ error: "No appointments found for this user." });
    }

    return NextResponse.json({ success: "Successfully fetched", data: appointments });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
