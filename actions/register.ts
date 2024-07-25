"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import {getVerificationToken} from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail";
export const  register = async (values:z.infer<typeof RegisterSchema>)=>{
    // console.log(values)
    const validate = RegisterSchema.safeParse(values);
    if(!validate.success){
        return{error : "Invalid Error"}
    }   

    const {email,password,name} = validate.data

    const hashedPassword = await bcrypt.hash(password,10);//10 is salt

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error : "Email already Existed"}
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })

    const verificationToken = await getVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
    )

    return {sucess :"Conformation Email Send"}
}