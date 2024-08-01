import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema, validateEmailOrPhone } from "./schema";
import { getUserByEmail, getUserByNumber } from "./data/user";
import bcrypt from "bcryptjs";
import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials, request: Request){

        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { identifier, password } = validateFields.data;
          const identifierType = validateEmailOrPhone(identifier);
          let user;
          if (identifierType === "email") {
            user = await getUserByEmail(identifier);
          } else if (identifierType === "phone") {
            user = await getUserByNumber(identifier);
          }
          const passwordMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordMatch) return user;

          return null;
        }

        return null;
      },
    }),
  ],
} as NextAuthConfig;
