"use server"
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { UpdateProfileSchema } from "@/schema/dashboard/profile";
import { getVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserById } from "@/data/user";

export const updateProfile = async (values: z.infer<typeof UpdateProfileSchema>, userId: string) => {
  try {
    const validate = UpdateProfileSchema.safeParse(values);
    if (!validate.success) {
      return { error: "Invalid data" };
    }  
    
    const { email, name, password, phone, about } = validate.data;
    let hashedPassword = undefined;
  
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
  
    const user = await getUserById(userId);
  
    const updateData: any = {
      name,
      about,
      password: hashedPassword || user?.password,
    };
  
    if (email && email.toLowerCase() !== user?.email) {
      updateData.email = email.toLowerCase();
      const verificationToken = await getVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
    }
  
    if (phone && phone.length >= 10 && phone !== user?.phone) {
      const phoneExists = await db.user.findUnique({
        where: { phone },
        select: { id: true },
      });
      if (phoneExists) {
        return { error: "Phone number is already in use" };
      }
      updateData.phone = phone;
    }
    
    updateData.numberVerified = false;
  
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
    });

    const newData = await db.user.delete({
      where: { id: userId },
    });

    const newData1 = await db.user.create({
      data:updatedUser
    })
  
    return { success: "Profile updated successfully" };
  
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the profile" };
  }
};
