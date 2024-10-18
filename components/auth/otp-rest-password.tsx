// /components/OtpResetPassword.tsx
"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onlyOtpVerify } from "@/schema";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import img from "@/app/images/Display.png";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CardWrapper } from "./card-warpper";
import { z } from "zod";

type FormValues = z.infer<typeof onlyOtpVerify>;

export default function OtpResetPassword() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(onlyOtpVerify),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        setError(null);
        setSuccess(null);
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                const data = await response.json();
                if (response.ok) {
                    setSuccess(data.success);
                    router.push(`/auth/new-password-mail?token=${data.token}`);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError("An error occurred. Please try again.");
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
            <div className="">
                {/* <Image
                    alt="Reset Password Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                /> */}
            </div>
            <div className="sm:flex sm:w-[50vw] flex sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="OTP Verification"
                    headerLabel="Enter the OTP sent to your email"
                    backButtonLabel="Go back"
                    backButtonHref="/auth/login"
                >
                    <Form {...form}>
                        <form className="flex justify-center items-center flex-col" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>OTP</FormLabel>
                                        <FormControl>
                                            <InputOTP {...field} maxLength={6}>
                                                <InputOTPGroup>
                                                    {[...Array(6)].map((_, index) => (
                                                        <InputOTPSlot key={index} index={index} {...field} />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <FormError message={error} />}
                            {success && <FormSuccess message={success} />}
                            <Button
                                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                                disabled={isPending}
                                type="submit"
                            >
                                {isPending ? "Verifying..." : "Verify OTP"}
                            </Button>
                            <Button
                                size="sm"
                                variant="link"
                                asChild
                                className="text-blue-500 px-0 font-normal flex justify-end"
                            >
                                <Link href="/auth/reset">Resend OTP?</Link>
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
}
