"use client"
import { CardWrapper } from "../auth/card-warpper"
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
import { LoginSchema } from "@/schema"
import { Button } from "../ui/button"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Link from "next/link"
import Image from "next/image"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import img from "@/app/images/doc1.png"
import logo from "@/app/images/logo.png"

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
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
                <span>Don't have an account? <Link href="/auth/register" className="text-purple-700 font-bold-700">Sign up</Link> </span>
            </div>
            <div className="relative w-[50vw] bg-black">
                <Image
                    alt="Login Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="flex w-[50vw] justify-center items-center">
                <CardWrapper
                    headerTitle="Sign in"
                    headerLabel="Welcome Back"
                    backButtonLabel="Don't have an Account"
                    backButtonHref="/auth/register"
                    showSocial
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            </div>
                            <FormSucess message={sucess} />
                            <FormError message={error} />
                            <Button className="w-full h-10 mt-5 bg-purple-700" disabled={isPending} type="submit">Login</Button>
                            <Button size="sm" variant="link" asChild className="text-blue-500 px-0 font-normal flex justify-end">
                                <Link href="/auth/reset">Forgot Password?</Link>
                            </Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    )
}
