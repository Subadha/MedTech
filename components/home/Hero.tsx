import { FaEnvelope, FaPhone, FaCalendarAlt, FaTelegram } from "react-icons/fa";
import Image from "next/image";
import img2 from "../../app/images/doc3.png";

export default function Hero() {
  return (
    <div className="relative w-full h-screen bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <div className="mt-2 px-4 flex max-w-max items-center space-x-2 rounded-md bg-white p-1 border-2">
            <p className="text-sm font-medium text-blue-500">
              👋 Hey! We are Pregnant
            </p>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Innovation in <br /> every pulse
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Sharing the future of health with breakthrough innovations that promote physical, mental, and spiritual wellness.
          </p>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <Image
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
            src={img2}
            alt="Health innovation image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <form
        action=""
        className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 mt-8 flex items-start space-x-2 bg-white p-4 shadow-md rounded-md"
      >
        <div className="flex flex-col">
          <label htmlFor="email1" className="flex items-center space-x-1">
            <FaEnvelope className="text-blue-600" />
            <span className="text-sm text-gray-600">Email Address</span>
          </label>
          <input
            className="mt-1 flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
            type="email"
            placeholder="Your email"
            id="email1"
            aria-label="Enter your email address"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="flex items-center space-x-1">
            <FaPhone className="text-blue-600" />
            <span className="text-sm text-gray-600">Phone Number</span>
          </label>
          <input
            className="mt-1 flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
            type="tel"
            placeholder="Telephone"
            id="phone"
            aria-label="Enter your phone number"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="flex items-center space-x-1">
            <FaCalendarAlt className="text-blue-600" />
            <span className="text-sm text-gray-600">Date</span>
          </label>
          <input
            className="mt-1 flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1"
            type="text"
            placeholder="Date"
            id="date"
            aria-label="Enter the date"
          />
        </div>

        <div className="flex flex-col justify-end">
          <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 py-1 mt-4 rounded-md">
            <button
              type="submit"
              className="px-2 rounded-sm inline-flex items-center space-x-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              aria-label="Book now"
            >
              <FaTelegram className="text-white" />
              Book Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
