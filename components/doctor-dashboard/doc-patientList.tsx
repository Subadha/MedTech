"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
import { useUser } from "@/app/context/userContext";
import { Badge } from "../ui/badge";
import Image from "next/image";

const PatientList = () => {
  const { id } = useUser();
  const [rangeType, setRangeType] = useState("daily");
  const [list, setList] = useState<any>([]);
  const Getappointments = async () => {
    try {
      const result = await fetch("/api/v1/doctor/upcoming-appointment", {
        method: "POST",
        body: JSON.stringify({ userId: id, rangeType }),
      });
      const data = await result.json();
      if (data.data.length > 0) {
        setList(data.data);
      }
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getappointments();
  }, [rangeType]);
  return (
    <Card className="mt-4 w-full">
      <div className="flex p-4 justify-between">
        <h2 className="text-lg lg:text-[1.4vw] font-semibold">Patient List</h2>
        <Selection Change={(e: any) => setRangeType(e)} />
      </div>
      <div className=" flex flex-col gap-1 p-2">
        {list?.map((data:any, ind:any) => (
          <div className="border flex justify-between items-center px-3 py-2 rounded-lg" key={ind}>
            <div className="flex gap-2">
              <Image
               width={40}
               height={40}
               className=" aspect-square w-12"
                alt="Patient"
                src={`https://avatar.iran.liara.run/username?username=${
                  data?.name.split(" ")[0]
                }${data?.name.split(" ")[1]?`+${data?.name.split(" ")[1]}`:''}`}
              />
              <div>
                <h2 className=" font-medium">{data?.name}</h2>
                <p className=" text-sm">{data?.purpose}</p>
              </div>
            </div>
            <Badge>{data.time}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PatientList;

function Selection({ Change }: any) {
  return (
    <Select onValueChange={Change}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Daily" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="15-days">15 days</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
