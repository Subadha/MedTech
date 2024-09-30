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
import { useState } from "react";

export function RescheduleSheet({ open, close }: any) {
  const [details, setDetails] = useState({
    time: "",
    date: "",
  });

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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">Select date</h3>
              <DatePickerDemo
                setDate={(e: any) => form.setValue("date", e)} // Set date on selection
                availableDays={
                  details?.doctorAvailabilityDetails?.availableDays
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
