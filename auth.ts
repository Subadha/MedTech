import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserByEmail, getUserById } from "./data/user";
import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import authConfig from "./auth.config";

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    phone?:string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      phone?: string;
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {      
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {  
if (account?.provider === "google") {
  try {
    const existingUser = await getUserByEmail(typeof user.email); // Removed 'typeof' to correctly fetch the user.
    if (existingUser?.phone) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
}
      
      if (account?.provider === "credentials" || account?.provider === "otp") {
        if (typeof user.id !== "string") return false;
        const existingUser = await getUserById(user.id);
         
        if (account.provider === "otp" ) {
          return true;
        }
        if (!existingUser) return false;

        if (account.provider === "credentials" && !existingUser.emailVerified) {
          return false;
        }
      }
      
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.phone && session.user) {
         session.user.phone = token.phone ?? undefined; 
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }
      token.role = existingUser.role;
      token.phone = existingUser.phone ?? undefined; 
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
