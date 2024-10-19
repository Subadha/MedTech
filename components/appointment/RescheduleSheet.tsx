"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { isBefore } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useToast } from "../ui/use-toast";

export function RescheduleSheet({ open, refresh, close }: any) {

  const {toast}=useToast()

  const [details, setDetails] = useState({
    time: "",
    date: "",
  });
  const [date, setDate] = useState<Date>();
  const [availableDate, setAvailableDate] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  console.log(date);

  useEffect(() => {
    const Detail = async () => {
      try {
        if (!open) {
          return;
        }
        const result = await fetch(
          "/api/v1/patients/appointment/available-days",
          { method: "POST", body: JSON.stringify({ id: open }) }
        );
        const data = await result.json();
        refresh();
        setAvailableDate(data.days);
      } catch (error) {
        console.log(error);
      }
    };

    Detail();
  }, [open]);

  const fetchTime = async (selectedDate: Date) => {
    try {
      const result = await fetch(
        "/api/v1/patients/appointment/available-slots",
        {
          method: "POST",
          body: JSON.stringify({ id: open, date: selectedDate }),
        }
      );
      const data = await result.json();
      setAvailableSlots(data.availableSlots);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setDetails((prevDetails:any) => ({
        ...prevDetails,
        date: selectedDate, // Save date in a consistent format
      }));
      fetchTime(selectedDate); // Fetch available time slots for the selected date
    }
  };

  const Update = async () => {
    try {
      const result = await fetch("/api/v1/patients/appointment/reschedule", {
        method: "POST",
        body: JSON.stringify({ id: open, ...details }),
      });
      const data = await result.json();
      if(data.success) {
        refresh()
        toast({
          title:data.success,
          variant:'success'
        })
      }
      else{toast({
        title:"Unable to reschedule",
        variant:'destructive'
      })}
    } catch (error) {
      console.log(error);
    }
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

  const today = new Date();
  const availableDayNumbers = availableDate.map(getDayNumber);

  const isDaySelectable = (date: Date) => {
    const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    return !isBefore(date, today) && availableDayNumbers.includes(dayOfWeek);
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Reschedule</SheetTitle>
          <SheetDescription>
            Change appointment time according to your convenience
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name">Select Date</Label>
            <Calendar
              className="mx-auto"
              mode="single"
              selected={date}
              onSelect={handleDateSelect} // Using the updated handler
              initialFocus
              disabled={(date) => !isDaySelectable(date)} // Disable dates that are not selectable
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username">Select time slot</Label>
            <Select
              onValueChange={(value) => {
                setDetails((prevState: any) => ({
                  ...prevState,
                  time: value,
                }));
              }}
              defaultValue={details.time}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableSlots?.map((val: string) => (
                    <SelectItem key={val} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={Update}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
