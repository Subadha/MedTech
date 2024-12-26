"use client";

import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { updateProfile } from "@/actions/profile/updateProfile";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { City, Country, State } from "country-state-city";

export function Modal({ details, refresh }: any) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const form:any = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      email: details?.email,
      name: details?.name,
      about: details?.about,
      age: details?.age,
      phone: details?.phone,
      gender: details?.gender,
      state: details?.state,
      city: details?.city,
      country: details?.country,
      password: "",
    },
  });

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = event.target.value;
    form.setValue("country", selectedCountry);
    form.setValue("state", "");
    form.setValue("city", "");
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    form.setValue("state", selectedState);
    form.setValue("city", "");
  };

  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    
    startTransition(async() => {
      const update = await fetch("/api/v1/profile/update",{
        method: "POST",
        body:JSON.stringify({...values,userId:details.id})
      })
      const data = await update.json()
        if (data.success) {
          toast({
            variant: "primary",
            title: "Profile updated successfully",
          });
          setSuccess(data.success);
          refresh();
          setDialogOpen(false);
        } else if (data.error) {
          toast({
            variant: "destructive",
            title: "Try again",
          });
          setError(data.error);
        }
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Edit<span className="md:block hidden">&nbsp;Profile</span>
        </Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent className="overflow-y-scroll py-6 h-screen">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={details?.name}
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={details?.email}
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={details?.phone}
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your phone"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New password"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* About Field */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          defaultValue={details?.about}
                          disabled={isPending}
                          {...field}
                          placeholder="About you"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Age Field */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={details?.age}
                          disabled={isPending}
                          {...field}
                          placeholder="Enter your age"
                          type="number"
                          onInput={(e:any) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                        min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender Field */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <select
                          defaultValue={details?.gender || ""}
                          disabled={isPending}
                          {...field}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* State Field */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => {
                    const countries = Country.getAllCountries();
                    return (
                      <FormItem>
                        <div className="flex flex-col">
                          <FormLabel className="px-2 py-1.5 text-sm font-semibold">
                            Select Country
                          </FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              onChange={(event) => {
                                handleCountryChange(event);
                                field.onChange(event);
                              }}
                              disabled={isPending}
                              className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                            >
                              <option value="">Select Country</option>
                              {countries.map((country) => (
                                <option
                                  key={country.isoCode}
                                  value={country.isoCode}
                                >
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => {
                    const states = State.getStatesOfCountry(
                      form.watch("country")
                    );
                    return (
                      <FormItem>
                        <FormLabel className="px-2 py-1.5 text-sm font-semibold">
                          Select State
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(event) => {
                              handleStateChange(event);
                              field.onChange(event);
                            }}
                            disabled={!form.watch("country") || isPending}
                            className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                          >
                            <option value="">Select State</option>
                            {states.map((state: any) => (
                              <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* City Field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => {
                    const cities = City.getCitiesOfState(
                      form.watch("country"),
                      form.watch("state")
                    );
                    return (
                      <FormItem>
                        <FormLabel className="px-2 py-1.5 w-full text-sm font-semibold">
                          Select City
                        </FormLabel>
                        <FormControl className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                          <select
                            {...field}
                            disabled={!form.watch("state") || isPending}
                            className="flex h-9 sm:w-[20vw] w-[50vw] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.name} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormSucess message={success} />
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
