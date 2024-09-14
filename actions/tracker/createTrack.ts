import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const createOrUpdateTrackerData = async (id: string, data: any) => {
  try {
    if (!id) return null;

    // Fetch the user by ID
    const user = await getUserById(id);
    if (!user) return null;

    // Check if the tracker already exists for the user
    const existingTracker = await db.tracker.findFirst({
      where: { user_id: id },
    });

    if (existingTracker) {
      // Delete the existing tracker and all related records
      await db.tracker.delete({
        where: { id: existingTracker.id },
      });
    }

    // Create a new tracker with the new data
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

  } catch (error) {
    console.error("Error in createOrUpdateTrackerData:", error);
    return null;
  }
};
