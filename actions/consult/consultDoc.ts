"use server";

import { getDoctors } from "@/data/user";

export const consultDoc = async ()=>{
    const doctors = await getDoctors();
    return doctors
}