// /app/api/auth/new-password/route.ts
import { NextResponse } from "next/server";
import * as z from "zod";
import { NewPasswordSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-resset-token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token!" }, { status: 400 });
    }

    const validation = NewPasswordSchema.safeParse({ password });
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return NextResponse.json({ error: "Token has expired" }, { status: 400 });
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await db.passwordReset.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json(
      { success: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in new-password API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
