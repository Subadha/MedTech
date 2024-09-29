import { getAllDoctorsWithDetails } from "@/actions/consult/consultDoc";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { experienceYears, specialization, country, state, city, qualification } = body;

    const filters = {
      ...(experienceYears && { experienceYears: experienceYears.toString() }), // Ensure the value is a string
      ...(specialization && { specialization }),
      ...(country && { country }),
      ...(state && { state }),
      ...(city && { city }),
      ...(qualification && { qualification }),
    };

    const data = await getAllDoctorsWithDetails(filters);

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching doctors:', err);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
};
