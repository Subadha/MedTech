import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, documentsVerified } = body as {
      userId: string;
      documentsVerified: boolean;
    };

    if (!userId || typeof documentsVerified !== "boolean") {
      return NextResponse.json(
        { error: "userId and documentsVerified (boolean) required" },
        { status: 400 }
      );
    }

    const license = await db.doctorLicense.findUnique({
      where: { userId },
    });

    if (!license) {
      return NextResponse.json(
        { error: "Doctor license not found" },
        { status: 404 }
      );
    }

    await db.doctorLicense.update({
      where: { userId },
      data: { documentsVerified },
    });

    return NextResponse.json({
      success: true,
      documentsVerified,
    });
  } catch (err) {
    console.error("Error updating doctor verification:", err);
    return NextResponse.json(
      { error: "Failed to update verification" },
      { status: 500 }
    );
  }
};
