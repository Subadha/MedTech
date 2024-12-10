import { NextResponse } from "next/server";
import { getUserByEmail } from "@/data/user";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { email } = body;

    let user;
    
    if (email) {
     user= await getUserByEmail(email)
    } else {
      return NextResponse.json({ error: "Invalid identifier type" }, { status: 400 });
    }

    if (!user) {
      return NextResponse.json({ error: "User does not exist or is using social login" }, { status: 404 });
    }
    return NextResponse.json({ success: "Login successful..", user:user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
