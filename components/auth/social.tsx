"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
export const Social = () => {


    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    return (
        <div>
            <button onClick={() => onClick("google")}>Google</button>
            <button onClick={() => onClick("github")}>Github</button>
        </div>
    )
}