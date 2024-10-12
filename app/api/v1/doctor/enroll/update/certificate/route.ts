import { getUserById } from "@/data/user";
import { cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import DataURIParser from "datauri/parser";
import { NextResponse } from "next/server";
import path from "path";

export const PUT = async (req: any) => {
  try {
    const parser = new DataURIParser();
    const formData = await req.formData();
    const userId = formData.get("userId");
    const registrationNumber1 = formData.get("registrationNumber1");
    const registrationNumber2 = formData.get("registrationNumber2");
    const image1 = formData.get("document1") as File;
    const image2 = formData.get("document2") as File;

    const existingProfile = await db.doctorLicense.findFirst({
      where: { userId: userId },
    });

    if (!existingProfile) {
      return NextResponse.json({
        message: "Doctor license details do not exist for this user",
        status: false,
      });
    }

    // Handle image deletion and upload using Promises
    const imageUploadPromises: Promise<any>[] = [];

    if (image1) {
      const buffer1 = Buffer.from(await image1.arrayBuffer());
      const base64Image1 = parser.format(path.extname(image1.name).toString(), buffer1);

      if (existingProfile.imageUrl1) {
        // Add deletion promise for the existing image
        imageUploadPromises.push(cloudinary.uploader.destroy(existingProfile.imageUrl1));
      }

      if (base64Image1.content) {
        // Add upload promise for the new image
        imageUploadPromises.push(
          cloudinary.uploader.upload(base64Image1.content, { resource_type: "image" })
        );
      }
    }

    if (image2) {
      const buffer2 = Buffer.from(await image2.arrayBuffer());
      const base64Image2 = parser.format(path.extname(image2.name).toString(), buffer2);

      if (existingProfile.imageUrl2) {
        // Add deletion promise for the existing image
        imageUploadPromises.push(cloudinary.uploader.destroy(existingProfile.imageUrl2));
      }

      if (base64Image2.content) {
        // Add upload promise for the new image
        imageUploadPromises.push(
          cloudinary.uploader.upload(base64Image2.content, { resource_type: "image" })
        );
      }
    }

    const [deleteImage1, deleteImage2, uploadImage1, uploadImage2] = await Promise.all(imageUploadPromises);

    const updatedData = {
      registrationNumber1: registrationNumber1 || existingProfile.registrationNumber1,
      registrationNumber2: registrationNumber2 || existingProfile.registrationNumber2,
      imageUrl1: uploadImage1 ? uploadImage1.secure_url : existingProfile.imageUrl1,
      imageUrl2: uploadImage2 ? uploadImage2.secure_url : existingProfile.imageUrl2,
    };

    const updatedProfile = await db.doctorLicense.update({
      where: { id: existingProfile.id },
      data: updatedData,
    });

    return NextResponse.json({ status: true, message: "Updated Successfully", data: updatedProfile });
  } catch (error) {
    console.error("Error updating doctor license details:", error);
    return NextResponse.json({ status: false, message: "Failed to update", details: error });
  }
};
