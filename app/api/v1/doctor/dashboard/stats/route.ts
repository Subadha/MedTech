import { getDoctorDashboardStats } from "@/actions/dashboard/doctorDashboardStats";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId } = body;
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    const result = await getDoctorDashboardStats(userId);
    if (!result.success) {
      return NextResponse.json(
        { error: result.message || "Failed to fetch stats" },
        { status: 500 }
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("Doctor dashboard stats API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
