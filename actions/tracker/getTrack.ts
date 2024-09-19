"use server";
import { db } from "@/lib/db";

export async function GetTrack(userId: string) {
  try {    
    if (!userId) {
      return { error: "User ID not provided" };
    }

    const overview = await db.overview.findFirst({
      where: { userId: userId },
    });

    const healthExpected = await db.healthExpected.findFirst({
      where: { userId: userId },
    });

    const healthMonitoring = await db.healthMonitoring.findFirst({
      where: { userId: userId },
    });

    if (!overview && !healthExpected && !healthMonitoring) {
      return { error: 'No data found for this user' };
    }   
    const tracks = {
      activity: {
        daily: 60,   // 60% daily progress for activity
        weekly: 75,  // 75% weekly progress for activity
        monthly: 90, // 90% monthly progress for activity
      },
      sleep: {
        daily: 50,   // 50% daily progress for sleep
        weekly: 65,  // 65% weekly progress for sleep
        monthly: 80, // 80% monthly progress for sleep
      },
      wellness: {
        daily: 40,   // 40% daily progress for wellness
        weekly: 55,  // 55% weekly progress for wellness
        monthly: 70, // 70% monthly progress for wellness
      }
    };
    return {
      tracks,
      overview,
      healthExpected,
      healthMonitoring,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Internal Server Error' };
  }
}

