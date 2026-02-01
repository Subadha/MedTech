"use server";
import crypto from "crypto";
import * as z from "zod";
import { ResetUsingNumber } from "@/schema";
import { getOtpData, getUserByNumber, getUserOtp } from "@/data/user";
import { db } from "@/lib/db";
import axios from "axios";

export const registerOtp = async (phone:string) => {



  const otpData = await getOtpData(phone);

  const existingUser = await getUserByNumber(phone);

  if (existingUser?.numberVerified) {
    return { error: "Number Already Exists" };
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    if (otpData == null) {
      await db.otp.create({
        data: {
          phone,
          otp: otp,
          expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires after 10 minutes
        },
      });
    } else {
      await db.otp.update({
        where: { phone: phone },
        data: {
          phone,
          otp: otp,
          expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires after 10 minutes
        },
      });
    }
    const sendOTP = async () => {
      const url = 'https://www.fast2sms.com/dev/bulkV2';
      const route = 'otp';
      const data = {
        variables_values: otp,
        route: route,
        numbers: phone.slice(-10),
      };
    
      try {
        const response = await axios.post(url, null, {
          headers: {
            authorization: process.env.F2S_API_KEY,
          },
          params: data,
        });
    
        console.log('Response:', response.data);
      } catch (error:any) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
    sendOTP()

    return { success: "OTP sent!"};
  } catch (err) {
    console.log(err);
    return { error: "Could not send OTP" };
  }
};
