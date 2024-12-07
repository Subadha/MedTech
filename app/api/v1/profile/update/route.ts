"use server"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { registerOtp } from "@/actions/auth/registerOtp";

export const POST = async (req: any) => {
  try {
    const request = await req.json();
    const {
      email,
      name,
      password,
      city,
      country,
      phone,
      state,
      age,
      gender,
      about,
      userId,
    } = request;
    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await getUserById(userId);

    const updateData: any = {
      name,
      about,
      city,
      country,
      state,
      age,
      phone,
      gender,
      password: hashedPassword || user?.password,
      emailVerified: email ? null : user?.emailVerified,
      numberVerified: phone ? false : user?.numberVerified,
    };

    if (email) {
      const normalizedEmail = email.toLowerCase();
      await sendVerificationEmail(normalizedEmail);
    }
    if (phone) {
      await registerOtp(phone);
    }
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      success: "Profile updated successfully",
      user: updatedUser,
      phone:phone
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while updating the profile",
    });
  }
};
