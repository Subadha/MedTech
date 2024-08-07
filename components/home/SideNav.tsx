"use client";
import { auth, signOut } from "@/auth";
import React from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import { SignOut } from "@/actions/signout";
import { SearchBar } from "../dashboard/search-bar";
import Header from "../dashboard/header";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Appointment",
    href: "/dashboard/appointment",
  },
  {
    name: "Calendar",
    href: "/dashboard/calender",
  },
  {
    name: "Book",
    href: "/dashboard/book",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
  },
  {
    name: "Help",
    href: "/dashboard/help",
  },
];

// Define the props type
type SideNavProps = {
  userName: string;
  role: string;
};

export default function SideNav({ userName, role}: SideNavProps) {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await SignOut(); // Sign out the user
  };

  return (
      <aside
        className={` lg:block hidden h-full w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <Link href="/">
              {" "}
              <Image src={logo} alt="logo" width={100} height={40} />
            </Link>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-2 px-3 rounded hover:bg-purple-700"
            >
              {item.name}
            </a>
          ))}
          <form onSubmit={handleLogout} className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-3 text-left rounded hover:bg-purple-700"
            >
              Sign Out
            </button>
          </form>
        </nav>
      </aside>
  );
}
