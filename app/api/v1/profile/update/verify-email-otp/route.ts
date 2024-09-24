import { VerifyOtp } from "@/actions/auth/VerifyEmailOtp";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const data = await VerifyOtp(body.otp, body.email);
    if (data) {
      const user = await getUserByEmail(body.email);
      if (user) {
        const updatedUser = await db.user.update({
          where: { id: user.id },
          data: { emailVerified: Date.now().toString() },
        });
        return NextResponse.json({
          status: true,
          message: "Verified Successfully",
        });
      }
      return NextResponse.json({ status: false, message: "User not found" });
    }
    return NextResponse.json({ status: false, message: "Invalid values" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
