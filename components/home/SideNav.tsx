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

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Calendar",
    href: "#",
  },
  {
    name: "Book",
    href: "/dashboard/book",
  },
  {
    name: "Profile",
    href: "#",
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
  children: any;
};

export default function SideNav({ userName, role, children }: SideNavProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await SignOut(); // Sign out the user
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64  transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center">
            <Link href="/">
              {" "}
              <Image src={logo} alt="logo" width={100} height={40} />
            </Link>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <X className="h-6 w-6 text-white" />
            </button>
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

      {/* Main Content */}
      <div className="flex-1 h-full lg:ml-64">
        <Header userName={userName} toggleMenu={toggleMenu} />
        <main className="dashboard h-[calc(100vh-80px)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
