"use client";

import Image from "next/image";
import Link from "next/link";
import img from "@/app/images/defaultuser.jpeg";
import { Modal } from "./Modal";
import { startTransition, useEffect, useState } from "react";
import { getProfileData } from "@/actions/profile/getProfileData";
import { User } from "@/data/user";
import { PhoneVerify } from "./PhoneVerify";
import { Button } from "../ui/button";
import UploadDocument from "./upload-dialog";


interface ProfileProps {
    id: string|undefined;}

export default function Profile({
    id,
}: ProfileProps) {

    const [data, setData] = useState<User | null>(null);  
    const handleFetchProfileData = () => {
    startTransition(() => {
      getProfileData(id).then((data) => {                
          if (data){
         setData(data); 
        }
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    });
  };

 useEffect(() => handleFetchProfileData(),[])


 const updateProfileImage = async (event: any) => {
  console.log("called updateProfileImage");
  
  if (!event.target.files[0] || !id) return;
  const formData = new FormData();
  formData.append("image", event.target.files[0]);
  formData.append("userId", id);

  const response = await fetch(`/api/v1/profile/profile-pic`, {
    method: "POST",
    body: formData,
  });
  handleFetchProfileData();
};


  return (
    <>
      <div className="p-10 h-[80vh]">
        <div className="w-full h-[20vh] bg-purple-700 rounded-lg">
          <h1 className="text-white p-5">My Profile</h1>
        </div>
        <div className="sm:flex">
          <div className="bg-white shadow-xl box-border rounded-lg sm:w-[30vw] sm:mx-[100px] sm:h-[100vh] -mt-[50px] mb-[100px] sm:mb-0 pb-10 sm:pb-0">
            <div className="flex justify-between pr-2 lg:pr-4 pl-20 py-2 lg:py-4">
             <div className="w-20 h-20 rounded-full overflow-hidden relative">
             <input
                  type="file"
                  accept="image/*"
                  onChange={updateProfileImage}
                  className="hidden"
                  id="fileInput"
                  placeholder="he"
                />
                <label htmlFor="fileInput">
                <Image
                  src={data?.image || img}
                  alt="No Image"
                  className=""
                  layout="fill"
                  objectFit="cover"
                />
                </label>
            
              </div>
              <Modal details={data} refresh={handleFetchProfileData} />
            </div>
            <div className="rounded-lg sm:mx-[30px] mx-[20px] sm:text-[1vw] text-[3vw] shadow-lg box-border pb-4 border-2 border-gray-300">
              <div className="flex flex-col mx-[20px] pt-2">
                <p className="font-medium" >Your Name</p>
                <div className="flex justify-between pt-2">
                  <p className=" text-sm">{data?.name}</p>
                </div>
              </div>
              <div className="flex flex-col mx-[20px] pt-2">
                <p className="font-medium">Email</p>
                <div className="flex justify-between pt-2">
                  <p className=" text-sm">{data?.email}</p>
                </div>
              </div>
              <div className="flex flex-col mx-[20px] pt-2">
                <p className="font-medium">Phone Number</p>
                <div className="flex justify-between pt-2">
                  <p className=" text-sm">{data?.phone}</p>
                </div>
                {!data?.numberVerified && <PhoneVerify details={data} data1={data?.phone} refresh={handleFetchProfileData} />}
              </div>
            </div>
            <div className="rounded-lg sm:mx-[30px] mx-[20px] mt-4 sm:text-[1vw] text-[3vw] shadow-xl box-border pb-4 border-2 border-gray-300">
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About </p>
              </div>
              <div className="mx-[20px] pt-2 ">
                <p>
                {data?.about}
                 </p>
              </div>
            </div>
            <div className="rounded-lg border-2 border-gray-300 sm:mx-[30px] mx-[20px] mt-4 sm:text-[1vw] text-[3vw] shadow-xl box-border pb-4">
              <div className="mx-[30px] pt-5 sm:text-[1.4vw]">
                <h1>Legal</h1>
              </div>
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About Sid</p>
              </div>
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About Sid</p>
              </div>
            </div>
            <div className="rounded-lg border-2 items-center flex justify-between p-4 border-gray-300 sm:mx-[30px] mx-[20px] mt-4 sm:text-[1vw] text-[3vw] shadow-xl box-border pb-4">
             <div>
             <h1 className="text-lg font-medium" >Reports</h1>
             <p className=" text-[12px]">Doctors are able to see your report</p>
             </div>
             <UploadDocument/> 
            </div>
          </div>
          <div className="bg-white shadow-xl box-border sm:w-[30vw] sm:text-[1vw] text-[3vw] h-[100vh] -mt-[50px] rounded-lg">
            <div className="mx-[20px] p-[20px] shadow-xl box-border rounded-lg border-2 border-gray-300 mt-5">
              <h1>Professional Details</h1>
              <p>This are the professional details shown to users in the app</p>
            </div>
            <div className="mx-[20px] p-[20px] shadow-xl box-border rounded-lg border-2 border-gray-300 mt-5">
              <h1>Appointments</h1>
              <div className="w-[20vw] ">
                <p className="py-2">15 Appointments</p>
                <p>Of total Appointments</p>
              </div>
            </div>
            <div className="mx-[20px] mt-5 p-[20px] shadow-xl box-border border-2 border-gray-300 rounded-lg">
              <h1>Ratings</h1>
              <p>4 stars</p>
            </div>
            <div className="mx-[20px] pt-5">
              <h1>Doctors Review</h1>
              <div className="border-2 border-gray-300 rounded-lg shadow-md p-3">
                <h1>Ankit Srinvas</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nostrum veniam dolore sed incidunt iusto obcaecati quis fuga
                  cupiditate laboriosam ea, dolorem deleni
                </p>
              </div>
            </div>
            <div className="text-red-700 mx-[20px] pt-3">
              <Link href="/">See all Reviews</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
