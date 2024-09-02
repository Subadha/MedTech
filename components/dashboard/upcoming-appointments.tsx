"use client";
import React, {
  useEffect,
  useState,
  useTransition,
} from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { createTrackerData } from "@/actions/tracker/createTrack";
import { getAllAppointment } from "@/actions/appointment/getOppintments";

interface ProfileProps {
  id: string | undefined;
}
const UpcomingAppointments = ({ id }: ProfileProps) => {
  const [data, setData] = useState<any>([]);
  const [isPending, startTransition] = useTransition();
  
  const handleFetchAppointment = () => {
    startTransition(() => {
      getAllAppointment(id || "")
        .then((appointments) => {
          if (appointments) {
            setData(appointments.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    });
  };
 console.log(data);
 
  useEffect(() => handleFetchAppointment(), []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Card className="col-span-6  lg:col-span-2">
       <h1 onClick={()=>{createTrackerData(id||'',dummydata),console.log('called');
       }}>Add track data</h1>
      <CardHeader className="p-3">
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-[1.4vw] font-semibold">
            Upcoming Appointments
          </h1>
          <Link
            className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline"
            href={"/dashboard/appointment"}
          >
            View all
            <FaAngleRight />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {data?.length > 0 ? (
          <div className=" flex flex-col gap-4">
            {data?.map((appointment:any,index:number) => (
              <div key={appointment.id} className="flex items-center gap-2">
                <span className=" font-bold">{++index}.</span>
                  <div className="h-10 w-10 bg-primary rounded-full" />
                  <div>
                    <div className="text-sm font-medium">
                      {appointment?.doctorName}
                    </div>
                    <div className="text-[10px] text-primary">
                      {formatDate(appointment.date)}
                    </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-primary">
              You have no upcoming appointments.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;

const dummydata = {
  health_monitoring: [
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
  health_expected: [
    { month: "January", health: 186, expected: 80 },
    { month: "February", health: 305, expected: 200 },
    { month: "March", health: 237, expected: 120 },
    { month: "April", health: 73, expected: 190 },
    { month: "May", health: 209, expected: 130 },
    { month: "June", health: 214, expected: 140 },
  ],
  overview_report: [
    { week: "Day 1", this_month: 186, prev_month: 80 },
    { week: "Week 1", this_month: 186, prev_month: 80 },
    { week: "Week 2", this_month: 305, prev_month: 200 },
    { week: "Week 3", this_month: 237, prev_month: 120 },
    { week: "Week 4", this_month: 73, prev_month: 190 },
    { week: "Week 5", this_month: 209, prev_month: 130 },
  ],
  activity: 60,
  sleep: 80,
  wellness: 89,
};