"use server"
import { db } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function GetTrack(userId:string) {
  try {

    if (!userId) {
      return { error:"user id not provided" };
    }

    const trackers = await db.tracker.findFirst({
      where: { user_id: userId },
      include: {
        overview_report: true,
        health_monitoring: true,
        health_expected: true,
      },
    });
  
    if (!trackers) {
      return { error: 'No trackers found for this user' };
    }

    return trackers;
  } catch (error) {
    console.error('Error fetching trackers:', error);
    return { error: 'Internal Server Error' };
  }
}
