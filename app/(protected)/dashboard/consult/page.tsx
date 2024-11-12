"use client";
import { getAllDoctorsWithDetails } from "@/actions/consult/consultDoc";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Country, State, City } from "country-state-city";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";

const Page = () => {
  const [doctors, setDoctors] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  useEffect(() => {
    (async () => {
      const doc = await fetch("/api/v1/patients/doctor-list", {
        method: "POST",
        body: JSON.stringify({
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
        }),
      });
      const data = await doc.json();
      setDoctors(data);
    })();
  }, [selectedCountry, selectedState, selectedCity]);

  const Clear=()=>{
    setSelectedCountry('')
    setSelectedState('')
    setSelectedCity('')
  }

  return (
    <>
      <div className="p-4 flex flex-col lg:flex-row justify-between h-20 lg:items-center gap-4">
        <h2 className=" text-2xl font-medium">All Doctors</h2>
        <Popover>
          <PopoverTrigger>Filter</PopoverTrigger>
          <PopoverContent
            className="flex flex-col gap-2"
            sideOffset={10}
            side="bottom"
            align="end"
          >
            <div className="flex justify-between"><h2 className=" font-semibold">Filter</h2> <Button size='sm' onClick={Clear}><X/> Clear</Button></div>
            {/* Country Filter */}
            <Select
              value={selectedCountry}
              onValueChange={(value) => setSelectedCountry(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* State Filter */}
            <Select
              value={selectedState}
              onValueChange={(value) => setSelectedState(value)}
              disabled={!selectedCountry} // Disabled until a country is selected
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.length > 0 ? (
                  states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))
                ) : (
                  <p>No cities available</p>
                )}
              </SelectContent>
            </Select>

            {/* City Filter */}
            <Select
              value={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
              disabled={!selectedState} // Disabled until a state is selected
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))
                ) : (
                  <p>No cities available</p>
                )}
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>

      {/* Displaying the filtered doctors */}
      <div className="grid grid-cols-6 gap-3 p-4">
        {doctors?.map((data: any) => (
          <DoctorCard key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};

export default Page;

const DoctorCard = ({ data }: any) => {
  return (
    <div className=" col-span-6 md:col-span-3 lg:col-span-2">
      <Card className="p-2 relative">
        <CardContent className="rounded-x w-full gap-2 overflow-hidden p-2 flex items-center">
            <Avatar className=" aspect-square h-16 w-16">
              <AvatarImage
                src={data.image || "https://avatar.iran.liara.run/public"}
                alt="@shadcn"
                className=" object-cover"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className=" flex w-full flex-col items-start gap-1">
              <p className="text-base font-semibold">
                {data?.doctorProfile?.legalName}
              </p>
              <div className="text-[12px] w-[80%] h-5 flex text-gray-600">
                <div className="max-w-3/5 h-5 leading-tight overflow-hidden text-ellipsis whitespace-nowrap">{data?.doctorProfile?.specialization}</div>&nbsp;|&nbsp;
                <span className=" whitespace-nowrap">{data?.doctorProfile?.experienceYears} Years</span>
              </div>
              <Badge variant="secondary">
                {data?.doctorProfile?.subSpecialist}
              </Badge>
            </div>
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-2 w-full flex flex-col gap-2 ">
          <div className="flex py-2 w-full gap-3">
            <div className="flex gap-1 ">
              <IoMdTime />
              <div>
                <p className="text-md leading-none flex font-medium">
                  {data?.doctorAvailabilityDetails?.availableDays?.length
                    ? data.doctorAvailabilityDetails.availableDays.length <= 3
                      ? data.doctorAvailabilityDetails.availableDays.join(", ")
                      : `${data.doctorAvailabilityDetails.availableDays[0]} - ${
                          data.doctorAvailabilityDetails.availableDays[
                            data.doctorAvailabilityDetails.availableDays
                              .length - 1
                          ]
                        }`
                    : "No available days"}
                </p>
                <span className="text-[12px] text-gray-600">
                  {data?.doctorAvailabilityDetails?.availableTimeFrom} AM -{" "}
                  {
                    data?.doctorAvailabilityDetails?.availableTimeSlot[
                      data?.doctorAvailabilityDetails?.availableTimeSlot
                        ?.length - 1
                    ]
                  }
                </span>
              </div>
            </div>
            <div className="flex pl-2 gap-1 border-l">
              <GiTwoCoins />
              <div>
                <p className="text-md leading-none font-medium">
                  Rs.{data?.doctorProfile?.consultationFees}
                </p>
                <span className="text-[12px] text-gray-600">Starting</span>
              </div>
            </div>
          </div>
          <Link className="w-full" href={`consult/${data.id}`}>
            <Button className="w-full">Book an appointment</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
