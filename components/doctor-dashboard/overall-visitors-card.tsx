"use client";

import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { useUser } from "@/app/context/userContext";

interface OverallVisitorsData {
  totalVisitors: number;
  previousPeriodVisitors: number;
  percentChange: number;
  todayCount: number;
  description: string;
}

export const OverallVisitorsCard = () => {
  const { id } = useUser();
  const [data, setData] = useState<OverallVisitorsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/v1/doctor/dashboard/overall-visitors", {
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
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl bg-[#4c3b7a] p-5 min-h-[220px] animate-pulse w-full">
        <div className="h-5 w-32 bg-white/20 rounded mb-4" />
        <div className="h-10 w-24 bg-white/20 rounded mb-2" />
        <div className="h-4 w-full bg-white/10 rounded mt-4" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl bg-[#4c3b7a] p-5 min-h-[220px] flex items-center justify-center text-white/80 text-sm w-full">
        {error || "Unable to load visitors data"}
      </div>
    );
  }

  const { totalVisitors, percentChange, todayCount, description } = data;
  // Progress: scale 0–100 based on total visitors (cap at ~20k for full bar)
  const progressPercent = Math.min(100, (totalVisitors / 20000) * 100);

  // Parse description to bold the two numbers (e.g. "5.567" and "7,525")
  const descParts = description.split(/(\d[\d,.]*)/g);
  const descriptionWithBold = descParts.map((part, i) =>
    /^\d[\d,.]*$/.test(part) ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

  return (
    <div className="rounded-xl bg-[#4c3b7a] p-5 text-white shadow-lg w-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-white/10">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <span className="text-sm font-medium text-white/95">Overall visitors</span>
      </div>

      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-3xl lg:text-4xl font-bold tracking-tight">
          {totalVisitors.toLocaleString()}
        </span>
        <span className="inline-flex items-center rounded-full bg-purple-300/30 px-2.5 py-0.5 text-sm font-medium text-white">
          {percentChange >= 0 ? "+" : ""}
          {percentChange}%
        </span>
      </div>

      <p className="mt-3 text-sm text-white/90 leading-snug">
        {descriptionWithBold}
      </p>

      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${Math.max(4, progressPercent)}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <span className="text-sm font-medium text-white/95">
          {todayCount.toLocaleString()} today
        </span>
      </div>
    </div>
  );
};
