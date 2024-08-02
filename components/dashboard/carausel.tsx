import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import img from "../../app/images/bg_3.jpg"
import Image from "next/image"

export function MainCarausel() {
  return (
    <Carousel className="w-full max-w-[60%] ">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="p-0">
                <CardContent className="h-[35vh] rounded-xl p-0 w-full overflow-hidden flex items-center justify-center">
                 <Image alt="Image" className="w-[110%] object-cover" width={600} height={300} src={img} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

