"use client";
import { useUser } from "@/app/context/userContext";
import { AppointmentTable } from "@/components/appointment/AppointmentTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { id } = useUser();
  const [list, setList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getAllAppointments = async () => {
    const data = await fetch ("/api/v1/patients/appointment/get-all",{
      method:"POST",
      body: JSON.stringify({userId:id,status:''})
    })
    const result = await data.json()    
     if (result && result.data?.length) {
       setList(result.data); 
  };}

  useEffect(() => {
    getAllAppointments();
  }, []);

  // Filter the list based on the search term
  const filteredList = list.filter((appointment) =>
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-end lg:items-center">
        <div className="flex gap-4">
          <Input
            placeholder="Search by doctor's name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/dashboard/consult">
          <Button>+ Book Appointment</Button>
        </Link>
      </div>
      <AppointmentTable data={filteredList} refresh={getAllAppointments} />
    </div>
  );
};

export default Page;
