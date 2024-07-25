import Image from "next/image";
import {Button} from "@/components/ui/button"
import { Poppins } from "next/font/google";
import LoginButton from "../components/auth/login-button"
import NavBar from "../components/home/Navbar"
import Hero from "../components/home/Hero"
import { Services } from "@/components/home/Services";
import { TextCard } from "@/components/home/TextCard";
import { Footer } from "@/components/home/Footer";
const font = Poppins({
  subsets:["latin"],
  weight:["600"]
})

export default function Home() {
  return (
    <>
    <NavBar/>
    <Hero/>
    <TextCard/>
    <Services/>
    <Footer/>
    <LoginButton>
        <Button>Sign in</Button>
    </LoginButton>
    </>
  );
}
