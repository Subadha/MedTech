"use client"
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { icons, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { adminItems, docItems, menuItems } from "../home/SideNav";
import { SignOut } from "@/actions/auth/signout";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/app/context/userContext";
import { IsDoctorEnrolled } from "@/actions/dashboard/IsDoctorEnrolled";

type HeaderProps = {
  userName: string;
  role: string;
  image: string;

};

interface MenuItem {
  name: string;
  icon: keyof typeof icons;
  href: string;
}
const MobSideBar = ({ userName, image, role: roleProp }: HeaderProps) => {
  const role = roleProp?.toUpperCase?.() ?? "USER";
  const location = usePathname();
  const { id } = useUser();
  const router = useRouter  ();
  const [enrolled, setEnrolled] = useState<any>({
    profile: false,
    availability: false,
    license: false,
  });
  const [filtered, setFiltered] = useState<any>(docItems);
  const route = usePathname();
  useEffect(() => {
    const Check = async () => {
      const result = await IsDoctorEnrolled(id);
      setEnrolled(result);
      if (!result?.profile) {
        router.push("/dashboard/doctorEnrollment");
      }
        else if (!result?.availability) {
        router.push("/dashboard/doctorEnrollment/details");
      } else if (!result?.license) {
        router.push("/dashboard/doctorEnrollment/certificate-verification");
      }
      const filteredDocItems = result?.license&&result?.profile&&result?.availability
        ? docItems.filter((item) => item.name !== "Doctor Enrollment")
        : docItems.filter((item) =>
            ["Doctor Enrollment", "Sign Out", "Profile"].includes(item.name)
          );
      setFiltered(filteredDocItems);
    };
    if (!enrolled?.license&&role==="DOCTOR"&&location!=="/dashboard/profile"&&location!=="/dashboard/signout") {
      Check();
    }
  }, [route]);
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden block">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 littleTransition">
        <SheetHeader className=" h-44 p-4 items-start">
          <div className="my-3 flex w-full items-center pr-2 justify-between">
            <Avatar className="h-16 w-16 ">
              <AvatarImage
                className="rounded-full z-20"
                src={image||`https://avatar.iran.liara.run/public`}
                alt="@shadcn"
              />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
          </div>
          <SheetTitle className="text-xl">{userName}</SheetTitle>
          <SheetDescription className="opacity-85">{role}</SheetDescription>
        </SheetHeader>
        <nav className="p-4 space-y-2">
          {role === "USER"
            ? menuItems.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex gap-2 py-2 px-3 rounded ${
                      item.href === location ? "bg-primary text-white" : ""
                    }`}
                  >
                    <span>
                      <Icon className="w-5" />
                    </span>
                    {item.name}
                  </a>
                );
              })
            : role === "ADMIN"
              ? adminItems.map((item) => {
                  const Icon = icons[item.icon];
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex gap-2 py-2 px-3 rounded ${
                        item.href === location ? "bg-primary text-white" : ""
                      }`}
                    >
                      <span>
                        <Icon className="w-5" />
                      </span>
                      {item.name}
                    </a>
                  );
                })
              : filtered.map((item:MenuItem) => {
                  const Icon:any = icons[item.icon];
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`flex gap-2 py-2 px-3 rounded ${
                        item.href === location ? "bg-primary text-white" : ""
                      }`}
                    >
                      <span>
                        <Icon className="w-5" />
                      </span>
                      {item.name}
                    </a>
                  );
                })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobSideBar;
