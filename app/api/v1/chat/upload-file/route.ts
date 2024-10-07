import path from "path";
import DatauriParser from "datauri/parser";
import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";


export async function POST(req: Request) {
    try{
  const formData = await req.formData();
  const image = formData.get("file") as File;

  if (!image) {
    return NextResponse.json(
      { error: "Image is required!", data: null },
      { status: 400 }
    );
  }

  const parser = new DatauriParser();

      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(await image.arrayBuffer());

      // Upload the new image
      const base64Image = parser.format(
        path.extname(image.name).toString(),
        buffer
      );

      if (!base64Image.content) {
        return NextResponse.json({ error: null, message: "Failed to parse" });
      }

      const createdImage = await cloudinary.uploader.upload(
        base64Image.content,
        {
          resource_type: "image",
        }
      )
      return NextResponse.json({
        url:createdImage.secure_url,
        success: "Image updated successfully",
      });
  } catch (error) {

    return NextResponse.json(
      { error: error || "Error uploading image", data: null },
      { status: 500 }
    );
  }
}
