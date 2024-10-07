"use server";
import { getUserOtp } from "@/data/user";
import { getUserByNumber } from "@/data/user";
import { generatePasswordResetToken, getVerificationToken } from "@/lib/tokens";
import { onlyOtpVerify, otpVerify } from "@/schema";
import { z } from "zod";

export const verifyOtp3 = async (values: z.infer<typeof onlyOtpVerify>) => {
  const otp1 = onlyOtpVerify.safeParse(values);
  if (!otp1.success) {
    return { error: "Error Occurred", success: null, token: null };
  }

  const { otp } = otp1.data;
  const isValidOtp = await getUserOtp(otp.toString());

  if (isValidOtp) {
    // Assuming getUserOtp can return a token or you can modify it to do so
    const number = isValidOtp.phone; // Extract token if available
    const user = await getUserByNumber(number);
    if (user && user.email) {
      const x = await generatePasswordResetToken(user.email);
      const token = x?.token;
      return {
        success: "OTP verified successfully",
        error: null,
        token: token,
      };
    } else {
      return {
        success: null,
        error: "User not found or email is missing.",
        token: null,
      };
    }
  } else {
    return {
      success: null,
      error: "Invalid OTP. Please try again.",
      token: null,
    };
  }
};
