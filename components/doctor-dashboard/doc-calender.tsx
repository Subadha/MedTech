"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Calendar } from "../ui/calendar";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/app/context/userContext";
import { format } from "date-fns";

const CalenderAndAppointments = () => {
  const { id } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [upcomingOne, setUpcomingOne] = useState<any>({});
  const GetData = async () => {
    try {
      const data = await fetch("/api/v1/doctor/upcomming-one", {
        method: "POST",
        body: JSON.stringify({ userId: id }),
      });
      const result = await data.json();
      setUpcomingOne(result.data);
    } catch (error) {
      console.log(error);
    }
  };
console.log(upcomingOne);

  useEffect(() => {
    GetData();
  }, []);
  return (
    <Card className="col-span-6  lg:col-span-2">
      <CardHeader className="p-3">
        <div className="flex justify-between">
          <h1 className="text-lg lg:text-[1.4vw] font-semibold">Calendar</h1>
        </div>
      </CardHeader>
      <CardContent className=" justify-center items-center flex">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </CardContent>
      <CardFooter className="p-3 border-0 flex-col">
        <div className="flex w-full justify-between">
          <h1 className="text-lg lg:text-[1.4vw] font-semibold">Upcoming</h1>
          <Link
            className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline"
            href={"#"}
          >
            View all
            <FaAngleRight />
          </Link>
        </div>
        {upcomingOne?.id ? (
          <div className="w-full mt-2">
            <Card className="flex gap-2 p-2 w-full">
              <Avatar className=" h-12 w-12">
                <AvatarImage
                   src={upcomingOne.patient.image||`https://avatar.iran.liara.run/username?username=${
                    upcomingOne?.name.split(" ")[0]
                  }${upcomingOne?.name.split(" ")[1]?`+${upcomingOne?.name.split(" ")[1]}`:''}`}
                  alt="@shadcn"
                />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-semibold">{upcomingOne?.name}</p>
                <p className="text-[12px] leading-none text-muted-foreground">
                  {format(new Date(upcomingOne.date), "PPP")} |{" "}
                  {upcomingOne.time}
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <p className="mt-3">No upcoming appointment</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default CalenderAndAppointments;
