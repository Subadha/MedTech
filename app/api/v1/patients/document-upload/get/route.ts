import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
  try {
    // Parse the userId from the query parameters if available
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({
        status: false,
        message: "User ID is required to fetch data",
      });
    }

    // Fetch a single patient report from the database
    const patientReport = await db.patientReportsDoc.findFirst({
      where: { userId: userId },
    });

    if (!patientReport) {
      return NextResponse.json({
        status: false,
        message: "No report found for this user",
      });
    }

    return NextResponse.json({
      status: true,
      message: "Data fetched successfully",
      data: patientReport,
    });
  } catch (error) {
    return NextResponse.json({
      status: false,
      message: "An error occurred while fetching the data",
      error: error,
    });
  }
};
