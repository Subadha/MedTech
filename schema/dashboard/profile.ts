import { z } from "zod";

export const UpdateProfileSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    about: z.string().min(1, {
        message: "Name is required"
    }),
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    })
});