"use client"

import { FaEnvelope, FaPhone, FaCalendarAlt, FaTelegram } from "react-icons/fa"
import Image from "next/image"
import img2 from "../../app/images/doc3.png"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm, Controller } from "react-hook-form"
import { Appointment } from "@/schema"
import { useState, useTransition } from "react"
import { book } from "@/actions/appoint"
import FormSuccess from "../auth/form-sucess"
import FormError from "../auth/form-error"

export default function Hero() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const { control, handleSubmit } = useForm<z.infer<typeof Appointment>>({
    resolver: zodResolver(Appointment),
    defaultValues: {
      email: "",
      phone: "",
      date: undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof Appointment>) => {
    startTransition(() => {
      book(values)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
        .catch(() => {
          setError("An unexpected error occurred.")
        })
    })
  }

  return (
    <div className="relative w-full h-auto bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <div className="mt-2 px-4 flex max-w-max items-center space-x-2 rounded-md bg-white p-1 border-2">
            <p className="text-sm font-medium text-blue-500 text-center">
              👋 Hey! We are Pregnant
            </p>
          </div>
          <h1 className="mt-8 text-5xl sm:text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl sm:text-left text-center">
            Innovation in <br /> every pulse
          </h1>
          <p className="mt-8 text-lg text-gray-700 sm:text-left text-center">
            Sharing the future of health with breakthrough innovations that promote physical, mental, and spiritual wellness.
          </p>
        </div>
        <div className="relative lg:col-span-5 xl:col-span-6 h-64 lg:h-auto">
          <Image
            src={img2}
            alt="Health innovation image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="relative w-full max-w-5xl mx-auto p-4 bg-white shadow-md rounded-md flex flex-wrap sm:flex-nowrap items-start space-y-4 sm:space-y-0 sm:space-x-4 justify-center sm:justify-between">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="email" className="flex items-center space-x-1">
                  <FaEnvelope className="text-blue-600" />
                  <span className="text-sm text-gray-600">Email Address</span>
                </label>
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                  type="email"
                  placeholder="Your email"
                  id="email"
                  disabled={isPending}
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="phone" className="flex items-center space-x-1">
                  <FaPhone className="text-blue-600" />
                  <span className="text-sm text-gray-600">Phone Number</span>
                </label>
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                  type="tel"
                  placeholder="Telephone"
                  id="phone"
                  disabled={isPending}
                  {...field}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full sm:w-1/3">
                <label htmlFor="date" className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-blue-600" />
                  <span className="text-sm text-gray-600">Date</span>
                </label>
                <input
                  className="mt-1 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                  type="date"
                  id="date"
                  disabled={isPending}
                  {...field}
                  value={field.value ? field.value : ""}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <FormSuccess message={success} />
          <FormError message={error} />
          <button
            type="submit"
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={isPending}
          >
            <FaTelegram className="text-white" />
            Book Now
          </button>
        </form>
      </div>
    </div>
  )
}
