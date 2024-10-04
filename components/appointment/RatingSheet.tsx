"use client";
import { Button } from "@/components/ui/button";
import "./ratingStyle.css";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export function RatingSheet({ open, close }: any) {
  const [details, setDetails] = useState({
    rating: "",  // Storing the rating value
    message: "", // Storing the message value
  });
  const { toast } = useToast();

  const handleRatingChange = (e: any) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      rating: e.target.value, // Update the rating value in the state
    }));
  };

  const handleMessageChange = (e: any) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      message: e.target.value, // Update the message value in the state
    }));
  };

  const Update = async () => {
    try {
      const result = await fetch("/api/v1/doctor/review/add", {
        method: "POST",
        body: JSON.stringify({ appointmentId: open, ...details }),
      });
      const data = await result.json();
      console.log(data);
      if (data?.success) {
        toast({ variant: "success", title: data?.success });
      }
      if (data?.error) {
        toast({ variant: "destructive", title: data?.error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rating</SheetTitle>
          <SheetDescription>Rate your appointment experience</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="">
              Rating
            </Label>
            <div className="rating flex flex-row-reverse justify-center">
              <input
                value="5"
                name="rate"
                id="star5"
                type="radio"
                onChange={handleRatingChange}
              />
              <label title="5 stars" htmlFor="star5"></label>
              <input
                value="4"
                name="rate"
                id="star4"
                type="radio"
                onChange={handleRatingChange}
              />
              <label title="4 stars" htmlFor="star4"></label>
              <input
                value="3"
                name="rate"
                id="star3"
                type="radio"
                onChange={handleRatingChange}
                checked={details.rating === "3"}
              />
              <label title="3 stars" htmlFor="star3"></label>
              <input
                value="2"
                name="rate"
                id="star2"
                type="radio"
                onChange={handleRatingChange}
              />
              <label title="2 stars" htmlFor="star2"></label>
              <input
                value="1"
                name="rate"
                id="star1"
                type="radio"
                onChange={handleRatingChange}
              />
              <label title="1 star" htmlFor="star1"></label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="message" className="">
              Message
            </Label>
            <Textarea
              value={details.message}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={Update}>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
