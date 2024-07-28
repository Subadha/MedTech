"use client"
import { CardWrapper } from "./card-warpper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { RegisterSchema } from "@/schema"
import { Button } from "../ui/button"
import { register } from "@/actions/register"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Link from "next/link"
import Image from "next/image"
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Import eye icons
import img from "@/app/images/doc1.png"
import logo from "@/app/images/logo.png"

// Define the schema with confirmPassword field and custom validation
const ExtendedRegisterSchema = RegisterSchema.extend({
    confirmPassword: z.string().min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Field which contains the error
});

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false);  // State for password visibility

    const form = useForm<z.infer<typeof ExtendedRegisterSchema>>({
        resolver: zodResolver(ExtendedRegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof ExtendedRegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data?.error);
                    setSucess(data?.sucess)
                })
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute top-4 left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="absolute top-10 right-10 z-10 text-gray-600">
                <span>Already have an account? <Link href="/auth/login" className="text-purple-700 font-bold-700">Sign in</Link> </span>
            </div>
            <div className="relative w-[50vw] bg-black">
                <Image
                    alt="Register Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="flex w-[50vw] justify-center items-center">
                <CardWrapper
                    headerTitle="Register"
                    headerLabel="Create an Account"
                    backButtonLabel="Already have an Account?"
                    backButtonHref="/auth/login"
                    showSocial
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Enter your name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Enter your email"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        placeholder="Enter your password"
                                                        type={showPassword ? "text" : "password"}
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <button
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        placeholder="Confirm your password"
                                                        type={showPassword ? "text" : "password"}
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <button
                                                            type="button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSucess message={sucess} />
                            <FormError message={error} />
                            <Button className="w-full h-10 mt-5 bg-purple-700" disabled={isPending} type="submit">Register</Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    )
}
