"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import FormSucess from "../auth/form-sucess";
import FormError from "../auth/form-error";

const AppointmentSchema = z.object({
    slot: z.number(),
    time: z.string(),
});

export default function Appoint1({ details,onChangeApp }: any) {
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

    const slots = [
        { day: "Today", slotsAvailable: "5 slots Available" },
        { day: "Today", slotsAvailable: "5 slots Available" },
        { day: "Today", slotsAvailable: "5 slots Available" },
        { day: "Today", slotsAvailable: "5 slots Available" },
        { day: "Today", slotsAvailable: "5 slots Available" },
    ];

    const generateTimes = () => {
        return [
            "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
        ];
    };

    const times = generateTimes();
    const slidesToShow = 3;

    const nextSlide = () => {
        if (currentSlide < slots.length - slidesToShow) {
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
        if (values.slot === -1 && values.time === ""){
            setError("Please select Details")
        }
        else if(values.slot===-1){
            setError("Select Slot")
        }else if(values.time===""){
            setError("Select Time")
        }else{
            setError("");
            onChangeApp();
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4">
                <div className="flex flex-col mt-5">
                    <span className="text-purple-600 font-bold text-xl">{details?.name}</span>
                    <div className="flex mt-2">
                        <span>{details?.specialization}</span>
                        <span className="pl-3">{details?.experience}</span>
                    </div>
                </div>
                <div className="pt-5">
                    <hr className="bg-black-800" />
                    <div className="flex items-center pt-3 pb-3">
                        <button onClick={prevSlide} disabled={currentSlide === 0} className="mr-4">
                            &lt;
                        </button>
                        <div className="flex overflow-hidden text-center">
                            {slots.slice(currentSlide, currentSlide + slidesToShow).map((slot, index) => (
                                <div
                                    key={index}
                                    onClick={() => form.setValue("slot", currentSlide + index)}
                                    className={`mr-4 p-3 cursor-pointer ${form.watch("slot") === currentSlide + index ? 'bg-blue-100' : ''
                                        }`}
                                >
                                    <h1 className="font-bold">{slot.day}</h1>
                                    <p className="text-green-600 text-sm w-full">{slot.slotsAvailable}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={nextSlide} disabled={currentSlide >= slots.length - slidesToShow} className="ml-4">
                            &gt;
                        </button>
                    </div>
                    <div className="flex justify-center mt-4">
                        {slots.slice(0, slots.length - slidesToShow + 1).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 mb-3 rounded-full mx-1 ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                    <hr />
                </div>
                <div className="flex flex-col pt-5">
                    <h1 className="text-xl font-bold">Evening</h1>
                    <div className="flex flex-wrap gap-4 mt-3">
                        {times.map((time, index) => (
                            <div
                                key={index}
                                onClick={() => form.setValue("time", time)}
                                className={`rounded-lg border-2 w-[9vw] p-4 flex justify-center items-center cursor-pointer
                                                ${form.watch("time") === time ? 'bg-blue-100 border-blue-500' : ''}`}
                            >
                                <p>{time}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <FormSucess message={success} />
                <FormError message={error} />
                <div className="pt-5">
                    <Button
                        className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                        type="submit"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </form>
    );
}
