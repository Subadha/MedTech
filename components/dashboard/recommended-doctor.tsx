import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FaAngleRight } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { RiMapPin2Line } from "react-icons/ri";
import { Badge } from "../ui/badge";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";
import { Button } from "../ui/button";
import { Span } from "next/dist/trace";

const RecommendedDoctors = () => {
  return (
    <Card className=" col-span-6">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg lg:text-[1.4vw] font-semibold">
          Recommended Doctors
        </h1>
        <span className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline">
          View all <FaAngleRight />
        </span>
      </div>
      <CardContent className=" grid grid-cols-6 gap-3">
      {dummyData.map((data,ind) => (
        <DoctorCard key={ind} data={data} />
      ))}
      </CardContent>
    </Card>
  );
};

export default RecommendedDoctors;

export const DoctorCard = ({ data }: any) => {
  return (
    <div className=" col-span-6 md:col-span-3 lg:col-span-2">
      <Card className="p-2">
        <CardContent className="rounded-xl overflow-hidden p-2 flex items-center">
          <div className="flex gap-2">
            <Avatar className=" aspect-square h-16 w-16">
              <AvatarImage
                src="https://avatar.iran.liara.run/public"
                alt="@shadcn"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className=" flex flex-col items-start gap-1">
              <p className="text-base font-semibold">{data.name}</p>
              <div className="text-[12px] flex text-gray-600">
                <span>Specialist</span>&nbsp;|&nbsp;
                <span>12 years experience</span>
              </div>
              <Badge variant="secondary">{data.specialization}</Badge>
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
                  {data.available_days.length <= 3
                    ? data.available_days.join(", ")
                    : `${data.available_days[0]} - ${
                        data.available_days[data.available_days.length - 1]
                      }`}
                </p>{" "}
                <span className="text-[12px] text-gray-600">
                  10:00 AM-01:00PM
                </span>
              </div>
            </div>
            <div className="flex pl-2 gap-1 border-l">
              <GiTwoCoins />
              <div>
                <p className="text-md leading-none font-medium">Rs.300</p>
                <span className="text-[12px] text-gray-600">Starting</span>
              </div>
            </div>
          </div>
          <Button className="w-full">Book an appointment</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const dummyData = [
  {
    "name": "Dr. Madhukar",
    "specialization": "Gynecologist",
    "experience": "12 years",
    "available_days": ["Tue", "Thu", "Fri", "Sat"],
    "timing": "10:00 AM - 01:00 PM",
    "fee": "Rs. 300"
  },
  {
    "name": "Dr. Aditi Sharma",
    "specialization": "Pediatrician",
    "experience": "8 years",
    "available_days": ["Mon", "Wed"],
    "timing": "09:00 AM - 12:00 PM",
    "fee": "Rs. 250"
  },
  {
    "name": "Dr. Rohan Mehta",
    "specialization": "Cardiologist",
    "experience": "15 years",
    "available_days": ["Mon", "Fri", "Sat"],
    "timing": "11:00 AM - 02:00 PM",
    "fee": "Rs. 500"
  }]