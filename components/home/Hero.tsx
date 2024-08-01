"use client"
import Image from "next/image"
import img2 from "../../app/images/doc3.png"
import CharacterRevealText from "./TextReveal"
import { motion } from "framer-motion";

export default function Hero() {


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
    <div className="relative w-full h-auto bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <CharacterRevealText/>
          <p className="mt-8 text-lg text-gray-700 sm:text-left text-center">
            Sharing the future of health with breakthrough innovations that promote physical, mental, and spiritual wellness.
          </p>
        </div>
        <div className="relative lg:col-span-5 xl:col-span-6 h-64 lg:h-auto">
          <Image
            src={img2}
            alt="Health innovation image"
            layout="fill"
            className="w-full h-full"
          />
        </div>
      </div>
    
    </div>
    </motion.div>
  )
}
