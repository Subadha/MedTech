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
import { LoginSchema } from "@/schema"
import { Button } from "../ui/button"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import FormSucess from "./form-sucess"
import FormError from "./form-error"
import Link from "next/link"
import Image from "next/image"
import img from "@/app/images/img1.jpg"


export const LoginForm = () => {

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [sucess, setSucess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: ({
            email: "",
            password: ""
        })
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

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                <Image alt="image" src={img} height={600} />
            </div>
            <div className="w-1/2 flex justify-start items-center">
                <CardWrapper
                    headerTitle="Login"
                    headerLabel="Welcome Back"
                    backButtonLabel="Dont have an Account"
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
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Input
                                                        disabled={isPending}
                                                        {...field}
                                                        placeholder="********"
                                                        type={showPassword ? "text" : "password"}
                                                    />
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="link"
                                                        onClick={togglePasswordVisibility}
                                                        style={{ marginLeft: '8px' }}
                                                    >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <Button size="sm" variant="link" asChild className="px-0 font-normal">
                                                <Link href="/auth/reset">Forgot Password?</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormSucess message={sucess} />
                            <FormError message={error} />
                            <Button className="w-full" disabled={isPending} type="submit">Login</Button>
                        </form>
                    </Form>
                </CardWrapper>
            </div>
        </div>
    )
}