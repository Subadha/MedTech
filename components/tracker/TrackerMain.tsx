"use client";
import React, { startTransition, useEffect, useState } from "react";
import { PercentageCard } from "./PercentageCard";
import { HealthMonitoring } from "./HealthMonitoring";
import { OverViewReport } from "./OverViewReport";
import { HealthVsExpected } from "./HealthVsExpected";
import { GetTrack } from "@/actions/tracker/getTrack";

const TrackerMain = ({ id }: any) => {
  const [data, setData] = useState<any>(null);
  const handleFetchTrackingData = () => {
    startTransition(() => {
      GetTrack(id)
        .then((data) => {
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    });
  };
 console.log(data);
 
  useEffect(() => handleFetchTrackingData(), []);

  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="lg:col-span-4 col-span-6 grid grid-cols-6 gap-4">
        <PercentageCard progress={data?.activity} color="#E53761" title="Activity" />
        <PercentageCard progress={data?.sleep} color="#27A468" title="Sleep" />
        <PercentageCard progress={data?.wellness} color="#F2A735" title="Welness" />
        <HealthMonitoring data={data?.healthMonitoring} />
      </div>
      <div className="lg:col-span-2 col-span-6 grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-4">
        <OverViewReport data={data?.overview?.report} />
        <HealthVsExpected data={data?.health_expected} />
      </div>
    </div>
  );
};

export default TrackerMain;

const dummydata = {
  monthly_monitoring: [
    {
      month: "January",
      stress_level: 186,
      pulse: 80,
      temperature: 98.6,
      calories_burned: 300,
    },
    {
      month: "February",
      stress_level: 305,
      pulse: 200,
      temperature: 80.1,
      calories_burned: 350,
    },
    {
      month: "March",
      stress_level: 237,
      pulse: 120,
      temperature: 97.9,
      calories_burned: 320,
    },
    {
      month: "April",
      stress_level: 73,
      pulse: 100,
      temperature: 95.3,
      calories_burned: 280,
    },
    {
      month: "May",
      stress_level: 209,
      pulse: 90,
      temperature: 98.7,
      calories_burned: 290,
    },
    {
      month: "June",
      stress_level: 214,
      pulse: 110,
      temperature: 99.0,
      calories_burned: 310,
    },
  ],
  weekly_monitoring: [
    { week: "Week 1", stress_level: 150, pulse: 85, temperature: 97.1, calories_burned: 200 },
    { week: "Week 2", stress_level: 170, pulse: 90, temperature: 98.3, calories_burned: 220 },
    { week: "Week 3", stress_level: 200, pulse: 95, temperature: 99.0, calories_burned: 230 },
    { week: "Week 4", stress_level: 210, pulse: 100, temperature: 97.5, calories_burned: 240 },
  ],
  daily_monitoring: [
    { day: "Sunday", stress_level: 140, pulse: 80, temperature: 96.8, calories_burned: 180 },
    { day: "Monday", stress_level: 140, pulse: 80, temperature: 96.8, calories_burned: 180 },
    { day: "Tuesday", stress_level: 160, pulse: 85, temperature: 97.5, calories_burned: 190 },
    { day: "Wednesday", stress_level: 175, pulse: 90, temperature: 98.0, calories_burned: 200 },
    { day: "Thursday", stress_level: 180, pulse: 95, temperature: 98.5, calories_burned: 210 },
    { day: "Friday", stress_level: 190, pulse: 100, temperature: 99.0, calories_burned: 220 },
  ],
};
