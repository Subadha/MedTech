"use client"
import { motion } from "framer-motion"
import { SlidersVertical } from "lucide-react"
import Image from "next/image"
import { FaUserDoctor } from "react-icons/fa6"
import { TbHealthRecognition } from "react-icons/tb";

export const Services = () => {
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
    <div className="mx-auto mt-20 h-full w-full max-w-7xl px-2 lg:px-8 lg:mb-10 bg-purple-200">
      <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 py-12">
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
          <TbHealthRecognition className="text-4xl text-white" />

          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Fetel Parameters</h3>
          <p className="mt-4 text-sm text-gray-600">
            Fetel Parameter like fetel heart rate can be monitored continously and in real time
          </p>
        </div>
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
          <SlidersVertical className="text-white text-2xl" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Maternal Parameters</h3>
          <p className="mt-4 text-sm text-gray-600">
            Maternal parameters like maternal heart rate uterine contractions,monitored in real time
          </p>
        </div>
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
          <FaUserDoctor className="text-white text-3xl" />
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Doctor Consultation</h3>
          <p className="mt-4 text-sm text-gray-600">
            Enable seamless healthcare collaboration by instantly sharing real-time patient date with docors for prommpt checkups and consulations
          </p>
        </div>

      </div>
    </div>
    </motion.div>
  )
}
