"use server"
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { UpdateProfileSchema } from "@/schema/dashboard/profile";
import { getVerificationToken } from "@/lib/tokens";

export const updateProfile = async (values: z.infer<typeof UpdateProfileSchema>, userId: string) => {
  const validate = UpdateProfileSchema.safeParse(values);
  if (!validate.success) {
    return { error: "Invalid data" };
  }
  console.log("",validate.data);
  
  
  const { email, name, phone,about } = validate.data;
  
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      name,
      email: email ? email.toLowerCase() : undefined,
      phone,
      about
    },
  });

//   if (email) {
//     const verificationToken = await getVerificationToken(email);
//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token
//     );
//   }

  return { success: "Profile updated successfully" };
};
