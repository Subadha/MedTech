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
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }  
    const existingProfile: any = await db.doctorLicense.findFirst({
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
    let deleteImage1Promise;
    let uploadImage1Promise;
    let deleteImage2Promise;
    let uploadImage2Promise;

    // Handle image1
    if (image1) {
      const buffer1 = Buffer.from(await image1.arrayBuffer());
      const base64Image1 = parser.format(
        path.extname(image1.name).toString(),
        buffer1
      );

      if (existingProfile.imageUrl1) {
        // Add deletion promise for the existing image
        const publicId1 = existingProfile?.imageUrl1
          ?.split("/")
          .pop()
          .split(".")[0]; // Extract public_id from URL
        // Add deletion promise for the existing image
        deleteImage1Promise = cloudinary.uploader.destroy(publicId1);
        imageUploadPromises.push(deleteImage1Promise);
      }

      if (base64Image1.content) {
        // Add upload promise for the new image
        uploadImage1Promise = cloudinary.uploader.upload(base64Image1.content, {
          resource_type: "image",
        });
        imageUploadPromises.push(uploadImage1Promise);
      }
    }

    // Handle image2
    if (image2) {
      const buffer2 = Buffer.from(await image2.arrayBuffer());
      const base64Image2 = parser.format(
        path.extname(image2.name).toString(),
        buffer2
      );

      if (existingProfile.imageUrl2) {
        const publicId2 = existingProfile.imageUrl1
          .split("/")
          .pop()
          .split(".")[0]; // Extract public_id from URL
        // Add deletion promise for the existing image
        deleteImage2Promise = cloudinary.uploader.destroy(publicId2);
        imageUploadPromises.push(deleteImage2Promise);
      }

      if (base64Image2.content) {
        // Add upload promise for the new image
        uploadImage2Promise = cloudinary.uploader.upload(base64Image2.content, {
          resource_type: "image",
        });
        imageUploadPromises.push(uploadImage2Promise);
      }
    }

    // Wait for all promises to complete
    const results = await Promise.all(imageUploadPromises);

    // Extract results for uploadImage1 and uploadImage2
    const deleteImage1 = deleteImage1Promise ? results.shift() : undefined; // Shift removes the first element
    const uploadImage1 = uploadImage1Promise ? results.pop() : undefined; // Pop removes the last element
    const deleteImage2 = deleteImage2Promise ? results.shift() : undefined; // Shift removes the next first element
    const uploadImage2 = uploadImage2Promise ? results.pop() : undefined; // Pop removes the last element

    // Log the results
    console.log({ deleteImage1, uploadImage1, deleteImage2, uploadImage2 });

    const updatedData = {
      registrationNumber1:
        registrationNumber1 || existingProfile.registrationNumber1,
      registrationNumber2:
        registrationNumber2 || existingProfile.registrationNumber2,
      imageUrl1: uploadImage1
        ? uploadImage1.secure_url
        : existingProfile.imageUrl1,
      imageUrl2: uploadImage2
        ? uploadImage2.secure_url
        : existingProfile.imageUrl2,
    };

    const updatedProfile = await db.doctorLicense.update({
      where: { id: existingProfile.id },
      data: updatedData,
    });

    return NextResponse.json({
      status: true,
      message: "Updated Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating doctor license details:", error);
    return NextResponse.json({
      status: false,
      message: "Failed to update",
      details: error,
    });
  }
};
