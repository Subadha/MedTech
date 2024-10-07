// /components/NewPasswordForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import img from "@/app/images/Display.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CardWrapper } from "./card-warpper";

export default function NewPasswordOtp() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        setError(undefined);
        setSuccess(undefined);
        startTransition(async () => {
            try {
                const response = await fetch('/api/auth/new-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...values, token }),
                });
                const data = await response.json();
                if (response.ok) {
                    setSuccess(data.success);
                    // Optionally redirect to login
                    router.push('/auth/login');
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            }
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
                <Link href="/">
                    <Image src={logo} alt="Logo" fill style={{ objectFit: 'contain' }} />
                </Link>
            </div>
            <div className="">
                <Image
                    alt="Reset Password Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
                <CardWrapper
                    headerTitle="New Password"
                    headerLabel="Enter a New Password"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                                    placeholder="*******"
                                                    type={showPassword ? "text" : "password"}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="focus:outline-none"
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
                            {success && <FormSuccess message={success} />}
                            {error && <FormError message={error} />}
                            <Button
                                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                                disabled={isPending}
                                type="submit"
                            >
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    );
}
