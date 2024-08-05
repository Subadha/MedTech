import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const MobSideBar = () => {
  return (
    <Sheet>
        <SheetTrigger asChild className="lg:hidden block">
        <Menu className="" />
      </SheetTrigger>
      <SheetContent className="p-0 littleTransition">
        <SheetHeader className=" bg-[#5b8fba] dark:bg-[#233040] h-44 p-4 items-start">
          <div className="my-3 flex w-full items-center pr-2 justify-between">
            <Avatar className="h-16 w-16 ">
              <AvatarImage
                className="rounded-full z-20"
                src={`https://avatar.iran.liara.run/username?username=Adarsh+yadav`}
                alt="@shadcn"
              />
              <AvatarFallback>AY</AvatarFallback>
            </Avatar>
            
          </div>
          <SheetTitle className="text-xl z-20 text-white">Adarsh Yadav</SheetTitle>
          <SheetDescription className="text-white opacity-85">
            +91 6392832171
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
         
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobSideBar