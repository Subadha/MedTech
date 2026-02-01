"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/app/context/userContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PercentageCard } from "@/components/tracker/PercentageCard";
import { HealthMonitoring } from "@/components/tracker/HealthMonitoring";
import { OverViewReport } from "@/components/tracker/OverViewReport";
import { HealthVsExpected } from "@/components/tracker/HealthVsExpected";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Droplets, Thermometer, Activity, Download } from "lucide-react";

type TrackerData = {
  tracks?: {
    activity?: { daily?: number; weekly?: number; monthly?: number };
    sleep?: { daily?: number; weekly?: number; monthly?: number };
    wellness?: { daily?: number; weekly?: number; monthly?: number };
  };
  overview?: { report?: Array<{ week?: string; prev_month?: number; this_month?: number }> };
  healthExpected?: { report?: Array<{ month?: string; health?: number; expected?: number }> };
  healthMonitoring?: {
    daily_monitoring?: Array<{
      day?: string;
      pulse?: number;
      temperature?: number;
      stress_level?: number;
      calories_burned?: number;
    }>;
    weekly_monitoring?: unknown[];
    monthly_monitoring?: unknown[];
  };
};

// Normalize activity/sleep/wellness to 0-100 for display (same as mobile)
function toPercentage(
  val: number | undefined,
  max: number
): number {
  if (val == null) return 0;
  return Math.round(Math.min(1, Math.max(0, val / max)) * 100);
}

export default function PatientDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id: doctorId } = useUser();
  const patientId = params.patientId as string;
  const patientName =
    searchParams.get("name") || "Patient";

  const [data, setData] = useState<TrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId || !patientId) return;
    const fetchTracker = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/v1/doctor/patients/tracker/get", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: doctorId, patientId }),
        });
        const json = await res.json();
        if (json.error) {
          setError(json.error);
          setData(null);
        } else {
          setData(json);
        }
      } catch (e) {
        setError("Failed to load patient data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTracker();
  }, [doctorId, patientId]);

  const activityProgress = useMemo(() => {
    const t = data?.tracks?.activity;
    if (!t) return { daily: 0, weekly: 0, monthly: 0 };
    return {
      daily: toPercentage(Number(t.daily), 250000),
      weekly: toPercentage(Number(t.weekly), 250000),
      monthly: toPercentage(Number(t.monthly), 250000),
    };
  }, [data?.tracks?.activity]);

  const sleepProgress = useMemo(() => {
    const t = data?.tracks?.sleep;
    if (!t) return { daily: 0, weekly: 0, monthly: 0 };
    return {
      daily: toPercentage(Number(t.daily), 10),
      weekly: toPercentage(Number(t.weekly), 70),
      monthly: toPercentage(Number(t.monthly), 300),
    };
  }, [data?.tracks?.sleep]);

  const wellnessProgress = useMemo(() => {
    const t = data?.tracks?.wellness;
    if (!t) return { daily: 0, weekly: 0, monthly: 0 };
    return {
      daily: toPercentage(Number(t.daily), 100),
      weekly: toPercentage(Number(t.weekly), 100),
      monthly: toPercentage(Number(t.monthly), 100),
    };
  }, [data?.tracks?.wellness]);

  const dailyAverages = useMemo(() => {
    const daily = data?.healthMonitoring?.daily_monitoring;
    if (!daily?.length) {
      return {
        heartRate: 98,
        bloodPressure: "102 / 72",
        temperature: 99,
        bloodSugar: 80,
      };
    }
    const pulseSum = daily.reduce((a, d) => a + (d.pulse ?? 0), 0);
    const tempSum = daily.reduce((a, d) => a + (d.temperature ?? 0), 0);
    const heartRate = Math.round(pulseSum / daily.length);
    const tempC = tempSum / daily.length;
    const tempF = Math.round((tempC * 9) / 5 + 32);
    return {
      heartRate,
      bloodPressure: "102 / 72",
      temperature: tempF,
      bloodSugar: 80,
    };
  }, [data?.healthMonitoring?.daily_monitoring]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 flex flex-col gap-4 p-4 md:p-5">
      {/* Breadcrumb: Patients (light purple) >> Name (blue/purple) >> Details (black) */}
      <nav className="text-sm">
        <Link
          href="/dashboard/patient"
          className="text-violet-400 hover:text-violet-500 transition-colors"
        >
          Patients
        </Link>
        <span className="mx-1 text-slate-400">{" >> "}</span>
        <span className="font-medium text-indigo-600">{patientName}</span>
        <span className="mx-1 text-slate-400">{" >> "}</span>
        <span className="font-medium text-slate-900">Details</span>
      </nav>

      {/* Summary cards: Activity, Sleep, Wellness - compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <PercentageCard
          progress={activityProgress}
          color="#EC4899"
          title="ACTIVITY"
        />
        <PercentageCard
          progress={sleepProgress}
          color="#10B981"
          title="SLEEP"
        />
        <PercentageCard
          progress={wellnessProgress}
          color="#F97316"
          title="WELLNESS"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        {/* Left: Health Monitoring */}
        <div className="lg:col-span-4 space-y-4">
          {data?.healthMonitoring ? (
            <HealthMonitoring data={data.healthMonitoring} />
          ) : (
            <Card className="bg-white rounded-xl shadow-sm border-0">
              <CardHeader>
                <CardTitle className="text-slate-700 uppercase tracking-wide">Health Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-sm">No monitoring data available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Download Report (solid purple) + Overview + Health vs Expected */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <Button
            size="sm"
            className="w-full gap-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium shadow-sm py-2 h-9"
          >
            <Download className="h-3.5 w-3.5" />
            Download Report
          </Button>
          <OverViewReport data={data?.overview?.report ?? []} />
          <HealthVsExpected data={data?.healthExpected?.report ?? []} />
        </div>
      </div>

      {/* Daily Average - 4 cards with icon, value, Normal pill, mini line graph */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-slate-800">Daily Average</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DailyAvgCard
            icon={<Heart className="h-5 w-5 text-rose-500" />}
            title="Heart Rate"
            value={`${dailyAverages.heartRate} bpm`}
            pillColor="bg-rose-100 text-rose-700"
            lineColor="#f43f5e"
            sparkData={[72, 85, 78, 92, 88, 95, dailyAverages.heartRate]}
          />
          <DailyAvgCard
            icon={<Droplets className="h-5 w-5 text-sky-500" />}
            title="Blood Pressure"
            value={`${dailyAverages.bloodPressure} mmhg`}
            pillColor="bg-sky-100 text-sky-700"
            lineColor="#0ea5e9"
            sparkData={[70, 75, 72, 78, 74, 76, 72]}
          />
          <DailyAvgCard
            icon={<Thermometer className="h-5 w-5 text-rose-400" />}
            title="Body Temperature"
            value={`${dailyAverages.temperature} °F`}
            pillColor="bg-rose-100 text-rose-700"
            lineColor="#fb7185"
            sparkData={[98, 97, 99, 98, 99, 98, dailyAverages.temperature]}
          />
          <DailyAvgCard
            icon={<Activity className="h-5 w-5 text-amber-500" />}
            title="Blood Sugar"
            value={`${dailyAverages.bloodSugar} mg/dL`}
            pillColor="bg-amber-100 text-amber-700"
            lineColor="#f59e0b"
            sparkData={[78, 82, 80, 85, 79, 81, dailyAverages.bloodSugar]}
          />
        </div>
      </div>
    </div>
  );
}

function DailyAvgCard({
  icon,
  title,
  value,
  pillColor,
  lineColor,
  sparkData,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  pillColor: string;
  lineColor: string;
  sparkData: number[];
}) {
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = max - min || 1;
  const w = 120;
  const h = 28;
  const points = sparkData
    .map((v, i) => {
      const x = (i / (sparkData.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <Card className="bg-white rounded-lg shadow-sm border-0 overflow-hidden p-3">
      <CardContent className="p-0">
        <div className="flex items-center gap-1.5">
          {icon}
          <span className="font-medium text-slate-700 text-sm">{title}</span>
        </div>
        <p className="mt-1.5 text-xl font-bold text-slate-900">{value}</p>
        <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${pillColor}`}>
          Normal
        </span>
        <div className="mt-2 h-6 w-full opacity-60" aria-hidden>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={lineColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
