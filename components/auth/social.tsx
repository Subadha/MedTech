"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';


export const Social = () => {

    interface ButtonWithIconProps {
        label: string;
        Icon: IconType;
        onClick: () => void;
    }

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }

    const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ label, Icon, onClick }) => (
        <div className="flex items-center cursor-pointer" onClick={onClick}>
            <Icon className="w-5 h-5 mr-2" />
            <button className="text-base bg-transparent border-none">{label}</button>
        </div>
    );
    return (
        <div className="flex gap-4">
            <ButtonWithIcon
                label="Google"
                Icon={FaGoogle}
                onClick={() => onClick("google")}
            />
            <ButtonWithIcon
                label="GitHub"
                Icon={FaGithub}
                onClick={() => onClick("github")}
            />
        </div>
    )
}

