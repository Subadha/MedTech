"use client";
import { useState } from "react";
import { FaLinkedin, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from 'next/link';
import { motion } from "framer-motion";

// Import images
import img1 from "@/app/images/program-1.jpg";
import img2 from "@/app/images/program-2.jpg";
import img3 from "@/app/images/program-3.jpg";
import img4 from "@/app/images/program-4.jpeg";
import img5 from "@/app/images/program-5.jpg";

export default function Team() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const teamMembers = [
        {
            name: "Gurushankar",
            title: "Founder",
            image: img1,
            linkedinUrl: "https://www.linkedin.com/in/gurushankar-ajikumar-8073761a5/"
        },
        {
            name: "Veena C",
            title: "Consultant and Cofounder",
            image: img2,
            linkedinUrl: "https://www.linkedin.com/in/veena-c-1986aa22b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        },
        {
            name: "Renu John",
            title: "Mentor: Professor & Head CfHE, IITH",
            image: img3,
            linkedinUrl: "https://www.linkedin.com/in/renu-john-ab20a29/"
        },
        {
            name: "Sushmee Badhulika",
            title: "Scientific advisor: Professor IITH",
            image: img4,
            linkedinUrl: "https://www.linkedin.com/in/sushmee-badhulika-48422433/"
        },
        {
            name: "Neeko Inees Chiriyankandath",
            title: "Scientific Advisor: Consultant Gynaecologist",
            image: img5,
            linkedinUrl: "https://www.linkedin.com/in/dr-neeko-inees-chiriyankdath-2b79a0196/"
        },
    ];
    const visibleItems = 3;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < teamMembers.length - visibleItems ? prevIndex + 1 : prevIndex
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
            viewport={{ once: true }}
        >
            <div id="team" className="sm:h-screen pb-[100px] sm:pb-10 flex flex-col justify-center items-center text-center">
                <h1 className="sm:text-5xl text-4xl font-bold pb-[100px]">
                    Innovation at the heart of health: Meet our Visionary Team
                </h1>
                <div className="relative flex flex-col items-center w-full">
                    <div className="relative flex items-center w-full px-12">
                        <div className="flex overflow-hidden w-full">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100 / visibleItems}%)` }}
                            >
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="flex-none w-[330px] mx-2">
                                        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-2xl"
                                            />
                                            <Link href={member.linkedinUrl} passHref>
                                                <span  rel="noopener noreferrer" className="absolute top-0 right-0 p-3">
                                                    <FaLinkedin size={30} className="text-blue-600" />
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="w-full bg-white text-black justify-center items-center h-[70px] mt-2 rounded-md flex flex-col">
                                            <span className="font-bold text-xl">{member.name}</span>
                                            <span>{member.title}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="absolute flex justify-between gap-10 mt-[480px] max-w-3xl px-5">
                        <FaArrowLeft
                            className="cursor-pointer text-3xl"
                            onClick={prevSlide}
                        />
                        <FaArrowRight
                            className="cursor-pointer text-3xl"
                            onClick={nextSlide}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
