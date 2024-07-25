import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import {UserRole} from "@prisma/client"
 
declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER"
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }
}

export const {
    handlers:{GET,POST},
    auth,
    signIn,//this can be used only in server actions or server component
    signOut,
} = NextAuth({
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data :{emailVerified:new Date()}
      })
    }
  },
    callbacks:{

      async signIn({user,account}){
        if(account?.provider!=="credentials") return true;

        const existingUser = await getUserById(user.id);

        //prevnet sign in without email verification
        if(!existingUser?.emailVerified) return false;
        return true
      },

        async session({token,session}){ //The session will be displayed on the screen and it doesnt contain id so we take sub as id from token adn add it to the session
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            console.log(token);
            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }
            return session;
        },

        async jwt({token}){
            //console.log(token);
            if(!token.sub){
                return token;
            }
            const existingUser = await getUserById(token.sub);

            if(!existingUser){
                return token;
            }
            token.role = existingUser.role; //we are adding new filed role to token
            //and if add in token it can be seen in the session 
            //And if can see in the session then we check where the loggin user is User or Admin
            return token;//always return the token
        }
    },
    adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig
})