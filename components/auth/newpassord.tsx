"use client";
import { CardWrapper } from "./card-warpper";
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
import { NewPasswordSchema } from "@/schema";
import { useSearchParams } from "next/navigation";

const TokenFetcher = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    if (!token) {
        throw new Error("Token is missing");
    }

    return token;
};

export const NewPasswordForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>, token: string) => {
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.sucess);
                })
                .catch(() => {
                    setError("An unexpected error occurred.");
                });
        });
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CardWrapper
                headerTitle="New Password"
                headerLabel="Enter a New Password"
                backButtonLabel="Back to Login"
                backButtonHref="/auth/login"
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => {
                            const token = TokenFetcher();
                            onSubmit(values, token);
                        })}
                    >
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
                                            placeholder="*******"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {success && <FormSuccess message={success} />}
                        {error && <FormError message={error} />}
                        <Button disabled={isPending} type="submit">
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </Suspense>
    );
};
