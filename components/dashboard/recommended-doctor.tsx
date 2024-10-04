"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FaAngleRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";

const RecommendedDoctors = () => {

  const [data,setData]= useState([])

  useEffect(() => {
    const Get = async () => {
      try {
        const data = await fetch("/api/v1/patients/dashboard/recomended-doctor");
        const result = await data.json();
        console.log(result);
        if (result.data?.length > 0) {
        setData(result.data);}
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);

  return (
    <Card className=" col-span-6">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg lg:text-[1.4vw] font-semibold">
          Recommended Doctors
        </h1>
        <span className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline">
         <Link href={"consult"} className="flex items-center">View all <FaAngleRight /></Link>
        </span>
      </div>
      <CardContent className=" grid grid-cols-6 gap-3">
        {data.map((value,ind)=>(<DoctorCard data={value} key={ind}/>))}
      </CardContent>
    </Card>
  );
};

export default RecommendedDoctors;

 const DoctorCard = ({ data }: any) => {
  return (
    <div className=" col-span-6 md:col-span-3 lg:col-span-2">
      <Card className="p-2">
        <CardContent className="rounded-xl overflow-hidden p-2 flex items-center">
          <div className="flex gap-2">
            <Avatar className=" aspect-square h-16 w-16">
              <AvatarImage
                src={data.image || "https://avatar.iran.liara.run/public"}
                alt="@shadcn"
                className=" object-cover"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className=" flex flex-col items-start gap-1">
              <p className="text-base font-semibold">
                {data?.legalName}
              </p>
              <div className="text-[12px] flex text-gray-600">
                <span>{data?.specialization}</span>&nbsp;|&nbsp;
                <span>{data?.experienceYears} Years</span>
              </div>
              <Badge variant="secondary">{data?.subSpecialist}</Badge>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-2 w-full flex flex-col gap-2 ">
          <div className="flex py-2 w-full gap-3">
            <div className="flex gap-1 ">
              <IoMdTime />
              <div>
                <p className="text-md leading-none flex font-medium">
                  {data?.doctorAvailabilityDetails?.availableDays?.length >=
                    1 &&
                  data?.doctorAvailabilityDetails?.availableDays?.length <= 3
                    ? data.doctorAvailabilityDetails.availableDays.join(", ")
                    : data?.available_days?.length > 0
                    ? `${data.available_days[0]} - ${
                        data.available_days[data.available_days.length - 1]
                      }`
                    : "No available days"}
                </p>
                <span className="text-[12px] text-gray-600">
                  {data?.availableTimeFrom} AM -{" "}
                  {data?.doctorAvailabilityDetails?.availableTimeSlot[data?.doctorAvailabilityDetails?.availableTimeSlot?.length-1]} PM
                </span>
              </div>
            </div>
            <div className="flex pl-2 gap-1 border-l">
              <GiTwoCoins />
              <div>
                <p className="text-md leading-none font-medium">
                  Rs.{data?.consultationFees}
                </p>
                <span className="text-[12px] text-gray-600">Starting</span>
              </div>
            </div>
          </div>
          <Link className="w-full" href={`consult/${data.id}`}>
            <Button className="w-full">Book an appointment</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
