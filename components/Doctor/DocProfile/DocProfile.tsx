"use client"
import Image from "next/image";
import img from "@/app/images/doc1.png"
import { CgAwards } from "react-icons/cg";
import { IoMdPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import Review from "./Review";
import About from "./About";
import Edit from "./Edit";
import Password from "./Password";
import { GetDoctorById } from "@/actions/consult/GetDoctorById";
import Payments from "./Payments";

export default function DocProfile({id}:any) {
   useEffect(()=>{
    getDetails()
   },[])
   const getDetails =async()=>{
    const resp=await GetDoctorById(id)
    if(resp?.doctor){setData(resp)}
}
const[data,setData]=useState<any>([])
    const [current, setCurrent] = useState(1);

    return (
        <div className="flex flex-col md:flex-row p-5 gap-10 md:pl-5">
            {/* Left Side: Profile Info */}
            <div className="h-full flex flex-col items-center justify-center text-center border-2 rounded-lg shadow-md p-5 md:p-10 bg-gray-200 w-full md:w-1/3">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                    <Image width={80}
                     height={80}
                    src={data?.doctor?.image||`https://avatar.iran.liara.run/username?username=${
                  data?.doctor?.name.split(" ")[0]
                }${data?.doctor?.name.split(" ")[1]?`+${data?.name.split(" ")[1]}`:''}`} alt="doc" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-lg md:text-xl font-semibold">{data.doctor?.name}</h1>
                    <h2 className="text-sm md:text-md">{data?.doctor?.doctorProfile?.specialization}</h2>
                    <h2 className="text-sm md:text-md">⭐{data.avgRating}({data?.totalReviews}) Stars</h2>
                    <div className="flex gap-5">
                        <div className="flex gap-2 items-center">
                            <CgAwards className="text-lg md:text-xl" />
                            <h3 className="text-sm md:text-md">{data?.doctor?.doctorProfile?.experienceYears} Years</h3>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoMdPeople className="text-lg md:text-xl" />
                            <h3 className="text-sm md:text-md">{data?.doctor?.doctorProfile?.bookedAppointment}+ patients</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Tabs & Content */}
            <div className="flex flex-col gap-5 md:gap-10 md:pl-5 w-full">
                <div className="flex flex-col md:flex-row w-full border-2 rounded-lg bg-gray-200 justify-center items-center">
                    <div className="flex flex-col md:flex-row p-4 w-full gap-5 md:gap-10 justify-center items-center">
                        <h1 className={`cursor-pointer ${current === 1 ? 'text-primary' : ''}`} onClick={() => setCurrent(1)}>About Me</h1>
                        <h1 className={`cursor-pointer ${current === 2 ? 'text-primary' : ''}`} onClick={() => setCurrent(2)}>Reviews</h1>
                        <h1 className={`cursor-pointer ${current === 3 ? 'text-primary' : ''}`} onClick={() => setCurrent(3)}>Edit Profile</h1>
                        <h1 className={`cursor-pointer ${current === 4 ? 'text-primary' : ''}`} onClick={() => setCurrent(4)}>Payments</h1>
                        <h1 className={`cursor-pointer ${current === 5 ? 'text-primary' : ''}`} onClick={() => setCurrent(5)}>Change Password</h1>
                    </div>
                </div>

                {/* Conditional Rendering of Component */}
                <div className="w-full">
                    {current === 1 && <About id={id} refresh={getDetails} about={data?.doctor?.about} />}
                    {current === 2 && <Review id={id} />}
                    {current === 3 && <Edit id={id} refresh={getDetails} data={data?.doctor} />}
                    {current === 4 && <Payments id={id} />}
                    {current === 5 && <Password id={id} />}
                </div>
            </div>
        </div>
    )
}
