"use client"
import { CardWrapper } from "./card-warpper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from "zod";
import { RegisterSchema } from "@/schema"
import { Button } from "../ui/button"
import {register} from "@/actions/register"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Image from "next/image"
import img from "@/app/images/img1.jpg"

export const RegisterForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: ({
            email: "",
            password: "",
            name: ""
        })
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSucess(data.sucess)
                })
        })
    }

    return (
        <div className="flex">
            <div className="w-1/2">
                <Image alt="image" src={img} height={600} />
            </div>
            <div className="w-1/2 flex justify-start items-center">
            <CardWrapper
                headerTitle="Register"
                headerLabel="Create an Account"
                backButtonLabel="Already have an Account ?"
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
                                                placeholder="Subadha"
                                                type="name"
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
                                                placeholder="joh@gmail.com"
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
                                            <Input
                                                disabled={isPending}
                                                {...field}
                                                placeholder="********"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSucess message={sucess} />
                        <FormError message={error} />
                        <Button className="mt-6 w-full" disabled={isPending} type="submit">Create an Account</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
        </div>
    )
}