"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import img1 from "@/app/images/bg_3.jpg"
export const Footer = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
    <footer id="footer" className="w-full bg-purple-900 text-white">
      <div className="mx-auto flex flex-col px-4 py-8 md:flex-row md:space-x-8 max-w-6xl">
        {/* Section with Social Icons and Heading */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
        <Image src={img1} width={350} height={200} alt=""/>
          <h1 className="text-md max-w-sm text-center md:text-left mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit amet consectetur sit amet consectetur.
          </h1>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/company/kaustubha-medtech-private-limited" aria-label="LinkedIn">
              <FaLinkedin className='text-white text-xl' />
            </a>
            <a href="https://www.facebook.com/people/Kaustubha-Medtech/pfbid02riyqk8ErVMNeVKMZTdkPSLLtkHPpXX99mVnzMZbU9ak8MdZbv4acbvpdkQYSQnpBl/" aria-label="Facebook">
              <FaFacebook className='text-white text-xl' />
            </a>
            <a href="https://www.instagram.com/kaustubhamedtech/" aria-label="Instagram">
              <FaInstagram className='text-white text-xl' />
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2FKaustubhamedtec" aria-label="Twitter">
              <FaTwitter className='text-white text-xl' />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-0 lg:w-3/4">
          <div className="mb-8">
            <p className="text-lg font-semibold">Helpful Links</p>
            <hr className="my-4 border-t-2 border-blue-800 w-16" />
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
            </ul>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Support</p>
            <hr className="my-4 border-t-2 border-blue-800 w-16" />
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
            </ul>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold">Contact Us</p>
            <hr className="my-4 border-t-2 border-blue-800 w-16" />
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="https://www.google.com/maps/place/Technology+Innovation+Park+(TIP)/@17.588988,78.121867,13z/data=!4m6!3m5!1s0x3bcbf12e326be7e1:0x1b5bca249531e1a0!8m2!3d17.5889875!4d78.1218672!16s%2Fg%2F11t79vbbpt?hl=en&entry=tts&g_ep=EgoyMDI0MDcyMy4wKgBIAVAD" className="hover:underline">
                  C/O The Foundation for Center for Healthcare Entrepreneurship, Indian Institute of Technology, IIT Hyderabad Kandi, TG 502285
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <hr className="my-4 border-gray-600" />
      <div className="mx-auto max-w-6xl px-4 py-4 text-center">
        <p className="text-sm font-medium">Copyright © 2024. All rights reserved.</p>
      </div>
    </footer>
    </motion.div>
  );
};
