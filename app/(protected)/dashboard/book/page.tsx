"use client";
import { book } from "@/actions/appointment/appoint";
import FormError from "@/components/auth/form-error";
import FormSucess from "@/components/auth/form-sucess";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Appointment } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCalendarAlt, FaEnvelope, FaPhone, FaTelegram } from "react-icons/fa";
import { z } from "zod";
import { PhoneInput } from "react-international-phone";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const { control, handleSubmit } = useForm<z.infer<typeof Appointment>>({
    resolver: zodResolver(Appointment),
    defaultValues: {
      email: "",
      phone: "",
      date: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof Appointment>) => {
    startTransition(() => {
      book(values)
        .then((data) => {
          console.log(data);

          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => {
          setError("An unexpected error occurred.");
        });
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="relative lg:w-[30%] mx-auto p-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-5"
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full ">
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
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full ">
                <label htmlFor="phone" className="flex items-center space-x-1">
                  <FaPhone className="text-blue-600" />
                  <span className="text-sm text-gray-600">Phone Number</span>
                </label>
                <PhoneInput
                  defaultCountry="in"
                  className="rounded-md border bg-transparent  text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                  placeholder="Telephone"
                  disabled={isPending}
                  {...field}
                />

                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col w-full">
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
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <FormSucess message={success} />
          <FormError message={error} />
          <Button
            type="submit"
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            disabled={isPending}
          >
            <FaTelegram className="text-white" />
            Book Now
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Page;
