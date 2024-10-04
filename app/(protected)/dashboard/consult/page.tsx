"use client";
import { getAllDoctorsWithDetails } from "@/actions/consult/consultDoc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";

const Page = () => {
  const [doctors, setDoctors] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const doc = await getAllDoctorsWithDetails();
      setDoctors(doc);
    })();
  }, []);
  console.log(doctors);

  return (
    <>
      <div className="p-4 flex flex-col lg:flex-row justify-between h-20 lg:items-center gap-4">
        <h2 className=" text-2xl font-medium">All Doctors</h2>
        <span className=" text-primary font-medium">Filter</span>
      </div>
      <div className="grid grid-cols-6 gap-3 p-4">
        {doctors?.map((data: any) => (
          <DoctorCard key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};

export default Page;

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
                {data?.doctorProfile?.legalName}
              </p>
              <div className="text-[12px] flex text-gray-600">
                <span>{data?.doctorProfile?.specialization}</span>&nbsp;|&nbsp;
                <span>{data?.doctorProfile?.experienceYears} Years</span>
              </div>
              <Badge variant="secondary">{data?.doctorProfile?.subSpecialist}</Badge>
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
                  {data?.doctorAvailabilityDetails?.availableDays?.length
                    ? data.doctorAvailabilityDetails.availableDays.length <= 3
                      ? data.doctorAvailabilityDetails.availableDays.join(", ")
                      : `${data.doctorAvailabilityDetails.availableDays[0]} - ${
                          data.doctorAvailabilityDetails.availableDays[
                            data.doctorAvailabilityDetails.availableDays
                              .length - 1
                          ]
                        }`
                    : "No available days"}
                </p>
                <span className="text-[12px] text-gray-600">
                  {data?.doctorAvailabilityDetails?.availableTimeFrom} AM -{" "}
                  {data?.doctorAvailabilityDetails?.availableTimeSlot[data?.doctorAvailabilityDetails?.availableTimeSlot?.length-1]}
                </span>
              </div>
            </div>
            <div className="flex pl-2 gap-1 border-l">
              <GiTwoCoins />
              <div>
                <p className="text-md leading-none font-medium">
                  Rs.{data?.doctorProfile?.consultationFees}
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
