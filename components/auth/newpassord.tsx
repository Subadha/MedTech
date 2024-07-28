// components/auth/newpassword.tsx
"use client";

import { CardWrapper } from "../auth/card-warpper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "../ui/button";
import { newPassword } from "@/actions/new-password";
import { Suspense, useState, useTransition } from "react";
import FormSuccess from "./form-sucess";
import FormError from "./form-error";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NewPasswordSchema } from "@/schema";
import img from "@/app/images/doc1.png";
import logo from "@/app/images/logo.png";
import { useSearchParams } from "next/navigation";

// Wrapper component for using useSearchParams
const TokenComponent = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        throw new Error("Token is missing");
    }

    return token;
};

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false);
    const token = <TokenComponent />;

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        startTransition(() => {
            newPassword(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.sucess);
                })
                .catch(() => {
                    setError("An unexpected error occurred.");
                });
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-evenly h-[100vh]">
                <div className="absolute top-4 left-10 z-10 w-20 h-20">
                    <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
                </div>
                <div className="absolute top-10 right-10 z-10 text-gray-600">
                    <span>Back to <Link href="/auth/login" className="text-purple-700 font-bold-700">Login</Link> </span>
                </div>
                <div className="relative w-[50vw] bg-black">
                    <Image
                        alt="New Password Image"
                        src={img}
                        className="w-screen h-full"
                        fill
                    />
                </div>
                <div className="flex w-[50vw] justify-center items-center">
                    <CardWrapper
                        headerTitle="New Password"
                        headerLabel="Set a New Password"
                        backButtonLabel="Back to Login"
                        backButtonHref="/auth/login"
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            disabled={isPending}
                                                            {...field}
                                                            placeholder="Enter your new password"
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
                                {success && <FormSuccess message={success} />}
                                {error && <FormError message={error} />}
                                <Button className="w-full h-10 mt-5 bg-purple-700" disabled={isPending} type="submit">Reset Password</Button>
                            </form>
                        </Form>
                    </CardWrapper>
                </div>
            </div>
        </Suspense>
    );
};
