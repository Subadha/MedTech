// /components/ResetForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema, ResetUsingNumber } from "@/schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import img from "@/app/images/Display.png";
import { CardWrapper } from "./card-warpper";

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [error1, setError1] = useState<string | undefined>("");
    const [success1, setSuccess1] = useState<string | undefined>("");
    const router = useRouter();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        localStorage.setItem('email',values.email);
        setError("");
        setSuccess("");
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                if (response.ok) {
                    setSuccess(data.success);
                    router.push("/auth/otp-reset-pass");
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            }
        });
    };

    const form1 = useForm<z.infer<typeof ResetUsingNumber>>({
        resolver: zodResolver(ResetUsingNumber),
        defaultValues: {
            phone: "",
        },
    });

    const onSubmit1 = async (values: z.infer<typeof ResetUsingNumber>) => {
        localStorage.setItem('phone',values.phone);
        setError1("");
        setSuccess1("");
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/reset-phone', { // Ensure this endpoint exists
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                if (response.ok) {
                    setSuccess1(data.success);
                    router.push("/auth/otp");
                } else {
                    setError1(data.error);
                }
            } catch (err) {
                setError1("An unexpected error occurred.");
            }
        });
    };

    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
                <Link href="/">
                    <Image src={logo} alt="Logo" fill style={{ objectFit: 'contain' }} />
                </Link>
            </div>
            <div className="absolute sm:top-10 top-[100px] sm:right-10 z-20 text-gray-600">
                <span>
                    Remembered your password?{" "}
                    <Link href="/auth/login" className="text-purple-700 font-bold">
                        Sign in
                    </Link>{" "}
                </span>
            </div>
            {/* <div className="">
                <Image
                    alt="Reset Password Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div> */}
            <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="Reset Password"
                    headerLabel="Forgot Your Password?"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Form {...form}>
                        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
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
                            </div>
                            <FormSuccess message={success} />
                            <FormError message={error} />
                            <Button
                                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                                disabled={isPending}
                                type="submit"
                            >
                                Send reset email
                            </Button>
                        </form>
                    </Form>
                    <br />
                    <span className="flex justify-center items-center">Or</span>

                    <Form {...form1}>
                        <form className="flex flex-col" onSubmit={form1.handleSubmit(onSubmit1)}>
                            <div>
                                <FormField
                                    control={form1.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    {...field}
                                                    placeholder="Enter your Phone Number"
                                                    type="text"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSuccess message={success1} />
                            <FormError message={error1} />
                            <Button
                                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                                disabled={isPending}
                                type="submit"
                            >
                                Send OTP
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
};
