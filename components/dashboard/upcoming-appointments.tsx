import React from "react";
import { Card, CardHeader } from "../ui/card";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

const UpcomingAppointments = () => {
  return (
    <Card className=" col-span-2">
      <CardHeader className="p-3">
       <div className="flex justify-between">
       <h1 className="text-lg lg:text-[1.4vw] font-semibold">Upcoming Appointments</h1>
        <Link
          className=" text-sm text-primary font-medium gap-1 flex items-center hover:underline"
          href={"#"}
        >
          View all
          <FaAngleRight />
        </Link>
       </div>
      </CardHeader>
    </Card>
  );
};

export default UpcomingAppointments;
