"use client"
import { SignOut } from "@/actions/auth/signout";
import { useRouter } from "next/navigation";

export default function Signout(){
const router = useRouter()
    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await SignOut(); // Sign out the user
        router.push('/auth/login')

    };

    return(
        <div className="flex justify-center ">
            <div className="rounded-3xl flex justify-center text-center items-center w-[90vw] lg:w-[60vw] h-[70vh] bg-gradient-to-t from-purple-500">
                <div className="flex flex-col justify-center  items-center">
                    <h1 className="font-bold text-lg lg:text-3xl">You are attempting to Logout kaustubha</h1>
                    <span className="mt-10 lg:text-lg">Are you sure ?</span>
                    <button onClick={handleLogout} className="mt-10 bg-purple-600 flex gap-2 py-2 px-3 justify-center items-center text-center rounded hover:bg-primary text-white">Logout</button>
                </div>
            </div>      
        </div>
    )
}