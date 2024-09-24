import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const registrationNumber1 = formData.get("registrationNumber1");
    const registrationNumber2 = formData.get("registrationNumber2");
    const image1 = formData.get("document1") as File;
    const image2 = formData.get("document2") as File;
    console.log(registrationNumber2);
    
    if (!image1 || !image2) {
      return NextResponse.json(
        { error: "Certificate is required", data: null },
        { status: 400 }
      );
    }

    // const { values, userId } = body;
    // const user = await getUserById(userId);
    // if (!user) {
    //   return NextResponse.json({ error: "User not found" });
    // }

    // const existingProfile = await db.doctorLicense.findFirst({
    //   where: { userId: userId },
    // });
    // if (existingProfile) {
    //   return NextResponse.json({
    //     error: "Doctor profile already exists for this user",
    //   });
    // }

    // const result = await db.doctorLicense.create({
    //   data: {
    //     ...values,
    //     userId: userId,
    //   },
    // });
    return NextResponse.json(registrationNumber2);
  } catch (error) {
    return NextResponse.json(error);
  }
};
