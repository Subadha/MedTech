"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import emblaCarouselAutoplay from "embla-carousel-autoplay";

export function HomeMainCarausel() {

    const Url = [
        "/homepage-image/01.webp",
        "/homepage-image/02.webp",
        "/homepage-image/03.webp",
        "/homepage-image/04.webp"
    ]

  return (
    <Carousel
    opts={{
      align: "start",
      loop: true,
    }}
    plugins={[
      emblaCarouselAutoplay({
        delay: 3100,
      }),
    ]}
    className="w-full">
      <CarouselContent>
        {Url.map((_, index) => (
          <CarouselItem key={index}>
              <Card className="p-0">
                <CardContent className=" h-[30vh] lg:h-[30vw] rounded-xl p-0 w-full overflow-hidden flex items-center justify-center">
                 <Image alt="Image" className="h-[100%] object-cover" width={600} height={300} src={_} />
                </CardContent>
              </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

