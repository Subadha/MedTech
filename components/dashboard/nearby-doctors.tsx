"use client"
import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { RiMapPin2Line } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { BsStarFill } from "react-icons/bs";
import Link from "next/link";

const NearbyDoctors = () => {
  const [data,setData]= useState([])

  useEffect(() => {
    const Get = async () => {
      try {
        const data = await fetch("/api/v1/patients/dashboard/top-rated-doctor");
        const result = await data.json();
        if (result.data?.length > 0) {          
        setData(result.data);}
      } catch (error) {
        console.log(error);
      }
    };
    Get();
  }, []);
  return (
    <div className="pt-4  w-full">
      <div className="flex py-4 justify-between">
        <h2 className="text-lg lg:text-[1.4vw] font-semibold">
          Top Rated Doctors
        </h2>
        <span className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline">
        <Link href={"/dashboard/consult"} className="flex items-center">View all <FaAngleRight /></Link>
        </span>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {data.map((value:any)=>(<NearDoctorCard key={value.id} data={value} />))}
      </div>
    </div>
  );
};

export default NearbyDoctors;

const NearDoctorCard = ({data}:any) => {
  
  return (
    <div className=" col-span-3 h-full lg:col-span-2">
      <Card className="p-2 h-full">
        <CardContent className="rounded-xl overflow-hidden p-0 flex items-center">
          <div className="flex gap-2 items-center">
            <Image
              alt="Image"
              className=" aspect-square rounded-md"
              width={60}
              height={30}
              src={data.image||"https://avatar.iran.liara.run/public"}
            />
            <div className="flex flex-col">
              <Link  href={`/dashboard/consult/${data.id}`} className="text-base font-semibold hover:underline cursor-pointer leading-none">
                {data.name}
              </Link>
              <span className=" text-[12px] text-gray-600">Gynecologist</span>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-0 flex justify-end gap-2 text-[12px] text-yellow-500">
        {[...Array(data.averageRating)]?.map((_, index) =><BsStarFill key={index}/>)}
        </CardFooter>
      </Card>
    </div>
  );
};
