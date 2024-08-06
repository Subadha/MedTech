import { z } from "zod";

export const UpdateProfileSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    role: z.enum(["USER", "ADMIN"]),
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    })
});