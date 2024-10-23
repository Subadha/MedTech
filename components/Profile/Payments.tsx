"use client";
import img from "@/app/images/doc1.png";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserPayments({ id }: any) {
  const [date, setDate] = useState<Date>(new Date())
  const [payments, setPayments] = useState<any>([]);
  useEffect(() => {
    const GetList = async () => {
      try {
        const result = await fetch(`/api/v1/patients/payment/get?userId=${id}&date=${date}`);
        const data = await result.json();
        console.log(data);
        if(data?.data?.length){setPayments(data.data)}
      } catch (error) {
        console.log(error);
      }
    };
    GetList()
  }, [date]);


  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg md:text-xl">Payments</h1>
        <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="text-sm w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
      </div>

      {/* Payment List */}
      {payments.length?payments?.map((payment: any, index: number) => (
        <div key={index} className="flex flex-col">
          <div className={cn(
            "border-2 rounded-lg",
            payment.paymentStatus==="success"?"bg-green-700/10 border-green-700":" bg-red-700/20 border-red-600"
          )}>
            <div className="flex flex-col md:flex-row justify-between p-3 items-center">
              <div className="flex items-center mb-3 md:mb-0">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                   width={60}
                   height={60}
                    src={payment?.doctor?.image || img}
                    alt="payer"
                    className="object-cover aspect-square"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-sm md:text-md font-semibold">
                    {payment?.doctor?.name}
                  </h1>
                  <p className="text-sm md:text-md">
                    Amount: {payment.amount} ₹
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[14px]">
                {new Date(payment.createdAt).toISOString().split('T')[0]}
                </p>
                {payment.paymentStatus === "success" ? (
                  <CheckCircle className="text-green-500 w-5" />
                ) : (
                  <XCircle className="text-red-500 w-5" />
                )}
              </div>
            </div>
            <div className="px-5 pb-5 w-full">
              <p
                className={`text-sm md:text-md ${
                  payment.paymentStatus === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {payment.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      )):<p className=" mx-auto">No payment available</p>}
    </div>
  );
}
