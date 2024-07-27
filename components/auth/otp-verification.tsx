"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "@/app/images/Login.jpg";
import googleimg from "@/app/images/google.png";
import fbimg from "@/app/images/fb.png";

export const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (
    element: EventTarget & HTMLInputElement,
    index: number
  ) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-2xl mt-2 px-14 py-12">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full rounded-md object-cover object-top"
              src={loginBg}
              alt="login"
            />
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className=" px-12 py-8 shadow-sm rounded-md">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
              <h2 className="text-base font-bold leading-tight text-black sm:text-xl">
                OTP Verification
              </h2>
              <p className="mt-2 text-xs text-gray-500">
                Enter your OTP sent to your registered email
              </p>

              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5 ">
                  <div className="flex justify-center mt-8">
                    {otp.map((data, index) => {
                      return (
                        <input
                          className="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          name="otp"
                          maxLength="1"
                          key={index}
                          value={data}
                          onChange={(e) => handleChange(e.target, index)}
                          onFocus={(e) => e.target.select()}
                        />
                      );
                    })}
                  </div>
                  <div className="text-right">
                  <a
                      href="#"
                      className="text-xs text-blue-400 hover:underline text-right"
                    >
                      2:00 minutes
                    </a>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-800"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
