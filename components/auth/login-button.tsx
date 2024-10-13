"use client";
import { useRouter } from "next/navigation";

interface LoginButtonProps{
    children:React.ReactNode;
    mode?:"modal"|"redirect",
    asChild?:boolean
}

export default function LoginButton({children,mode="redirect",asChild}:LoginButtonProps){

    const router = useRouter();

    const onClick =()=>{
        router.push("comingsoon");
    }

    if(mode==="modal"){
        return(
            <span>Text</span>
        )
    }

    return(
        <span onClick={onClick}>{children}</span>
    )
}