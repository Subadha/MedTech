import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
      const reviews = await db.platformReview.findMany({
        orderBy: { createdAt: 'desc' }, // Sort by creation date in descending order
      });
  
      return NextResponse.json({ reviews });
    } catch (error:any) {
      console.error(error);
      return NextResponse.json({ error: "Internal Error", details: error.message }, { status: 500 });
    }
  };