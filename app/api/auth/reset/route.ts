// /app/api/auth/reset/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { ResetSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = ResetSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = validation.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    const phone = existingUser.phone;

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number not found" },
        { status: 400 }
      );
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await db.otp.deleteMany({ where: { phone } });
    await db.otp.create({
      data: {
        phone,
        otp,
        expiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    await sendPasswordResetMail(email, otp);

    return NextResponse.json({ success: "Reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error in reset API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
