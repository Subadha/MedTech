"use client";
import React from "react";
import { icons, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import { SignOut } from "@/actions/signout";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string;
  icon: keyof typeof icons; 
  href: string;
}

export const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
  },
  {
    name: "Appointment",
    icon: "UserRoundCheck",
    href: "/dashboard/appointment",
  },
  {
    name: "Consult",
    icon: "BriefcaseMedical",
    href: "/dashboard/consult",
  },
  {
    name: "Calendar",
    icon: "Calendar",
    href: "/dashboard/calender",
  },
  // {
  //   name: "Book",
  //   icon: "UserRoundCheck",
  //   href: "/dashboard/book",
  // },
  {
    name: "Profile",
    icon: "CircleUserRound",
    href: "/dashboard/profile",
  },
  {
    name: "Help",
    icon: "MessageCircleQuestion",
    href: "/dashboard/help",
  },
];

type SideNavProps = {
  userName: string;
  role: string;
};

export default function SideNav({ userName, role }: SideNavProps) {
  const location = usePathname();
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await SignOut(); // Sign out the user
  };

  return (
    <aside className={`lg:block hidden h-full w-64`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} alt="logo" width={70} height={70} />
          </Link>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = icons[item.icon];
          return (
            <a
              key={item.name}
              href={item.href}
              className={`flex gap-2 py-2 px-3 rounded ${item.href === location ? "bg-primary text-white" : ""}`}
            >
              <span>
                <Icon className="w-5" />
              </span>
              {item.name}
            </a>
          );
        })}
        <form onSubmit={handleLogout} className="mt-4">
          <button
            type="submit"
            className="w-full flex gap-2 py-2 px-3 text-left rounded hover:bg-primary hover:text-white"
          >
            <LogOut className="w-5" />
            Sign Out
          </button>
        </form>
      </nav>
    </aside>
  );
}
