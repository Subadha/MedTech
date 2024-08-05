import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { menuItems } from '../home/SideNav'
import { SignOut } from '@/actions/signout'

const MobSideBar = () => {
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await SignOut(); // Sign out the user
  };
  return (
    <Sheet>
        <SheetTrigger asChild className="lg:hidden block">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent className="p-0 littleTransition">
        <SheetHeader className=" h-44 p-4 items-start">
          <div className="my-3 flex w-full items-center pr-2 justify-between">
            <Avatar className="h-16 w-16 ">
              <AvatarImage
                className="rounded-full z-20"
                src={`https://avatar.iran.liara.run/public`}
                alt="@shadcn"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            
          </div>
          <SheetTitle className="text-xl z-20 text-white"></SheetTitle>
          <SheetDescription className="text-white opacity-85">
            
          </SheetDescription>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  )
}

export default MobSideBar