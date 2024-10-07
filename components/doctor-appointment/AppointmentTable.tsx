"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarDays,
  CircleCheckBig,
  CircleX,
  Clock8,
  EllipsisVertical,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { RescheduleSheet } from "./RescheduleSheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useUser } from "@/app/context/userContext";
import { useToast } from "../ui/use-toast";
import { useMail } from "../chat/chat";
import { useRouter } from "next/navigation";

export function AppointmentTable({ data,fetchData }: any) {
  const router =  useRouter();
  const {id:userId}= useUser()
  const [mail, setMail] = useMail();
  const [selected, setSelected] = useState<string[]>([]);
  const [cancleDialog,setCancleDialog]= useState('')
  const [confirmDialog,setConfirmDialog]= useState('')
  function changeSelection(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }
  const [open, setOpen] = useState("");
  const {toast}= useToast()
  const CancleFunction=async (id:string)=>{
    try {
      const canceled = await fetch("/api/v1/doctor/appointment/cancel",{
        method: "POST",
        body: JSON.stringify({id,userId})
      })
      const result = await canceled.json()
      console.log(result.success);
      if(result) {
        fetchData()
        toast({
          title:result.success,
          variant:'success'
        })
      }
      else{toast({
        title:"Unable to cancle",
        variant:'destructive'
      })}
    } catch (error) {
      console.log(error);
      toast({
        title:"Unable to cancle, try again",
        variant:'destructive'
      })
    }finally{
      setCancleDialog('')
    }
  }
  const ConfirmFunction=async (id:string)=>{
    try {
      const canceled = await fetch("/api/v1/doctor/appointment/confirm",{
        method: "POST",
        body: JSON.stringify({id,userId})
      })
      const result = await canceled.json()
      console.log(result.success);
      setConfirmDialog('')
      if(result) { 
        fetchData()
        toast({
          title:result.success,
          variant:'success'
        })
      }
      else{toast({
        title:"Unable to confirm",
        variant:'destructive'
      })}
    } catch (error) {
      setConfirmDialog('')
      console.log(error);
      toast({
        title:"Unable to confirm, try again",
        variant:'destructive'
      })
    }
  }

  return (
    <>
      <div className="flex mt-4 gap-4 lg:h-20 lg:flex-row flex-col items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm font-bold">
            <span className=" font-normal text-gray-500">Showing:</span>
            {data.length} Appoinments
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Display Columns</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex w-full flex-col gap-3 p-2  ">
                    <li className=" whitespace-nowrap">Doctor Name</li>
                    <li className="flex items-center gap-2">Problems</li>
                    <li className="flex items-center gap-2">Status</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Problems</TableHead>
            <TableHead>Reschedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((appointment: any, index: number) => (
            <TableRow
              key={index}
              className={
                selected.includes(appointment.id)
                  ? "bg-purple-50"
                  : "" + " hover:bg-purple-100 "
              }
            >
              <TableCell>
                <Checkbox
                  className="rounded"
                  onClick={() => changeSelection(appointment.id)}
                  checked={selected.includes(appointment.id)}
                />
                <span className="ml-2">{appointment.time}</span>
              </TableCell>
              <TableCell>{appointment.doctorName}</TableCell>
              <TableCell>{appointment.purpose}</TableCell>
              <TableCell>
                <Button
                  onClick={() => setOpen(appointment.id)}
                  variant="link"
                  className="pl-0"
                >
                  Reschedule
                </Button>
              </TableCell>
              <TableCell>
                <span className="flex items-center ">
                  {appointment.status === "confirmed" && (
                    <CalendarDays className="mr-2 w-4 text-green-600 " />
                  )}
                  {appointment.status === "not-confirm" && (
                    <Clock8 className="mr-2 w-4 text-yellow-500 " />
                  )}
                  {appointment.status === "canceled" && (
                    <CircleX className="mr-2 w-4 text-gray-500 " />
                  )}
                  {appointment.status === "completed" && (
                    <CircleCheckBig className="mr-2 w-4 text-green-500 " />
                  )}
                  <span className=" text-sm">{appointment.status}</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone size={18} />

                  <MessageCircle size={18} className=" cursor-pointer"  onClick={
                    () =>
                      {setMail({
                        ...mail,
                        selected: appointment.doctor_id,
                        name: appointment.doctorName,
                        type: "PRIVATE",
                      }); router.push('/dashboard/chat')}
                  } />
                </div>
              </TableCell>
              <TableCell>
              {appointment.status !== "canceled" && ( <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-24">
                    {appointment.status !== "canceled" && (
                      <DropdownMenuCheckboxItem onClick={()=>setCancleDialog(appointment.id)}>
                        Cancel
                      </DropdownMenuCheckboxItem>
                    )}
                    {appointment.status === "not-confirm" && (
                      <DropdownMenuCheckboxItem onClick={()=>setConfirmDialog(appointment.id)}>
                        Confirm
                      </DropdownMenuCheckboxItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RescheduleSheet open={open} close={() => setOpen("")} />
      <Dialog open={cancleDialog?true:false} onOpenChange={()=>setCancleDialog('')} >
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>Cancel</DialogTitle>
          <DialogDescription>
           This process is not reversible
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={()=>CancleFunction(cancleDialog)} variant="destructive">Cancle</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmDialog?true:false} onOpenChange={()=>setConfirmDialog('')} >
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
           Confirm the appointment that mean payment is done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={()=>ConfirmFunction(confirmDialog)}>Confirm</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
