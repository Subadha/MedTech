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

    if (!image1 && !image2) {
      return NextResponse.json({
        message: "At least one document is required",
        status: false,
      });
    }

    // Check if a patient report already exists for the user
    const existingReport = await db.patientReportsDoc.findFirst({
      where: { userId: userId },
    });

    let createdImage1, createdImage2;

    // Handle image1 if it is provided
    if (image1) {
      if (existingReport && existingReport.imageUrl1) {
        const publicId = extractPublicId(existingReport.imageUrl1);
        await cloudinary.uploader.destroy(publicId);
      }

      // Process new image1
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

      createdImage1 = await cloudinary.uploader.upload(base64Image1.content, {
        resource_type: "image",
      });
    }

    // Handle image2 if it is provided
    if (image2) {
      if (existingReport && existingReport.imageUrl2) {
        const publicId = extractPublicId(existingReport.imageUrl2);
        await cloudinary.uploader.destroy(publicId);
      }

      // Process new image2
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

      createdImage2 = await cloudinary.uploader.upload(base64Image2.content, {
        resource_type: "image",
      });
    }

    let result;
    if (existingReport) {
      // Update the existing report with the new images if they were uploaded
      result = await db.patientReportsDoc.update({
        where: { id: existingReport.id },
        data: {
          imageUrl1: createdImage1?.secure_url || existingReport.imageUrl1,
          imageUrl2: createdImage2?.secure_url || existingReport.imageUrl2,
        },
      });
    } else {
      // Create a new report entry if no existing report is found
      result = await db.patientReportsDoc.create({
        data: {
          userId: userId,
          imageUrl1: createdImage1?.secure_url || '',
          imageUrl2: createdImage2?.secure_url || '',
        },
      });
    }

    if (result) {
      return NextResponse.json({ status: true, message: "Added Successfully" });
    }

    return NextResponse.json({ status: false, message: "Failed to add" });
  } catch (error) {
    return NextResponse.json({ status: false, message: error });
  }
};

// Helper function to extract the public ID from the Cloudinary URL
const extractPublicId = (url: string) => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.split('.')[0]; // Removes the file extension to get the public ID
};
