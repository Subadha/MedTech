import { GetDoctorById } from "@/actions/consult/GetDoctorById";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("Invalid ID format");
    }
    const result = await GetDoctorById(userId);
    if (!result) {
      return NextResponse.json({ error: "Data not found" });
    }
    return NextResponse.json({ success: "Success", data: result });
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return NextResponse.json({ error: "Internal server error" });
  }
};
