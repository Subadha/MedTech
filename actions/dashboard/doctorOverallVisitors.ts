"use server";
import { db } from "@/lib/db";

export const getDoctorOverallVisitors = async (doctorId: string) => {
  try {
    if (typeof doctorId !== "string" || !doctorId.trim()) {
      return { success: false, message: "Invalid doctor ID" };
    }

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setUTCHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setUTCHours(23, 59, 59, 999);
    const startOfLast7Days = new Date(now);
    startOfLast7Days.setDate(startOfLast7Days.getDate() - 6);
    startOfLast7Days.setUTCHours(0, 0, 0, 0);

    const startOfPrevious7Days = new Date(startOfLast7Days);
    startOfPrevious7Days.setDate(startOfPrevious7Days.getDate() - 7);
    const endOfPrevious7Days = new Date(startOfLast7Days);
    endOfPrevious7Days.setMilliseconds(-1);

    // Last 7 days appointments (confirmed + completed)
    const last7DaysAppointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: doctorId,
        date: { gte: startOfLast7Days, lte: endOfToday },
        status: { in: ["confirmed", "completed"] },
      },
      select: { userId: true },
    });

    // Previous 7 days for comparison
    const previous7DaysAppointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: doctorId,
        date: { gte: startOfPrevious7Days, lte: endOfPrevious7Days },
        status: { in: ["confirmed", "completed"] },
      },
      select: { userId: true },
    });

    // Today's appointments count
    const todayAppointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: doctorId,
        date: { gte: startOfToday, lte: endOfToday },
        status: { in: ["confirmed", "completed"] },
      },
      select: { id: true },
    });
    const todayCount = todayAppointments.length;

    const totalLast7 = last7DaysAppointments.length;
    const totalPrevious7 = previous7DaysAppointments.length;
    const percentChange =
      totalPrevious7 === 0
        ? (totalLast7 > 0 ? 100 : 0)
        : Math.round(
            ((totalLast7 - totalPrevious7) / totalPrevious7) * 1000
          ) / 10;

    return {
      success: true,
      data: {
        totalVisitors: totalLast7,
        previousPeriodVisitors: totalPrevious7,
        percentChange,
        todayCount,
        description: `Data obtained for the last 7 days from ${totalPrevious7.toLocaleString()} Visitor to ${totalLast7.toLocaleString()} Visitor.`,
      },
    };
  } catch (err) {
    console.error("Error fetching overall visitors:", err);
    return { success: false, message: "Internal server error" };
  }
};
