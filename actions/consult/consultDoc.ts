"use server";

import { db } from "@/lib/db";

// Define the filter type
interface DoctorFilters {
  specialization?: string;
  experienceYears?: string;
  country?: string;
  state?: string;
  city?: string;
  qualification?: string;
}

// Define the type for the return value (optional but recommended)
interface DoctorWithDetails {
  id: string;
  name?: string;
  email?: string;
  role: string;
  phone?: string;
  doctorProfile?: {
    specialization: string;
    experienceYears: string;
    country: string;
    state: string;
    city: string;
    qualification: string;
  };
  doctorAvailabilityDetails: {
    sessionFees: string;
    sessionLength: string;
    languages: string[];
    availableDays: string[];
    availableTimeFrom: string;
    availableTimeSlot: string[];
  }[];
}

// Main function to get doctors with details
export const getAllDoctorsWithDetails = async (filters: DoctorFilters = {}): Promise<DoctorWithDetails[] | null> => {
  const { specialization, experienceYears, country, state, city, qualification } = filters;

  try {
    const doctors = await db.user.findMany({
      where: {
        role: 'DOCTOR',
        NOT: {
          doctorProfile: null,
          doctorLicenses: null,
        },
        doctorProfile: {
          ...(specialization && { specialization }),
          ...(experienceYears && { experienceYears }),
          ...(country && { country }),
          ...(state && { state }),
          ...(city && { city }),
          ...(qualification && { qualification }),
        },
      },
      include: {
        doctorProfile: true,
        doctorAvailabilityDetails: true,
        doctorLicenses:true
      },
    });

    return doctors as any;
  } catch (error) {
    console.error('Error fetching doctors with details:', error);
    return null;
  }
};
