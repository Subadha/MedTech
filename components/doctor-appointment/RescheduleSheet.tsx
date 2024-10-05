"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { DatePickerDemo } from "../AppointmentModal/DatePicker";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function RescheduleSheet({ open, close }: any) {
  const [details, setDetails] = useState({
    time: "",
    date: "",
  });
  const [availableDate, setAvailableDate] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

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
        setAvailableDate(data.days);
      } catch (error) {
        console.log(error);
      }
    };

    Detail();
  }, [open]);

  const fetchTime = async (e: any) => {
    try {
      const result = await fetch(
        "/api/v1/patients/appointment/available-slots",
        { method: "POST", body: JSON.stringify({ id: open, date: e }) }
      );
      const data = await result.json();
      setAvailableSlots(data.availableSlots);
    } catch (error) {
      console.log(error);
    }
  };

  const Update=async()=>{
    try {
      const result = await fetch(
        "/api/v1/patients/appointment/reschedule",
        { method: "POST", body: JSON.stringify({ id:open,...details }) }
      );
      const data = await result.json();
      setAvailableSlots(data.availableSlots);
    } catch (error) {
      console.log(error);
    }
  }

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
            <Label htmlFor="name" className="">
              Name
            </Label>
            <DatePickerDemo
              setDate={(e: any) => {
                setDetails({ time: "", date: e });
                fetchTime(e);
              }}
              availableDays={availableDate}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="">
              Select time slot
            </Label>
            <Select
             onValueChange={(value) => {
              setDetails((prevState: any) => ({
                ...prevState,
                time: value
              }))}}
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
