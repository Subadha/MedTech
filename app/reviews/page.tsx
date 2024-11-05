"use client";
import { Footer } from "@/components/home/Footer";
import NavBar from "@/components/home/Navbar";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const FetchReviews = async () => {
      try {
        const response = await fetch("/api/review/get");
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    FetchReviews();
  }, []);
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Customer Reviews
        </h1>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {reviews?.map((data: any, ind: any) => (
            <div
              key={ind}
              className="flex flex-col sm:flex-row p-4 items-center w-full bg-white mb-10 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="w-[120px] h-[120px] relative">
                <Image
                  src={"https://avatar.iran.liara.run/public"}
                  alt={data?.name || "Reviewer image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border border-gray-300 shadow-sm"
                />
              </div>

              <div className="p-6 flex-1">
                <div className="font-bold text-2xl mb-2 text-gray-800">
                  {data?.name}
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(+data?.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-500 w-5" />
                  ))}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {data?.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
