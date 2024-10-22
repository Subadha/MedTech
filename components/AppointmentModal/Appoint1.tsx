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
import { useToast } from "../ui/use-toast";

// Define the schema
const AppointmentSchema = z.object({
  time: z.string().nonempty("Time is required"), // Time must be selected
  date: z.string().nonempty("Date is required"), // Date must be selected
});

export default function Appoint1({ details, onChangeApp }: any) {
  const { toast } = useToast();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      time: "",
      date:'',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form submission triggered with data:", data);

    if (form.getValues("time") === "") {
      toast({
        variant: "destructive",
        title: "Please select a time slot",
      });
      return;
    }
    if (!selectedDate) {
      toast({
        variant: "destructive",
        title: "Please select a date",
      });
      return;
    }
    onChangeApp({ time: form.getValues("time"), date: selectedDate });
  });

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

  const availableDayNumbers =
    details?.doctorAvailabilityDetails?.availableDays.map(getDayNumber);
    const isDaySelectable = (date: Date) => {
      const dayOfWeek = date.getDay();
    
      // Normalize both dates to midnight for comparison
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0); // Set today's date to midnight
      const selectedDateStart = new Date(date);
      selectedDateStart.setHours(0, 0, 0, 0); // Set the selected date to midnight
    
      // Ensure that the selected date is today or later and matches available days
      return (
        selectedDateStart >= todayStart && // Include today's date and future dates
        availableDayNumbers.includes(dayOfWeek) // Check if the day is available for the doctor
      );
    };
   
  return (
    <form
      className="space-y-1 lg:p-6 bg-white rounded-lg"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission
        handleSubmit(); // Trigger the custom submission logic
      }}
    >
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
          <h3 className="text-lg font-semibold">Select date & time</h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(e: any) => {
                setSelectedDate(e);
                form.setValue("date", e?.toISOString());
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
        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
