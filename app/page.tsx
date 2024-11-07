"use client"
import NavBar from "../components/home/Navbar"
import Hero from "../components/home/Hero"
import { Services } from "@/components/home/Services";
import { Footer } from "@/components/home/Footer";
import Team from "@/components/home/Team";
import Narrative from "@/components/home/Narrative";
import News from "@/components/home/News";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";


  
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
    <NavBar/>
    <Hero/>
    {/* <TextCard/> */}
    <Services/>
    <Team/>
    <Narrative/>
    <News/>
    {/* <Photo/> */}
    <Footer/>
    {isVisible && (<div className="fixed bottom-8 right-6 duration-150 border-primary border bg-white hover:text-white hover:bg-primary p-4 rounded-full" onClick={scrollToTop}><ArrowUp/></div>)}
    </>
  );
}
