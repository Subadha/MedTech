"use client"
import React, { startTransition, useEffect, useState } from 'react'
import { PercentageCard } from './PercentageCard'
import { HealthMonitoring } from './HealthMonitoring'
import { OverViewReport } from './OverViewReport'
import { HealthVsExpected } from './HealthVsExpected'
import { GetTrack } from '@/actions/tracker/getTrack'
import { Tracker } from './TrackingTypes'

const TrackerMain = ({id}:any) => {
    const [data, setData] = useState<Tracker | null>(null);  
    const handleFetchTrackingData = () => {
    startTransition(() => {
        GetTrack(id).then((data) => {                
          if (data){
            console.log(data);
            
       //  setData(data); 
        }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    });
  };

 useEffect(() => handleFetchTrackingData(),[])


  return (
    <div className="grid grid-cols-6 gap-4 p-4">
    <div className="lg:col-span-4 col-span-6 grid grid-cols-6 gap-4">
      <PercentageCard progress={60} color="#E53761" title="Activity" />
      <PercentageCard progress={64} color="#27A468" title="Sleep" />
      <PercentageCard progress={90} color="#F2A735" title="Welness" />
      <HealthMonitoring />
    </div>
    <div className="lg:col-span-2 col-span-6 grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-4">
      <OverViewReport />
      <HealthVsExpected />
    </div>
    <h1>Store</h1>
  </div>
  )
}

export default TrackerMain