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
import { LoginSchema, LoginUsingOtpSchema } from "@/schema";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import FormSucess from "./form-sucess";
import FormError from "./form-error";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "@/app/images/bg_2.jpg";
import logo from "@/app/images/logo.png";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { optlogin } from "@/actions/otp-login";

export const LoginUsingOtpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");

  // Use useSearchParams() directly
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider "
      : "";

  const form = useForm<z.infer<typeof LoginUsingOtpSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      otp: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginUsingOtpSchema>) => {

    startTransition(() => {
      optlogin(values).then((data) => {
        setError(data?.error);
        setSucess(data?.success);
      });
    });
  };

  return (
    <div className="flex justify-evenly h-[100vh]">
      <div className="absolute sm:top-4 sm:left-10 z-10 w-20 h-20">
        <Link href="/">
          <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
        </Link>
      </div>
      <div className="absolute sm:top-10 top-[100px] sm:right-10 z-20 text-gray-600">
        <span>
          Dont have an account?{" "}
          <Link href="/auth/register" className="text-purple-700 font-bold-700">
            Sign up
          </Link>{" "}
        </span>
      </div>
      <div className="sm:relative sm:visible invisible sm:w-[50vw] bg-black">
        <Image alt="Login Image" src={img} className="w-screen h-full" fill />
      </div>
      <div className="sm:flex sm:w-[50vw] sm:mt-0 mt-[140px] justify-center z-10 items-center">
        <CardWrapper
          headerTitle="Sign in"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone no.</FormLabel>
                      <FormControl>
                      <div className="flex w-full items-center gap-2">
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your phone"
                          type="text"
                        />
                         <Button>Send OTP</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Otp</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <InputOTP maxLength={6}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSucess message={sucess} />
              <FormError message={error || urlError} />
              <Button
                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                disabled={isPending}
                type="submit"
              >
                Login
              </Button>
              <Button
                size="sm"
                variant="link"
                asChild
                className="text-blue-500 px-0 font-normal flex justify-end"
              >
                <Link href="/auth/reset">Forgot Password?</Link>
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};
