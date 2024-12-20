"use client";
import Image from "next/image";
import { FaRegMessage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function PatientDetails() {
  const { id } = useUser();
  const router = useRouter();
  const [patient, setPatient] = useState<any>([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await fetch("/api/v1/doctor/all-patients-by-id", {
          method: "POST",
          body: JSON.stringify({ userId: id }),
        });
        const { data } = await result.json();   
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [id]);

  

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="pt-5 pb-5">
        <h1 className="font-bold text-xl md:text-2xl">
          {patient?.length>0?"All Patients":"No patients available"}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {patient?.map((_: any, index: any) => {
          let nameArray = _.name.split(" ");
          return (
            <Card
              key={index}
              className="flex flex-col md:flex-row gap-2 rounded-lg p-4"
            >
              <div className="flex justify-center">
                <Image
                  width={400}
                  height={600}
                  src={
                    _.image ||
                    `https://ui-avatars.com/api/?name=${nameArray[0]}+${nameArray[1]}`
                  }
                  alt="doc"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col p-5 gap-3 w-full">
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg md:text-xl">{_.name}</h1>
                  <p className="text-purple-600 text-sm md:text-base">
                    {_.about}
                  </p>
                </div>
                {/* <div className="flex flex-wrap gap-2">
                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">
                  Patient
                </span>
                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">
                  Pregnancy
                </span>
                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">
                  Maternity
                </span>
              </div> */}
                <div>
                  <p className="text-xs md:text-sm">{_.purpose} </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                  size="sm"
                    onClick={() => router.push("/dashboard/chat")}
                    variant="outline"
                  >
                    <FaRegMessage />
                  </Button>

                <div className="flex gap-2"> {_?.patientReportsDoc?.imageUrl1&&<Link target="#" href={_?.patientReportsDoc.imageUrl1} >
                 <Button size="sm" >
                    Doc 1 <ArrowUpRight />
                  </Button>
                 </Link>}
                 {_?.patientReportsDoc?.imageUrl2&&<Link target="#" href={_?.patientReportsDoc.imageUrl2} >
                 <Button size="sm">
                    Doc 2 <ArrowUpRight />
                  </Button>
                 </Link>}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
