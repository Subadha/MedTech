import { getUserById } from "@/data/user";
import { cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import DataURIParser from "datauri/parser";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: any) => {
  try {
    const parser = new DataURIParser();
    const formData = await req.formData();
    const userId = formData.get("userId");
    const image1 = formData.get("document1") as File;
    const image2 = formData.get("document2") as File;

    if (!image1 || !image2) {
      return NextResponse.json({
        message: "Certificate is required",
        status: false,
      });
    }

    // Process image1
    const buffer1 = Buffer.from(await image1.arrayBuffer());
    const base64Image1 = parser.format(
      path.extname(image1.name).toString(),
      buffer1
    );

    if (!base64Image1.content) {
      return NextResponse.json({
        status: false,
        message: "Failed to parse document1",
      });
    }

    const createdImage1 = await cloudinary.uploader.upload(
      base64Image1.content,
      {
        resource_type: "image",
      }
    );

    // Process image2
    const buffer2 = Buffer.from(await image2.arrayBuffer());
    const base64Image2 = parser.format(
      path.extname(image2.name).toString(),
      buffer2
    );

    if (!base64Image2.content) {
      return NextResponse.json({
        status: false,
        message: "Failed to parse document2",
      });
    }

    const createdImage2 = await cloudinary.uploader.upload(
      base64Image2.content,
      {
        resource_type: "image",
      }
    );

    const result = await db.patientReportsDoc.create({
      data: {
        userId: userId,
        imageUrl1: createdImage1?.secure_url,
        imageUrl2: createdImage2?.secure_url,
      },
    });

    console.log(result);

    if (result) {
      return NextResponse.json({ status: true, message: "Added Successfully" });
    }

    return NextResponse.json({ status: false, message: "Failed to add" });
  } catch (error) {
    return NextResponse.json(error);
  }
};
