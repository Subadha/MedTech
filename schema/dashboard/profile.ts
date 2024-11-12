import { z } from "zod";

export const UpdateProfileSchema = z.object({
    email: z.string().email({
      message: "Email is required"
    }).optional(),
    name: z.string().min(1, {
      message: "Name is required"
    }).optional(),
    about: z.string().min(1, {
      message: "About is required"
    }).optional(),
    city: z.string().min(1, {
      message: "City is required"
    }).optional(),
    age: z.string().min(1, {
      message: "Age is required"
    }).optional(),
    gender: z.string().min(1, {
      message: "Gender is required"
    }).optional(),
    state: z.string().min(1, {
      message: "State is required"
    }).optional(),
    country: z.string().min(1, {
      message: "Country is required"
    }).optional(),
    phone: z.string().regex(/^\+\d{10,}$/, {
      message: "Phone number must start with a + and be at least 10 digits long."
    }).optional(),
    password: z.string().min(0, {
      message: "Password is required",
    }).optional(),
  }).partial();
  

export const VerifyNumber = z.object({
  phone: z.string().regex(/^\+\d{10,}$/, {
    message: "Phone number must start with a + and be at least 10 digits long.",
  }),
  otp: z.string().min(6, {
    message: "OTP is required",
  }),
});