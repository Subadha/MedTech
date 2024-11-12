"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Install Swiper modules

export function HomeMainCarousel() {
  const Url = [
    "/homepage-image/1.png",
    "/homepage-image/2.png",
    "/homepage-image/3.png",
    "/homepage-image/4.png",
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3700, // Autoplay interval time in milliseconds
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full  md:w-3/5 lg:w-full"
    >
      {Url.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <Card className="p-0">
            <CardContent className="h-[35vh] md:h-[60vh] lg:h-[30vw] rounded-xl p-0 w-full  overflow-hidden flex items-center justify-center">
              <Image
                alt={`Image ${index + 1}`}
                className="h-[100%] object-cover"
                width={600}
                height={300}
                src={imageUrl}
              />
            </CardContent>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
