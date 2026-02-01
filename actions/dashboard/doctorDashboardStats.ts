"use server";
import { db } from "@/lib/db";

export const getDoctorDashboardStats = async (doctorId: string) => {
  try {
    if (typeof doctorId !== "string" || !doctorId.trim()) {
      return { success: false, message: "Invalid doctor ID" };
    }

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setUTCHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setUTCHours(23, 59, 59, 999);

    const startOfYesterday = new Date(now);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    startOfYesterday.setUTCHours(0, 0, 0, 0);
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setUTCHours(23, 59, 59, 999);

    // Today's appointments (confirmed or completed only)
    const todayAppointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: doctorId,
        date: { gte: startOfToday, lte: endOfToday },
        status: { in: ["confirmed", "completed"] },
      },
      select: { userId: true },
    });

    // Yesterday's appointments for comparison
    const yesterdayAppointments = await db.bookedAppointment.findMany({
      where: {
        doctor_id: doctorId,
        date: { gte: startOfYesterday, lte: endOfYesterday },
        status: { in: ["confirmed", "completed"] },
      },
      select: { userId: true },
    });

    // Count first-ever visit to this doctor per patient (by appointment createdAt or min date)
    const allDoctorAppointments = await db.bookedAppointment.findMany({
      where: { doctor_id: doctorId, status: { in: ["confirmed", "completed"] } },
      select: { userId: true, date: true },
      orderBy: { date: "asc" },
    });

    const firstVisitByPatient = new Map<string, Date>();
    for (const apt of allDoctorAppointments) {
      if (!firstVisitByPatient.has(apt.userId)) {
        firstVisitByPatient.set(apt.userId, apt.date);
      }
    }

    const totalVisitsToday = todayAppointments.length;
    const uniqueToday = new Set(todayAppointments.map((a) => a.userId));
    let newPatientsToday = 0;
    let oldPatientsToday = 0;
    for (const uid of uniqueToday) {
      const firstVisit = firstVisitByPatient.get(uid);
      if (!firstVisit) continue;
      const isFirstVisitToday =
        firstVisit >= startOfToday && firstVisit <= endOfToday;
      if (isFirstVisitToday) newPatientsToday++;
      else oldPatientsToday++;
    }

    const uniqueYesterday = new Set(yesterdayAppointments.map((a) => a.userId));
    const totalYesterday = yesterdayAppointments.length;
    let newPatientsYesterday = 0;
    let oldPatientsYesterday = 0;
    for (const uid of uniqueYesterday) {
      const firstVisit = firstVisitByPatient.get(uid);
      if (!firstVisit) continue;
      const isFirstVisitYesterday =
        firstVisit >= startOfYesterday && firstVisit <= endOfYesterday;
      if (isFirstVisitYesterday) newPatientsYesterday++;
      else oldPatientsYesterday++;
    }

    const newPercentChange =
      newPatientsYesterday === 0
        ? (newPatientsToday > 0 ? 100 : 0)
        : Math.round(
            ((newPatientsToday - newPatientsYesterday) / newPatientsYesterday) *
              100
          );
    const oldPercentChange =
      oldPatientsYesterday === 0
        ? (oldPatientsToday > 0 ? 100 : 0)
        : Math.round(
            ((oldPatientsToday - oldPatientsYesterday) / oldPatientsYesterday) *
              100
          );

    return {
      success: true,
      data: {
        totalVisitsToday,
        newPatients: newPatientsToday,
        oldPatients: oldPatientsToday,
        newPatientsPercentChange: newPercentChange,
        oldPatientsPercentChange: oldPercentChange,
      },
    };
  } catch (err) {
    console.error("Error fetching doctor dashboard stats:", err);
    return { success: false, message: "Internal server error" };
  }
};
