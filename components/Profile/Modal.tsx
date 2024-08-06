"use client";

import { Dialog, DialogOverlay, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import FormSucess from "../auth/form-sucess";
import FormError from "../auth/form-error";
import { PhoneInput } from "react-international-phone";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema } from "@/schema/dashboard/profile";
import { z } from "zod";

export function Modal({details}: any) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [sucess, setSucess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: details.email,
      name: details.userName,
      phone: details.phone,
    },
  });

  const handleOpenChange = () => {
    const isUserFormModified = localStorage.getItem("userFormModified");
    if (isUserFormModified && JSON.parse(isUserFormModified)) {
      setShowExitConfirmation(true);
    } else {
      router.back();
    }
  };

  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    startTransition(() => {
      //   updateProfile({ ...values}).then((data) => {
      //     setError(data?.error);
      //     setSucess(data?.success);
      //   });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">
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
                          placeholder="Enter your name"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="in"
                          className="rounded-md border bg-transparent  text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
                          placeholder="Telephone"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormSucess message={sucess} />
              <FormError message={error} />
              <Button
                className="w-full h-10 mt-5 bg-purple-700 hover:bg-purple-500"
                disabled={isPending}
                type="submit"
              >
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
