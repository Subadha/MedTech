"use server"
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { NextResponse } from 'next/server';

export const createTrackerData = async (id: string, data: any) => {
  if (id) {    
    const user = await getUserById(id);    
    if (!user) return null;

    const newTracker = await db.tracker.create({
      data: {
        user_id: id,
        activity: data.activity,
        sleep: data.sleep,
        wellness: data.wellness,
        overview_report: {
          create: data.overview_report,
        },
        health_monitoring: {
          create: data.health_monitoring,
        },
        health_expected: {
          create: data.health_expected,
        },
      },
      include: {
        overview_report: true,
        health_monitoring: true,
        health_expected: true,
      },
    });

    return newTracker;
  }

  return null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, data } = body;

    const tracker = await createTrackerData(userId, data);
    if (!tracker) {
      return NextResponse.json({ error: 'Tracker creation failed' }, { status: 400 });
    }

    return NextResponse.json(tracker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
