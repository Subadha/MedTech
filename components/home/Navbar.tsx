"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import LoginButton from "../auth/login-button";
import Image from "next/image";
import logo from "@/app/images/logo.png";

const menuItems = [
  // {
  //   name: 'Product',
  //   href: '#product',
  // },
  {
    name: "Team",
    href: "team",
  },
  {
    name: "News",
    href: "news",
  }
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative w-full bg-white border-2 border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-0 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>

        <div className="hidden lg:block">
          <ul className="inline-flex space-x-10 mx-10">
            <a href="/" className="text-sm font-semibold cursor-pointer text-black hover:text-primary">Home</a>
            
            {menuItems.map((item) => (
              <li key={item.name}>
                <p
                  onClick={() => handleScroll(item.href)}
                  className="text-sm font-semibold cursor-pointer text-black hover:text-primary"
                >
                  {item.name}
                </p>
              </li>
            ))}
          <a href="/contact-us" className="text-sm font-semibold cursor-pointer text-black hover:text-primary">Contact us</a>
          </ul>
          <LoginButton>
            <Button>Sign in</Button>
          </LoginButton>
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <div className="inline-flex items-center space-x-2">
                      <Image src={logo} alt="logo" width={100} height={100} />
                    </div>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <p
                        onClick={() => handleScroll(item.href)}
                        key={item.name}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium cursor-pointer text-gray-900">
                          {item.name}
                        </span>
                      </p>
                    ))}
                  </nav>
                </div>
                <LoginButton>
                  <Button>Sign in</Button>
                </LoginButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
