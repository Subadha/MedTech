import { useForm } from "react-hook-form";
import FormError from "../auth/form-error";
import FormSucess from "../auth/form-sucess";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { getProfileData } from "@/actions/profile/getProfileData";
import { useUser } from "@/app/context/userContext";

const AppointmentSchema = z.object({
    purpose: z.string().min(1, "Purpose is required"),
    name: z.string().min(1, "Name is required"),
    age: z.number().min(1, "Age is required"),
    gender: z.string().min(1, "Gender is required"),
});

type AppointmentFormInputs = z.infer<typeof AppointmentSchema>;

export default function Appoint2({ onChangeApp }: any) {
    const [isLoading, setIsLoading] = useState(false);
   const {id}=useUser()
    const form = useForm<AppointmentFormInputs>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            purpose: "",
            name: "",
            age:0,
            gender: "",
        },
    });

   useEffect(()=>{
    const GetDetails =async ()=>{
        try {
           const data:any = await getProfileData(id)
           console.log(data);
           form.reset({
            name: data.name || "",
            gender: data.gender || "",
            age: data.age ||""
        });
        } catch (error) {
            console.log(error);
            
        }
    }
    GetDetails();
   },[])

    const onSubmit = async (values: AppointmentFormInputs) => {
        onChangeApp(values);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-5 overflow-y-auto">
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg pb-3">Describe the purpose of the consultation in details</h1>
                    <div className="w-full">
                        <Input
                            className="border-2 rounded-sm p-4 w-full"
                            placeholder="Hello Doctor, I want to consult with you because..."
                            {...form.register("purpose")}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg pb-3 pt-3">Patient Details</h1>
                    <div className="w-full">
                        <label className="text-gray-700">Name*</label>
                        <div className="pt-3">
                            <Input
                                className="border-2 rounded-sm p-4 w-full"
                                placeholder="Swetha"
                                {...form.register("name")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex pt-3 gap-7">
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label className="text-gray-700">Age*</label>
                            <div className="pt-3">
                                <Input
                                    type="number"
                                     min="0"
                                    className="border-2 rounded-sm p-4 w-full"
                                    placeholder="Please Enter Age"
                                    {...form.register("age", { valueAsNumber: true })}
                                    onInput={(e:any) => {
                                        e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                    }}
                               />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-full">
                            <label className="text-gray-700">Gender*</label>
                            <div className="pt-3 w-full">
                                <Select
                                 value={form.watch("gender")}
                                 onValueChange={(value) => form.setValue("gender", value)}
                                >
                                      <SelectTrigger className="border-2 rounded-sm p-4 w-[180px]">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                              <SelectContent
                                    className="bg-white w-full"
                                    defaultValue=""
                                >
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <Button
                        className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                        type="submit"
                    >
                       {isLoading ? 'Processing...' : 'Pay Now'}
                    </Button>
                </div>
            </div>
        </form>
    );
}
