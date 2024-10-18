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
    const removeImg1 = formData.get("removeImg1") === "true";
    const removeImg2 = formData.get("removeImg2") === "true";

    if (!image1 && !image2 && !removeImg1 && !removeImg2) {
      return NextResponse.json({
        message: "At least one document is required or removal should be specified",
        status: false,
      });
    }

    // Check if a patient report already exists for the user
    const existingReport = await db.patientReportsDoc.findFirst({
      where: { userId: userId },
    });

    let createdImage1, createdImage2;
    let imageUrl1 = existingReport?.imageUrl1 || '';
    let imageUrl2 = existingReport?.imageUrl2 || '';

    // Handle image1 if provided or if removal is requested
    if (removeImg1) {
      if (existingReport && existingReport.imageUrl1) {
        const publicId = extractPublicId(existingReport.imageUrl1);
        await cloudinary.uploader.destroy(publicId);
      }
      imageUrl1 = ''; // Set to null if removal is requested
    } else if (image1) {
      if (existingReport && existingReport.imageUrl1) {
        const publicId = extractPublicId(existingReport.imageUrl1);
        await cloudinary.uploader.destroy(publicId);
      }

      // Process new image1
      const buffer1 = Buffer.from(await image1.arrayBuffer());
      const base64Image1 = parser.format(path.extname(image1.name).toString(), buffer1);

      if (!base64Image1.content) {
        return NextResponse.json({
          status: false,
          message: "Failed to parse document1",
        });
      }

      createdImage1 = await cloudinary.uploader.upload(base64Image1.content, {
        resource_type: "image",
      });
      imageUrl1 = createdImage1.secure_url || '';
    }

    // Handle image2 if provided or if removal is requested
    if (removeImg2) {
      if (existingReport && existingReport.imageUrl2) {
        const publicId = extractPublicId(existingReport.imageUrl2);
        await cloudinary.uploader.destroy(publicId);
      }
      imageUrl2 = ''; // Set to null if removal is requested
    } else if (image2) {
      if (existingReport && existingReport.imageUrl2) {
        const publicId = extractPublicId(existingReport.imageUrl2);
        await cloudinary.uploader.destroy(publicId);
      }

      // Process new image2
      const buffer2 = Buffer.from(await image2.arrayBuffer());
      const base64Image2 = parser.format(path.extname(image2.name).toString(), buffer2);

      if (!base64Image2.content) {
        return NextResponse.json({
          status: false,
          message: "Failed to parse document2",
        });
      }

      createdImage2 = await cloudinary.uploader.upload(base64Image2.content, {
        resource_type: "image",
      });
      imageUrl2 = createdImage2.secure_url || '';
    }

    let result;
    if (existingReport) {
      // Update the existing report with the new images or nullify them if requested
      result = await db.patientReportsDoc.update({
        where: { id: existingReport.id },
        data: {
          imageUrl1: imageUrl1,
          imageUrl2: imageUrl2,
        },
      });
    } else {
      // Create a new report entry if no existing report is found
      result = await db.patientReportsDoc.create({
        data: {
          userId: userId,
          imageUrl1: imageUrl1,
          imageUrl2: imageUrl2,
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

const extractPublicId = (url: string) => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.split('.')[0]; 
};
