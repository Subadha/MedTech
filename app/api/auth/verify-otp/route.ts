// /app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { onlyOtpVerify } from "@/schema/index";
import { getUserOtp, getUserByNumber } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = onlyOtpVerify.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.errors[0].message;
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { otp } = validation.data;
    const isValidOtp = await getUserOtp(otp.toString());

    if (isValidOtp) {
      const number = isValidOtp.phone;
      const user = await getUserByNumber(number);

      if (user && user.email) {
        const tokenData = await generatePasswordResetToken(user.email);
        return NextResponse.json(
          {
            success: "OTP verified successfully",
            token: tokenData?.token || null,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "User not found or email is missing." },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
