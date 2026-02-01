import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export const POST = async (req: any) => {
  try {
    const { OAuth2Client } = await import("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { token } = await req.json();

    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid Google token");
    }

    const { email, name, picture, sub } = payload;

    // Check if the user already exists in the database
    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      // If the user does not exist, create a new user
      user = await db.user.create({
        data: {
          email,
          name,
          image: picture,
          emailVerified: new Date(),
        },
      });
    }

    // Return success response with the user data
    return NextResponse.json({
      success: "Logged in successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "An error occurred while logging in with Google",
    });
  }
};
