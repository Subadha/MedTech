"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import FormSuccess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { isBefore } from "date-fns";

// Define the schema
const AppointmentSchema = z.object({
  time: z.string().nonempty("Time is required"), // Time must be selected
  date: z.string().nonempty("Date is required"),  // Date must be selected
});

export default function Appoint1({ details, onChangeApp }: any) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Initialize form
  const form = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      time: "",
      date: new Date(),
    },
  });

  const onSubmit = () => {
    onChangeApp({ time: form.getValues("time"), date: selectedDate });
  };

  const getDayNumber = (dayName: string) => {
    const dayMap: { [key: string]: number } = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    return dayMap[dayName];
  };

  const today = new Date(); // Current date
  const availableDayNumbers =
    details?.doctorAvailabilityDetails?.availableDays.map(getDayNumber);

  const isDaySelectable = (date: Date) => {
    const dayOfWeek = date.getDay();
    // Disable dates in the past and dates not in availableDays
    return !isBefore(date, today) && availableDayNumbers.includes(dayOfWeek);
  };

  return (
    <form className="space-y-1 lg:p-6 bg-white rounded-lg">
      <div className="justify-between flex">
        <h2 className="text-2xl font-bold text-purple-600">{details?.name}</h2>
        <div>
          <p className="text-sm text-gray-600 mt-1 leading-none">
            {details?.doctorProfile.specialization}
          </p>
          <p className="text-sm text-gray-600">
            {details?.doctorProfile.experienceYears} Years of experience
          </p>
        </div>
      </div>

      <div>
        <hr className="border-gray-300 my-4" />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">Select date & time</h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(e: any) => {
                setSelectedDate(e); // Update local state for selected date
              }}
              disabled={(date) => !isDaySelectable(date)}
              className="rounded-md border"
            />
          </div>
        </div>
        <Select
          onValueChange={(value) => {
            form.setValue("time", value);
          }}
          defaultValue={form.getValues("time")}
        >
          <SelectTrigger className="w-full mt-4">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {details?.doctorAvailabilityDetails?.availableTimeSlot.map(
                (val: string) => (
                  <SelectItem key={val} value={val}>
                    {val}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <hr className="border-gray-300 my-4" />
      </div>

      <FormSuccess message={success} />
      <FormError message={error} />

      <div className="text-center mt-2">
        <Button className="w-full" onClick={onSubmit}>
          Next
        </Button>
      </div>
    </form>
  );
}
