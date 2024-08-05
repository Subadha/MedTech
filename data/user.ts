// data/user.ts
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (user && user.password !== null) {
      return { ...user, password: user.password! } as User;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
};

export const getUserByNumber = async (phone: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { phone },
    });
    if (user && user.password !== null) {
      return { ...user, password: user.password! } as User;
    }
    if(user){
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user by phone number:', error);
    return null;
  }
};

export const getUserByNumber2 = async (phone: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { phone },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by phone number:', error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        emailVerified: true,
        numberVerified: true, // Include numberVerified
        password: true, // Include password
        image: true, // Include image
      },
    });
    return user ?? null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};


export const getUserOtp = async (otp: string) => {
  try {
    const user = await db.otp.findFirst({
      where: { otp },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by OTP:', error);
    return null;
  }
};

export const getOtp = async (otp: string) => {
  try {
    const user = await db.otp.findFirst({
      where: { otp },
    });
    console.log(user);
    return user?.otp;
  } catch (error) {
    console.error("Error fetching user by OTP:", error);
    return null;
  }
};

export type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  numberVerified: Boolean;
  password: string | null;
  role: "USER" | "ADMIN";
  image: string | null;
  phone: string | null;
};
