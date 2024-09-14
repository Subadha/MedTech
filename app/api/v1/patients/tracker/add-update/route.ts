import { createOrUpdateTrackerData } from "@/actions/tracker/createTrack";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { id, data } = body;
     
      const tracker = await createOrUpdateTrackerData(id, data);
      if (!tracker) {
        return NextResponse.json({ error: 'Tracker creation or update failed' }, { status: 400 });
      }
  
      return NextResponse.json(tracker, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }