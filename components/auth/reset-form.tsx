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
import { Button } from "../ui/button"
import { reset } from "@/actions/reset"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Link from "next/link"
import Image from "next/image"
import img from "@/app/images/doc1.png"
import logo from "@/app/images/logo.png"
import { ResetSchema } from "@/schema"

export const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSucess(data?.sucess)
                })
        })
    }

    return (
        <div className="flex justify-evenly h-[100vh]">
            <div className="absolute top-4 left-10 z-10 w-20 h-20">
                <Link href="/"><Image src={logo} alt="Logo" layout="fill" objectFit="contain" /></Link>
            </div>
            <div className="absolute top-10 right-10 z-10 text-gray-600">
                <span>Remembered your password? <Link href="/auth/login" className="text-purple-700 font-bold-700">Sign in</Link> </span>
            </div>
            <div className="relative w-[50vw] bg-black">
                <Image
                    alt="Reset Password Image"
                    src={img}
                    className="w-screen h-full"
                    fill
                />
            </div>
            <div className="flex w-[50vw] justify-center items-center">
                <CardWrapper
                    headerTitle="Reset Password"
                    headerLabel="Forgot Your Password?"
                    backButtonLabel="Back to Login"
                    backButtonHref="/auth/login"
                >
                    <Form {...form} >
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
                            <FormSucess message={sucess} />
                            <FormError message={error} />
                            <Button className="w-full h-10 mt-5 bg-purple-700" disabled={isPending} type="submit">Send reset email</Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    )
}
