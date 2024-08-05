import * as z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{10,}$/;

export const validateEmailOrPhone = (value: string): "email" | "phone" | false => {
    if (emailRegex.test(value)) {
        return "email";
    }
    if (phoneRegex.test(value)) {
        return "phone";
    }
    return false;
};

export const LoginSchema = z.object({
    identifier: z.string().min(1, {
        message: "Identifier is required",
    }).refine(value => validateEmailOrPhone(value) !== false, {
        message: "Invalid email or phone number",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
}).transform(data => {
    const fieldType = validateEmailOrPhone(data.identifier);
    if (fieldType === "email") {
        return { ...data, email: data.identifier };
    } else if (fieldType === "phone") {
        return { ...data, phone: data.identifier };
    }
    return data;
});

export const LoginUsingOtpSchema = z.object({
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    }),
    otp: z.string().min(6, {
        message: "OTP is required"
    })
});

export const RegisterwithPhoneSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    role: z.enum(["USER", "ADMIN"]),
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    }),
    otp: z.string().min(6, {
        message: "OTP is required"
    })
});

export const RegisterSchema = z.object({
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

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});

export const ResetUsingNumber = z.object({
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    })
});

export const Appointment = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+\d{10,}$/, {
        message: "Phone number must start with a + and be at least 10 digits long."
    }),
    date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: "Invalid date format. Expected format: YYYY-MM-DD"
    })
});

export const otpVerify = z.object({
    otp: z.string()
});
