"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  CheckCircle,
  CircleCheck,
  CircleCheckBig,
  Clock8,
  LucideIcon,
  MessageCircle,
  Phone,
  XCircle,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

const appointments = [
  {
    id: "klnfklsdnger3",
    time: "18:15 - 19:00",
    doctor: "Dianne Russell",
    problem: "Upper Abdomen General – Test Code 2705",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "klnfklsdngwe3",
    time: "17:45 - 18:00",
    doctor: "Bessie Cooper",
    problem: "Gynecologic Disorders",
    status: "Not confirmed",
    confirmed: false,
  },
  {
    id: "kl234klsdnger3",
    time: "17:00 - 17:30",
    doctor: "Marvin McKinney",
    problem: "Brain, Spinal Cord, and Nerve Disorders",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "klnfklsd234rer3",
    time: "15:45 - 16:30",
    doctor: "Esther Howard",
    problem: "Digestive Disorders",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "klnfkl324nger3",
    time: "14:00 - 15:30",
    doctor: "Marvin McKinney",
    problem: "Upper Abdomen General – Test Code 365",
    status: "Not confirmed",
    confirmed: false,
  },
  {
    id: "klnfkl3rer3",
    time: "12:00 - 12:30",
    doctor: "Annette Black",
    problem: "Digestive Disorders",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "klnf3re2dnger3",
    time: "11:00 - 11:30",
    doctor: "Cameron Williamson",
    problem: "Liver and Gallbladder Disorders",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "klnfkewf3fger3",
    time: "09:30 - 09:45",
    doctor: "Jerome Bell",
    problem: "Urinary Tract Disorders",
    status: "Not confirmed",
    confirmed: false,
  },
  {
    id: "klnf32r4dnger3",
    time: "9:00 - 9:15",
    doctor: "Guy Hawkins",
    problem: "Medical Care During Pregnancy",
    status: "Visited",
    confirmed: true,
  },
];

export function AppointmentTable() {
  const [selected, setSelected] = useState<string[]>([]);

  function changeSelection(id: string) {
    console.log(id);

    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <>
      <div className="flex mt-4 gap-4 lg:h-20 lg:flex-row flex-col items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm font-bold">
            <span className=" font-normal text-gray-500">Showing:</span>
            10 Appoinments
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <span className="flex items-center gap-2">
            <Checkbox className="rounded" />
            Hide visited
          </span>
          <span className="flex items-center gap-2">
            <Checkbox className="rounded" />
            Show Empty
          </span>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Display Columns</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-full flex-col gap-3 p-2  ">
                    <li className=" whitespace-nowrap">Doctor Name</li>
                    <li className="flex items-center gap-2">Problems</li>
                    <li className="flex items-center gap-2">Status</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Problems</TableHead>
            <TableHead>Reschedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow
              key={index}
              className={
                selected.includes(appointment.id)
                  ? "bg-purple-50"
                  : "" + " hover:bg-purple-100 "
              }
            >
              <TableCell>
                <Checkbox
                  className="rounded"
                  onClick={() => changeSelection(appointment.id)}
                  checked={selected.includes(appointment.id)}
                />
                <span className="ml-2">{appointment.time}</span>
              </TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{appointment.problem}</TableCell>
              <TableCell>
                <Button variant="link" className="pl-0">
                  Reschedule
                </Button>
              </TableCell>
              <TableCell>
                <span className="flex items-center ">
                  {appointment.status === "Scheduled" ? (
                    <CalendarDays className="mr-2 w-4 text-green-600 " />
                  ) : appointment.status === "Not confirmed" ? (
                    <Clock8 className="mr-2 w-4 text-yellow-500 " />
                  ) : (
                    <CircleCheck className="mr-2 w-4 text-primary" />
                  )}
                  <span className=" text-sm">{appointment.status}</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone size={18} />

                  <MessageCircle size={18} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
