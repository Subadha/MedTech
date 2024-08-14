import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useMail } from './chat';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface MailItem {
    id: string;
    creator: {
      name: string;
    };
    read: boolean;
    updated_at: string;
    labels: string[];
  }
  
  interface ChatListProps {
    items: MailItem[];
    sheetState:boolean
  }

const ContactList = ({ items,sheetState }: ChatListProps) => {

    const [mail, setMail] = useMail();
 
    const [randomNumber, setRandomNumber] = useState(0);
 
    useEffect(() => {
      const number = Math.floor(Math.random() * 11);
      setRandomNumber(number);
    }, [randomNumber]); 
 
  return (
    <div className="h-full w-full"> 
      <ScrollArea className="h-[calc(100%-64px)]">
    <div className="origin-top-right flex flex-col mt-4 p-3 pt-0">
      {items?.map((item,index) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg p-2 text-left text-sm transition-all",mail.selected !== item.id&&"hover:bg-muted",
            mail.selected === item.id && "bg-primary",
          )}
          onClick={() =>
            setMail({
              ...mail,
              selected: item.id,
              name:item.creator.name
            })
          }
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                className="rounded-full"
                  src={`https://avatar.iran.liara.run/username?username=${item.creator.name || "Default Name"}`}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className={`flex w-[calc(100%-70px)] ${mail.selected?'':'border-b'} mt-1 gap-2`}>
               <div>
               <h3 className={cn(
                  "font-medium text-[14px]",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-forground",
                )}>{item.creator.name||"User "+index}</h3>
               
               </div>
                <div
                className={cn(
                  "ml-auto text-xs flex flex-col items-end gap-1",
                  mail.selected === item.id
                    ? "text-white"
                    : "text-muted-foreground",
                )}
              >
                {formatDistanceToNow(new Date(item?.updated_at), {
                  addSuffix: true,
                })}
                {mail.selected !== item.id&&<span><Badge className=" scale-75">{randomNumber}</Badge></span>}
              </div>
              </div>
             
            </div>
          </div>
        </button>
      ))}
    </div>
  </ScrollArea>
  <div className='w-full h-16 flex items-center justify-center px-4 border-t' >
   <Input placeholder='Search name' ></Input>
  </div>
  </div>
  )
}

export default ContactList