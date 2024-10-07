"use client";
import Image from "next/image";
import img from "@/app/images/doc1.png";
import { FaUserDoctor } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineAddHomeWork, MdAccessTime } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import Appoint0 from "@/components/AppointmentModal/Appoint0";
import { GetDoctorById } from "@/actions/consult/GetDoctorById";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ConsultDoctorProps {
  params: {
    consultId: string;
  };
}
export default function ConsultDoctor({ params }: ConsultDoctorProps) {
  const [data, setData] = useState<any>();
  const [totalReviews, setTotalreview] = useState<any>();
  const [avgRating, setAvgRating] = useState<any>();
  const [reviews, setReviews] = useState<any>([]);
  const Getdetails = async () => {
    try {
      const resp = await GetDoctorById(params.consultId);
      setData(resp?.doctor);
      setTotalreview(resp?.totalReviews);
      setAvgRating(resp?.avgRating);
      const reviews = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/doctor/review/get`,
        {
          method: "POST",
          body: JSON.stringify({ doctorId: params.consultId }),
        }
      );
      const result = await reviews.json();      
      if(result?.reviews.length > 0) {
      setReviews(result.reviews)}
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(()=>{
    Getdetails()
  },[])

  return (
    <>
      {data && data.doctorProfile && data?.doctorAvailabilityDetails ? (
        <div className="p-4 sm:p-8 w-full">
          <div className="flex flex-col text-center sm:text-left md:flex-row rounded-xl border border-gray-300 shadow-lg p-5 bg-white">
            <div className="w-full md:w-1/4 text-center sm:text-left flex flex-col items-center">
              <Image
                src={data?.image || ""}
                alt="Doctor"
                width={200}
                height={250}
                className="object-contain w-full h-auto rounded-lg"
              />
              <p className="mt-4 text-xs sm:text-sm md:text-base bg-green-500 text-white py-1 px-2 rounded-lg">
                Available Today
              </p>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-3/4 flex flex-col">
              <h1 className="text-purple-600 font-bold text-xl md:text-3xl">
                {data?.doctorProfile?.legalName}
              </h1>
              <div className="flex flex-wrap items-center text-sm md:text-lg mt-2">
                <p>{data?.doctorProfile?.specialization}</p>
                <p className="ml-4">
                  {data?.doctorProfile?.experienceYears} Years
                </p>
              </div>
              <div className="flex items-center mt-3 text-sm md:text-lg text-gray-600">
                <FaUserDoctor className="text-purple-500 mr-2" />
                <p className="font-bold">
                  {data?.doctorProfile?.specialization}
                </p>
              </div>
              <div className="flex items-center mt-3 text-sm md:text-lg text-gray-600">
                <IoStarSharp className="text-yellow-400 mr-2" />
                <p>
                  {avgRating}({totalReviews})
                </p>
              </div>
              <div className="flex items-center mt-3 text-sm md:text-lg text-gray-600">
                <LiaLanguageSolid className="text-blue-500 mr-2" />
                {data?.doctorAvailabilityDetails?.languages.map(
                  (val: string) => (
                    <p key={val} className="pl-2">
                      {val}
                    </p>
                  )
                )}
              </div>
              <div className="flex items-center mt-3 text-sm md:text-lg text-gray-600">
                <MdOutlineAddHomeWork className="text-red-500 mr-2" />
                <p>{data?.doctorProfile?.address}</p>
              </div>
            </div>
            <div className="w-full md:w-[20vw] mt-6 md:mt-0 flex flex-col items-end text-right">
              <div className="flex items-center text-sm md:text-lg text-gray-700">
                <FaRegMoneyBillAlt className="text-green-500 mr-2" />
                <span>INR {data?.doctorProfile?.consultationFees}</span>
              </div>
              <div className="flex items-center text-sm md:text-lg text-gray-700 mt-4">
                <MdAccessTime className="text-blue-500 mr-2" />
                <span>
                  10 - {data?.doctorAvailabilityDetails?.sessionLength} min
                  Consultation
                </span>
              </div>
              <div className="mt-6 md:mt-10 w-full">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full w-full transition-all duration-300">
                  <Appoint0 details={data} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col rounded-xl border border-gray-300 shadow-lg p-5 bg-white mb-10">
            <div className="flex justify-center items-center text-center">
              <span className="font-bold text-xl md:text-2xl text-purple-600">
                Overview
              </span>
            </div>
            <hr className="my-4 border-purple-300" />
            <div className="flex flex-col mt-5">
              <p className="text-purple-500 text-lg md:text-xl font-bold">
                Personal Statement
              </p>
              <div className="rounded-md border border-gray-300 p-5 bg-gray-100 mt-2">
                <p>{data?.about}</p>
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <p className="text-purple-500 text-lg md:text-xl font-bold">
                Doctor Information
              </p>
              <div className="rounded-md border border-gray-300 p-5 bg-gray-100 mt-2">
                <div className="flex">
                  <FaUserDoctor size={32} className="text-purple-500" />
                  <div className="flex flex-col pl-5 space-y-2">
                    <div>
                      <h1 className="text-base md:text-lg font-bold">
                        Speciality
                      </h1>
                      <p>{data?.doctorProfile?.specialization}</p>
                    </div>
                    <div>
                      <h1 className="text-base md:text-lg font-bold">
                        Other Treatment Area
                      </h1>
                      <p>{data?.doctorProfile?.subSpecialist}</p>
                    </div>
                    <div>
                      <h1 className="text-base md:text-lg font-bold">
                        Education
                      </h1>
                      <p>{data?.doctorProfile?.qualification}</p>
                    </div>
                    <div>
                      <h1 className="text-base md:text-lg font-bold">
                        Past Experience
                      </h1>
                      <p>{data?.doctorProfile?.experienceYears}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <p className="text-purple-500 text-lg md:text-xl font-bold">
                Available Timings
              </p>
              <div className="flex flex-col p-5 space-y-3">
                {data?.doctorAvailabilityDetails.availableDays?.map(
                  (day: any) => (
                    <div
                      key={day}
                      className="flex justify-between items-center w-full"
                    >
                      <p className="text-base md:text-lg font-semibold">
                        {day}
                      </p>
                      <p className="text-base md:text-lg">
                        {data?.doctorAvailabilityDetails.availableTimeFrom} To{" "}
                        {
                          data?.doctorAvailabilityDetails?.availableTimeSlot[
                            data?.doctorAvailabilityDetails?.availableTimeSlot
                              ?.length - 1
                          ]
                        }{" "}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <p className="text-purple-500 text-lg md:text-xl font-bold">
                Patient Reviews
              </p>
              {reviews?.map((_: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center p-5 mt-4 border-t border-gray-300"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={_.patientProfilePic}
                      alt="reviews"
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                  <div className="pl-5">
                    <div className="flex gap-2 items-center">
                      <h1 className="font-bold text-lg">{_.patientName}</h1>
                      <div className="flex">
                        {[...Array(+_.rating)].map((ind) => (
                          <Star key={ind} className=" text-yellow-500 w-4" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[12px]">
                      {new Date(_.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                    <p className=" text-sm">{_.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
