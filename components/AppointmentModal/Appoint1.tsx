"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import FormSuccess from "../auth/form-sucess";
import FormError from "../auth/form-error";

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

    console.log(details.available_days);
    console.log(details.Slots);

    
    
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
        if (values.slot === -1 && values.time === "") {
            setError("Please select Details");
        } else if (values.slot === -1) {
            setError("Select Slot");
        } else if (values.time === "") {
            setError("Select Time");
        } else {
            setError("");
            onChangeApp();
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
                    <button
                        type="button"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="text-gray-600 hover:text-purple-600 transition duration-300"
                    >
                        &lt;
                    </button>
                    <div className="flex overflow-hidden">
                        {slots.slice(currentSlide, currentSlide + slidesToShow).map((slot, index) => (
                            <div
                                key={index}
                                onClick={() => form.setValue("slot", currentSlide + index)}
                                className={`p-4 cursor-pointer m-4 rounded-lg border-2 border-gray-300 ${form.watch("slot") === currentSlide + index ? 'bg-blue-100 border-blue-500' : ''
                                    }`}
                            >
                                <h3 className="font-semibold text-lg">{slot.day}</h3>
                                <p className="text-green-600 text-sm">{slot.slotsAvailable}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={nextSlide}
                        disabled={currentSlide >= slots.length - slidesToShow}
                        className="text-gray-600 hover:text-purple-600 transition duration-300"
                    >
                        &gt;
                    </button>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: Math.ceil(slots.length / slidesToShow) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
                <hr className="border-gray-300 my-4" />
            </div>

            <div>
                <h3 className="text-xl font-bold mb-3">Available Times</h3>
                <div className="flex flex-wrap gap-4">
                    {times.map((time, index) => (
                        <div
                            key={index}
                            onClick={() => form.setValue("time", time)}
                            className={`p-4 cursor-pointer rounded-lg border-2 border-gray-300 ${form.watch("time") === time ? 'bg-blue-100 border-blue-500' : ''
                                }`}
                        >
                            <p className="text-lg">{time}</p>
                        </div>
                    ))}
                </div>
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
