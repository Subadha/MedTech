"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsData {
  totalVisitsToday: number;
  newPatients: number;
  oldPatients: number;
  newPatientsPercentChange: number;
  oldPatientsPercentChange: number;
}

export function VisitsForTodayCard() {
  const { id } = useUser();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/v1/doctor/dashboard/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || "Failed to fetch");
        }
        if (result.success && result.data) {
          setData(result.data);
        } else {
          throw new Error(result.message || "No data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div
        className="w-full rounded-2xl overflow-hidden shadow-lg min-h-[200px] animate-pulse"
        style={{
          background: "linear-gradient(135deg, #b8e4fc 0%, #9bd8f1 35%, #7c3aed 100%)",
        }}
      >
        <div className="p-5 flex items-end justify-between h-full">
          <div className="space-y-4">
            <div className="h-5 w-32 bg-white/30 rounded" />
            <div className="h-12 w-20 bg-white/30 rounded" />
            <div className="flex gap-3">
              <div className="h-20 w-28 bg-white/20 rounded-xl" />
              <div className="h-20 w-28 bg-white/20 rounded-xl" />
            </div>
          </div>
          <div className="h-40 w-32 bg-white/20 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="w-full rounded-2xl overflow-hidden shadow-lg min-h-[200px] flex items-center justify-center p-6"
        style={{
          background: "linear-gradient(135deg, #b8e4fc 0%, #9bd8f1 35%, #7c3aed 100%)",
        }}
      >
        <p className="text-black/80 text-sm">{error || "Unable to load visits"}</p>
      </div>
    );
  }

  const {
    totalVisitsToday,
    newPatients,
    oldPatients,
    newPatientsPercentChange,
    oldPatientsPercentChange,
  } = data;

  const newPositive = newPatientsPercentChange >= 0;
  const oldPositive = oldPatientsPercentChange >= 0;

  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-lg min-h-[220px] relative"
      style={{
        background: "linear-gradient(135deg, #b8e4fc 0%, #9bd8f1 35%, #7c3aed 100%)",
        boxShadow: "0 4px 14px rgba(45, 12, 255, 0.25)",
      }}
    >
      {/* Left: stats content with padding so it doesn't sit under the doctor image */}
      <div className="relative z-10 p-5 pr-[min(42%,220px)] flex flex-col gap-4 min-h-[220px]">
        <h2 className="text-black font-medium text-base">Visits for Today</h2>
        <p className="text-black font-bold text-4xl sm:text-5xl tracking-tight">
          {totalVisitsToday}
        </p>
        <div className="flex flex-wrap gap-3">
          {/* New Patients - design spec: 199×123px, radius 18.02px, #FFFFFF 55% opacity */}
          <div
            className="rounded-[18px] px-4 py-3 w-full min-w-[160px] max-w-[199px] h-[123px] flex flex-col justify-center shrink-0"
            style={{
              background: "rgba(255, 255, 255, 0.55)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <p className="text-black font-medium text-sm">New Patients</p>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-black font-bold text-xl">{newPatients}</span>
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  newPositive ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                }`}
              >
                {newPositive ? "+" : ""}
                {newPatientsPercentChange}%
                {newPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
              </span>
            </div>
          </div>
          {/* Old Patients - same spec: 199×123px, radius 18.02px, #FFFFFF 55% opacity */}
          <div
            className="rounded-[18px] px-4 py-3 w-full min-w-[160px] max-w-[199px] h-[123px] flex flex-col justify-center shrink-0"
            style={{
              background: "rgba(255, 255, 255, 0.55)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <p className="text-black font-medium text-sm">Old Patients</p>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="text-black font-bold text-xl">{oldPatients}</span>
              <span
                className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  oldPositive ? "bg-emerald-500/90 text-white" : "bg-red-500/90 text-white"
                }`}
              >
                {oldPositive ? "+" : ""}
                {oldPatientsPercentChange}%
                {oldPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Doctor image - full image visible (no crop), aligned right so hand/pose is intact */}
      <div className="absolute right-0 top-0 bottom-0 w-[42%] min-w-[180px] max-w-[280px] flex justify-end">
        <div className="relative w-full h-full min-h-[220px]">
          <Image
            src="/images/doctor-visits-card.png"
            alt="Doctor"
            fill
            className="object-contain"
            style={{ objectPosition: "right bottom" }}
            sizes="(max-width: 640px) 180px, 280px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
