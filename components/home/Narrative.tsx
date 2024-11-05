"use client";
import Image from "next/image";
import c10 from "@/app/images/p1.png";
import c11 from "@/app/images/p2.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";

export default function Narrative() {
    const[reviews,setReviews]=useState([])
  useEffect(() => {
    const FetchReviews = async () => {
      try {
        const response = await fetch("/api/review/get-top3");
        const data = await response.json()
        setReviews(data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    FetchReviews()
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col lg:flex-row items-center sm:min-h-screen bg-purple-100 px-4 md:px-[150px] py-10">
        <div className="text-center md:text-left mb-10 lg:mb-0 sm:flex-1">
          <p className="text-purple-700 font-bold mb-2">Our Testimonial</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-5">
            Healing Narrative
          </h1>
          <Link href="/reviews" className="bg-purple-700 w-[200px] p-3 h-[50px] rounded-lg text-white font-bold">
            See All Reviews
          </Link>
        </div>
        <div className="flex flex-col items-center lg:flex-1 lg:ml-10">
          {reviews?.map((data:any,ind:any)=>(<div key={ind} className="flex flex-col sm:flex-row items-center px-4 w-full bg-white mb-10 shadow-md rounded-lg overflow-hidden">
            <div className="p-6 flex-1">
              <p className="mb-4">
                {data?.review}
              </p>
              <div className="font-bold text-xl mb-2">{data?.name}</div>
              <div className="flex gap-1">{[...Array(+data?.rating)].map((ind) => (
                          <Star key={ind} className=" text-yellow-500 w-4" />
                        ))}</div>
            </div>
            <div className="w-full sm:w-[120px] h-[120px] relative">
              <Image
                src={'https://avatar.iran.liara.run/public'}
                alt="Gabby Smith"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>))}
        
        </div>
      </div>
    </motion.div>
  );
}
