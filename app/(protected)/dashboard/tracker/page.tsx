import { HealthMonitoring } from "@/components/tracker/HealthMonitoring";
import { HealthVsExpected } from "@/components/tracker/HealthVsExpected";
import { OverViewReport } from "@/components/tracker/OverViewReport";
import { PercentageCard } from "@/components/tracker/PercentageCard";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="lg:col-span-4 col-span-6 grid grid-cols-6 gap-4">
      <PercentageCard progress={60} color="#E53761" title="Activity" />
      <PercentageCard progress={64} color="#27A468" title="Sleep" />
      <PercentageCard progress={90} color="#F2A735" title="Welness" />
      <HealthMonitoring/>
      </div>
      <div className="lg:col-span-2 col-span-6 grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-4">
      <OverViewReport/>
      <HealthVsExpected/>
      </div>
    </div>
  );
};

export default page;
