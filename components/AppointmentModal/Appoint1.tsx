"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import FormSuccess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import { Card } from "../ui/card";

const AppointmentSchema = z.object({
    slot: z.number(),
    time: z.string(),
});

export default function Appoint1({ details, onChangeApp }: any) {
    const { toast } = useToast();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            slot: -1,
            time: "",
        },
    });
   console.log("Where",details);
   
    
    const slots = [
        { day: "Today", slotsAvailable: "5 slots Available" },
        { day: "Tomorrow", slotsAvailable: "4 slots Available" },
        { day: "Friday", slotsAvailable: "2 slots Available" },
        { day: "Saturday", slotsAvailable: "3 slots Available" },
        { day: "Sunday", slotsAvailable: "1 slot Available" },
    ];

    const generateTimes = () => {
        return ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"];
    };

    const times = generateTimes();
    const slidesToShow = 3;

    const nextSlide = () => {
        if (currentSlide < slots?.length - slidesToShow) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const onSubmit = async (values: z.infer<typeof AppointmentSchema>) => {
        if (values.slot === -1 && values.time === "") {
            setError("Please select Details");
        } else if (values.slot === -1) {
            setError("Select Slot");
        } else if (values.time === "") {
            setError("Select Time");
        } else {
            setError("");
            onChangeApp(values);
        }
    };
   
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-purple-600">{details?.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{details?.specialization}</p>
                <p className="text-sm text-gray-600">{details?.experience}</p>
            </div>

            <div>
                <hr className="border-gray-300 my-4" />
                <div className="flex items-center justify-between">
                   
                    <div className="flex flex-wrap overflow-hidden">
                        {details?.availability?.availableDays?.map((slot:string, index:number) => (
                            <div
                                key={index}
                                onClick={() => form.setValue("slot", currentSlide + index)}
                                className={`p-4 cursor-pointer m-4 rounded-lg border-2 border-gray-300 ${form.watch("slot") === currentSlide + index ? 'bg-blue-100 border-blue-500' : ''
                                    }`}
                            >
                                <h3 className="font-semibold text-lg">{slot}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                <hr className="border-gray-300 my-4" />
            </div>
                <h3 className="text-xl font-bold">Available Times</h3>
               <div onClick={() => form.setValue("time",`${details.availability.availableTimeFrom}-${details.availability.availableTimeTo}`)} className="flex h-16 gap-3">
               <Card className="flex items-center px-3"><p><span className="font-semibold">From:</span> {details.availability.availableTimeFrom}</p>
                 </Card>
                <Card className="flex items-center px-3">
                <p><span className="font-semibold">To:</span> {details.availability.availableTimeTo}</p>
                 </Card>
               </div>
            <FormSuccess message={success} />
            <FormError message={error} />

            <div className="text-center">
                <Button
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                    type="submit"
                >
                    Next
                </Button>
            </div>
        </form>
    );
}
