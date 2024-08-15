import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Search,
  Smile,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNow, isSameDay, set } from "date-fns";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMail } from "./chat";
import { useEffect, useState } from "react";

export function ChatDisplay({ data, removedata }: any) {
  const [mail, setMail] = useMail();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

  const Remove = () => {
    setMail({ selected: null, name: "" });
    removedata();
  };

  const handleEmojiClick = (event:any) => {   
    setOpen(false) 
    setMessage((prevMessage: any) => prevMessage + event.emoji);
  };
  useEffect(()=>{
    setOpen(false);
    setMessage("");
  },[removedata,data])
  return (
    <div className="flex relative h-full flex-col">
      <div className="flex items-center h-16 p-3">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                disabled={!mail}
                onClick={Remove}
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back</TooltipContent>
          </Tooltip>
          {mail.name && (
            <Avatar className="h-10 w-10">
              <AvatarImage
                className="rounded-full"
                src={`https://avatar.iran.liara.run/username?username=${mail.name}`}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          <span className="text-sm font-medium">{mail.name}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Search size={20} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" disabled={!mail.selected}>
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col gap-1 bg-muted"
            >
              <DropdownMenuItem>Mute</DropdownMenuItem>
              <DropdownMenuItem>Select Messages</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="text-red-500">
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-[calc(100%-96px)] relative overflow-auto">
        <div className="flex lg:w-[70%] mx-auto p-4 pb-8 gap-2 flex-col">
          {data?.data?.length > 0 ? (
            data.data.map((item: any, index: number) => {
              const currentDate = new Date(item?.updated_at);
              const previousDate =
                index > 0 ? new Date(data.data[index - 1]?.updated_at) : null;
              const showDateSeparator =
                !previousDate || !isSameDay(currentDate, previousDate);

              return (
                <div key={index}>
                  {showDateSeparator && (
                    <div className="w-full h-10 flex flex-col justify-center items-center my-2">
                      <Separator />
                      <span className="text-sm text-muted-foreground">
                        {format(currentDate, "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}
                  <div
                    key={index}
                    className={`flex ${
                      item?.sender_id === 1 ? "justify-end" : "justify-start"
                    } `}
                  >
                    <div
                      className={`lg:max-w-[40%] max-w-[80%] px-2 py-1 font-normal rounded-t-md ${
                        item?.sender_id === 1
                          ? " rounded-l-md bg-primary text-white"
                          : " rounded-e-md bg-muted text-foreground"
                      } `}
                    >
                      <p>{item.message}</p>
                      <div className="w-full flex justify-end">
                        <p className="text-[10px] opacity-85">
                          {format(currentDate, "p")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No message selected
            </div>
          )}
          <div>
            {data?.data?.length > 0 && (
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {data?.data?.length} messages ,
                </span>
                <span className="text-sm text-muted-foreground">
                  Convertation started{" "}
                  {formatDistanceToNow(
                    new Date(data?.data[data?.data?.length - 1]?.updated_at)
                  )}{" "}
                  ago
                </span>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
      {mail.selected && (
        <div className="sticky right-0 lg:h-24 lg:bg-background bottom-0 w-full flex items-start justify-center">
          <div className="flex gap-2 h-14 items-center w-full lg:w-[70%] py-3 px-4 bg-muted lg:rounded-t-md lg:rounded-l-md">
            <Popover open={open} >
              <PopoverTrigger asChild>
                <Smile size={25} onClick={() => setOpen(true)} />
              </PopoverTrigger>
              <PopoverContent className="p-1 w-full">
                <X size={25} className="ml-auto" onClick={() => setOpen(false)} />
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </PopoverContent>
            </Popover>
            <Input
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-none shadow-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Paperclip size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="flex flex-col gap-1 bg-muted"
              >
                <DropdownMenuItem>Photo of Video</DropdownMenuItem>
                <DropdownMenuItem>File</DropdownMenuItem>
                <DropdownMenuItem>Poll</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
}
