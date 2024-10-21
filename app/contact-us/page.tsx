"use client";
import { Footer } from "@/components/home/Footer";
import NavBar from "@/components/home/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };

  return (
    <>
    <NavBar/>
    <div className="flex lg:flex-row flex-col justify-evenly items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" lg:w-2/5 ">
        <div className="flex gap-2 text-lg">
          <span className="flex items-center gap-1 font-bold text-primary">
            <MdEmail /> Email:
          </span>{" "}
          <h2>kaustubhamedtech@gmail.com</h2>
        </div>
        <div className="flex gap-2 text-lg">
          <span className="flex items-center gap-1  font-bold text-primary">
          <FaPhoneAlt />
          Phone number:
          </span>{" "}
          <h2>+91 9647102668 </h2>
        </div>
        <div className="flex items-start gap-2 text-lg">
          <span className="flex items-center gap-1  font-bold text-primary">
          <IoLocationSharp />
           Address:
          </span>{" "}
          <h4 className="flex-wrap">Foundation for CfHE, Indian Institute of Hyderabad, Kandi, , Medak,
          Sangareddy, TELANGANA, 502285</h4>
        </div>
      </div>
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </Label> */}
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            {/* <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label> */}
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            {/* <Label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </Label> */}
            <Input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            {/* <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </Label> */}
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="mt-1 block w-full"
              rows={4}
              required
            />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Page;
