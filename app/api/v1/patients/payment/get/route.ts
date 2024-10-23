import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const date = req.nextUrl.searchParams.get("date");

    if (!userId) {
      return NextResponse.json(
        { message: "userId is required", success: false },
        { status: 400 }
      );
    }

    let startDate, endDate;
    if (date) {
      startDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0); 
      endDate = new Date(date);
      endDate.setUTCHours(23, 59, 59, 999); 

      // startDate = new Date(startDate.getTime() + 5.5 * 60 * 60 * 1000);
      // endDate = new Date(endDate.getTime() + 5.5 * 60 * 60 * 1000);
    }

    const payments = await db.payment.findMany({
      where: {
       patientId: userId,
        ...(date && {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        }),
      },
      include: {
        doctor: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: payments },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { message: "Failed to fetch payments.", success: false },
      { status: 500 }
    );
  }
}
