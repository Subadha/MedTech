"use client";
import React, { useEffect, useState } from "react";
import randomColor from "randomcolor";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/app/context/userContext";

const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});



const CalendarPage = () => {
  const {id}= useUser()
  const [data, setData] = useState<any>([]);
useEffect(() => {
  const GetData = async () => {
    try {
      const data = await fetch("/api/v1/patients/calender", {
        method: "POST",
        body: JSON.stringify({ userId: id || '' }),
      });
      const result = await data.json();
      if(result.success){
        setData(result.data);
      }
      
    } catch (error) {
      console.log(error);
      
     }
  };
  GetData();
}, []);

  const updatedEvents = data.map((event:any) => {
    const color = randomColor();
    const formattedDate = new Date(event.date).toISOString().slice(0, 19);
    return {
      title: event.doctorName,
      start:formattedDate,
      backgroundColor: color,
    };
  });
 console.log(updatedEvents);
 
  return (
    <div className="pt-10 px-6 min-h-[90vh] lg:py-10 lg:px-12">
      <Card className="lg:p-4 p-1 h-[calc(100vh-100px)] lg:h-full overflow-y-auto">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "today",
            center: "prev title next",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
          }}
          weekends={true}
          events={updatedEvents}
          eventContent={renderEventContent}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: false,
            hour12: false,
          }}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
        />
      </Card>
    </div>
  );
};

export default CalendarPage;

function renderEventContent(eventInfo: any) {
  console.log(eventInfo)
  const { backgroundColor } = eventInfo;
  let bgColorWithOpacity = backgroundColor;

  if (backgroundColor.startsWith("#")) {
    bgColorWithOpacity = hexToRgba(backgroundColor, 0.3);
  } else if (backgroundColor.startsWith("rgb")) {
    bgColorWithOpacity = backgroundColor
      .replace("rgb", "rgba")
      .replace(")", `, 0.3)`);
  } else {
    bgColorWithOpacity = "rgba(0, 0, 0, 0.4)"; // Default to black with 0.3 opacity
  }
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: bgColorWithOpacity,
        border: `4px solid ${backgroundColor}`,
      }}
      className={`rounded-md text-black p-2`}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="event-time">
          <Badge
            className="text-black"
            style={{ backgroundColor: backgroundColor }}
          >
            {eventInfo.timeText}
          </Badge>

          <div className=" mt-4 leading-tight font-medium">
            <p>Meeting with Dr.{eventInfo.event.title}</p>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function hexToRgba(hex: string, opacity: number) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
