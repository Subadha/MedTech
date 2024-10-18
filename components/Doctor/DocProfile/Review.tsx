"use client";
import img from "@/app/images/doc1.png";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Review({ id }: any) {
  const [reviews, setReviews] = useState<any>([]);
  const Getreviews = async () => {
    try {
      const reviews = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/doctor/review/get`,
        {
          method: "POST",
          body: JSON.stringify({ doctorId: id }),
        }
      );
      const result = await reviews.json();
      if (result?.reviews.length > 0) {
        setReviews(result.reviews);
      }
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    Getreviews()
  },[])

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-bold text-lg md:text-xl">Reviews</h1>
      </div>

      {/* Repeating Review Block */}
      {reviews.map((_:any, index:number) => (
        <div key={_.id} className="flex flex-col">
          <div className="border-2 rounded-lg bg-gray-200">
            <div className="flex flex-col md:flex-row justify-between p-3 items-center">
              <div className="flex items-center mb-3 md:mb-0">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image width={80} height={80} src={_.patient.image} alt="patient" className="object-cover aspect-square" />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-sm md:text-md font-semibold">{_.patient.name}</h1>
                  <div className="flex gap-1">
                  {[...Array(+_.rating)].map((ind) => (
                          <Star key={ind} className=" text-yellow-500 w-4" />
                        ))}
                  </div>
                </div>
              </div>
              <div>
              <p className="text-[14px]">
                      {new Date(_.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
              </div>
            </div>
            <div className="px-5 pb-5 w-full md:w-[45vw]">
              <p className="text-sm md:text-md text-gray-700">
               {_.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
