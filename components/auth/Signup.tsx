"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import loginBg from "@/app/images/Login.jpg";
import googleimg from "@/app/images/google.png";
import fbimg from "@/app/images/fb.png";

export const SignupOne = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-50 rounded-2xl mt-2">
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
        <div className=" px-8 py-8 shadow-sm rounded-md">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <div className="text-center">
              <h2 className="text-lg font-bold leading-tight text-black sm:text-3xl">
                Sign up
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter details to create your account
              </p>
            </div>

            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-900"
                  >
                    {" "}
                    Your Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter Name"
                      id="name"
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900"
                  >
                    {" "}
                    E-mail or phone number
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Enter you email or phone no"
                      id="email"
                    ></input>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="mr-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Password{" "}
                      </label>
                    </div>
                    <div className="mt-2 relative">
                      <input
                         className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ener your Password"
                        id="password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Confirm Password{" "}
                      </label>
                    </div>
                    <div className="mt-2 relative">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter your Password"
                        id="confirmPassword"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-purple-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-purple-800"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
            <div className="flex mt-5">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-white py-3 border mx-2 text-black hover:bg-gray-100 focus:outline-none text-xs sm:text-xs"
              >
                <Image className="h-4 w-4 mr-2" src={googleimg} alt="google" />
                Sign up with Google
              </button>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md bg-white py-3  border mx-2 text-black hover:bg-gray-100  focus:outline-none text-xs sm:text-xs"
              >
                <Image className="h-4 w-4 mr-2" src={fbimg} alt="fb" />
                Sign up with Facebook
              </button>
            </div>
          </div>
        </div>
        </div>

      </div>
    </section>
  );
};
