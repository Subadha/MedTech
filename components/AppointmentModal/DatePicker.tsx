"use client";

import * as React from "react";
import { format, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export function DatePickerDemo({ availableDays, setDate }: { availableDays: string[], setDate: any }) {
  const today = new Date(); // Current date
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date()); // Initialize the state with null

  // Convert availableDays from string format to number format (for comparison)
  const availableDayNumbers = availableDays.map(getDayNumber);

  const isDaySelectable = (date: Date) => {
    const dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    // Disable dates in the past and dates not in availableDays
    return !isBefore(date, today) && availableDayNumbers.includes(dayOfWeek);
  };

  const handleDateSelect = (date:any) => {
    console.log(date);
    
    if (date && isDaySelectable(date)) { // Check if the selected date is valid
      setSelectedDate(date);
      setDate(date); // Call the external setDate function if needed
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${
            !selectedDate ? "text-muted-foreground" : ""
          }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => handleDateSelect(date as Date | undefined)}          
          disabled={(date) => !isDaySelectable(date)} // Disable dates not in availableDays or in the past
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
