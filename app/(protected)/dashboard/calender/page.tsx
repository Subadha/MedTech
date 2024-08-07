"use client";
import React from "react";
import randomColor from "randomcolor";
import dynamic from "next/dynamic";
const Calendar = dynamic(() => import("react-awesome-calendar"), {
  ssr: false,
});
const CalendarPage = () => {
  const events = [
    {
      id: 1,
      color: randomColor({
        luminosity: 'dark',
        format: 'rgb',
     }),
      from: "2024-08-06T18:00:00+00:00",
      to: "2024-08-07T19:00:00+00:00",
      title: "Tsting",
    },
    {
      id: 2,
      color: "#1ccb9e",
      from: "2024-08-07T13:00:00+00:00",
      to: "2024-08-08T14:00:00+00:00",
      title: "This is another event",
    },
    {
      id: 3,
      color: "#3694DF",
      from: "2024-08-08T13:00:00+00:00",
      to: "2024-08-08T20:00:00+00:00",
      title: "This is also another event",
    },
  ];


  return (
    <div className="py-12 px-6 lg:py-12 lg:px-12">
      <Calendar events={events} />
    </div>
  );
};

export default CalendarPage;
