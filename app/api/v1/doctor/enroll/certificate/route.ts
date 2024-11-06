import { cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import DataURIParser from "datauri/parser";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: any) => {
  try {
    const parser = new DataURIParser();
    const formData = await req.formData();

    // Extract fields from formData
    const userId = formData.get("userId");
    const registrationNumber1 = formData.get("registrationNumber1");
    const registrationNumber2 = formData.get("registrationNumber2");
    const image1 = formData.get("document1") as File;
    const image2 = formData.get("document2") as File;

    // Validate input
    if (!userId || !registrationNumber1 || !registrationNumber2) {
      return NextResponse.json({
        message: "User ID and registration numbers are required.",
        status: false,
      });
    }

    if (!image1 || !image2) {
      return NextResponse.json({
        message: "Both certificates are required.",
        status: false,
      });
    }

    // Check file types (optional)
    // if (image1.type !== "image/*" && image1.type !== "image/*") {
    //   return NextResponse.json({
    //     message: "Invalid file type for document1. Only PNG and JPEG are allowed.",
    //     status: false,
    //   });
    // }

    // if (image2.type !== "image/*" && image2.type !== "image/*") {
    //   return NextResponse.json({
    //     message: "Invalid file type for document2. Only PNG and JPEG are allowed.",
    //     status: false,
    //   });
    // }

    // Check file sizes (optional, e.g., limit to 2MB)
    const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    if (image1.size > MAX_SIZE || image2.size > MAX_SIZE) {
      return NextResponse.json({
        message: "File size for both documents must be less than 2MB.",
        status: false,
      });
    }

    // Check if profile already exists
    const existingProfile = await db.doctorLicense.findFirst({
      where: { userId: userId },
    });
    if (existingProfile) {
      return NextResponse.json({
        message: "Already added",
        status: false,
      });
    }

    // Handle image 1 upload
    const buffer1 = Buffer.from(await image1.arrayBuffer());
    const base64Image1 = parser.format(path.extname(image1.name).toString(), buffer1);
    if (!base64Image1.content) {
      return NextResponse.json({ status: false, message: "Failed to parse image 1" });
    }

    const createdImage1 = await cloudinary.uploader.upload(base64Image1.content, {
      resource_type: "image",
    });

    // Handle image 2 upload
    const buffer2 = Buffer.from(await image2.arrayBuffer());
    const base64Image2 = parser.format(path.extname(image2.name).toString(), buffer2);
    if (!base64Image2.content) {
      return NextResponse.json({ status: false, message: "Failed to parse image 2" });
    }

    const createdImage2 = await cloudinary.uploader.upload(base64Image2.content, {
      resource_type: "image",
    });

    // Create doctor license entry in the database
    const result = await db.doctorLicense.create({
      data: {
        userId: userId,
        imageUrl1: createdImage1?.secure_url,
        imageUrl2: createdImage2?.secure_url,
        registrationNumber1: registrationNumber1,
        registrationNumber2: registrationNumber2,
      },
    });

    if (result) {
      return NextResponse.json({ status: true, message: "Added Successfully" });
    }
    return NextResponse.json({ status: false, message: "Failed to add" });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ status: false, message: "An error occurred", details: error });
  }
};
