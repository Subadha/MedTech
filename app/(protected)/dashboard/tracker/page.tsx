import { OverViewReport } from "@/components/tracker/OverViewReport";
import { PercentageCard } from "@/components/tracker/PercentageCard";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="col-span-4 grid grid-cols-6 gap-4">
      <PercentageCard progress={60} color="#E53761" title="Activity" />
      <PercentageCard progress={64} color="#27A468" title="Sleep" />
      <PercentageCard progress={90} color="#F2A735" title="Welness" />
      
      </div>
      <div className="col-span-2">
      <OverViewReport/>
      </div>
    </div>
  );
};

export default page;
