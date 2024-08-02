"use client";
import { Menu } from "lucide-react";
import React from "react";
import { SearchBar } from "./search-bar";
import { GoBell } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

type HeaderProps = {
  userName: string;
  toggleMenu: any;
};
const Header = ({ toggleMenu, userName }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 h-20 p-4">
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <h3 className="text-xl font-bold">
        <span className="text-base font-normal text-gray-600">
          Hi, {userName}
        </span>
        <br /> Welcome Back
      </h3>

      <div className="flex items-center lg:gap-[5vw]">
        <SearchBar />
        <div className="flex items-center lg:gap-6">
          <LanguageSelection />
          <GoBell className="text-xl" />
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{userName.split(" ")[0]}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
const components: { title: string; href: string }[] = [
    {
      title: "Hindi",
      href: "/docs/primitives/alert-dialog",
    },
    {
      title: "English",
      href: "/docs/primitives/hover-card",
    },
    {
      title: "Bengali",
      href: "/docs/primitives/progress",
    },
    {
      title: "Marathi",
      href: "/docs/primitives/scroll-area",
    },
    {
      title: "Telugu",
      href: "/docs/primitives/tabs",
    },
    {
      title: "Tamil",
      href: "/docs/primitives/tooltip",
    },
  ];
  

export function LanguageSelection() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>EN</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col gap-3 p-2  ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                >
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(({ className, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <div
            ref={ref}
            className={cn(
              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </NavigationMenuLink>
      </li>
    );
  });
  
  ListItem.displayName = "ListItem";