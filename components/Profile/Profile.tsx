"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import img from "@/app/images/p1.png";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";

interface ProfileProps {
  email: string;
  phone: string;
  image: string | StaticImageData;
  userName: string;
}

export default function Profile({
  userName,
  email,
  image,
  phone,
}: ProfileProps) {
  const router = useRouter();

  return (
    <>
      <div className="p-10 h-[80vh]">
        <div className="w-full h-[20vh] bg-purple-700 rounded-lg">
          <h1 className="text-white p-5">My Profile</h1>
        </div>
        <div className="sm:flex">
          <div className="bg-white shadow-xl box-border rounded-lg sm:w-[30vw] sm:mx-[100px] sm:h-[100vh] -mt-[50px] mb-[100px] sm:mb-0 pb-10 sm:pb-0">
            <div className="flex justify-between px-20 py-4">
              <div className="w-20 h-20 rounded-full overflow-hidden relative">
                <Image
                  src={image}
                  alt="No Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex justify-center items-center">
                <button>Upload Image</button>
              </div>
              <Modal details={{ userName, email, image, phone }} />
            </div>
            <div className="rounded-lg sm:mx-[30px] mx-[20px] sm:text-[1vw] text-[3vw] shadow-lg box-border pb-4 border-2 border-gray-300">
              <div className="flex flex-col mx-[20px] pt-2">
                <p>Your Name</p>
                <div className="flex justify-between pt-2">
                  <p className="">{userName}</p>
                </div>
              </div>
              <div className="flex flex-col mx-[20px] pt-2">
                <p>Email</p>
                <div className="flex justify-between pt-2">
                  <p className="">{email}</p>
                </div>
              </div>
              <div className="flex flex-col mx-[20px] pt-2">
                <p>Phone Number</p>
                <div className="flex justify-between pt-2">
                  <p className="">{phone}</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg sm:mx-[30px] mx-[20px] mt-4 sm:text-[1vw] text-[3vw] shadow-xl box-border pb-4 border-2 border-gray-300">
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About Sid</p>
              </div>
              <div className="mx-[20px] pt-2 ">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione consectetur dicta soluta amet suscipit ea, harum
                  distinctio tempora, perspiciatis consequuntur ipsa magnam hic
                  necessitatibus culpa non nobis quis veniam sed.
                </p>
              </div>
            </div>
            <div className="rounded-lg border-2 border-gray-300 sm:mx-[30px] mx-[20px] mt-4 sm:text-[1vw] text-[3vw] shadow-xl box-border pb-4">
              <div className="mx-[30px] pt-5 sm:text-[1.4vw]">
                <h1>Legal</h1>
              </div>
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About Sid</p>
              </div>
              <div className="flex justify-between mx-[20px] pt-2">
                <p>About Sid</p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-xl box-border sm:w-[30vw] sm:text-[1vw] text-[3vw] h-[100vh] -mt-[50px] rounded-lg">
            <div className="mx-[20px] p-[20px] shadow-xl box-border rounded-lg border-2 border-gray-300 mt-5">
              <h1>Professional Details</h1>
              <p>This are the professional details shown to users in the app</p>
            </div>
            <div className="mx-[20px] p-[20px] shadow-xl box-border rounded-lg border-2 border-gray-300 mt-5">
              <h1>Appointments</h1>
              <div className="w-[20vw] ">
                <p className="py-2">15 Appointments</p>
                <p>Of total Appointments</p>
              </div>
            </div>
            <div className="mx-[20px] mt-5 p-[20px] shadow-xl box-border border-2 border-gray-300 rounded-lg">
              <h1>Ratings</h1>
              <p>4 stars</p>
            </div>
            <div className="mx-[20px] pt-5">
              <h1>Doctors Review</h1>
              <div className="border-2 border-gray-300 rounded-lg shadow-md p-3">
                <h1>Ankit Srinvas</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nostrum veniam dolore sed incidunt iusto obcaecati quis fuga
                  cupiditate laboriosam ea, dolorem deleni
                </p>
              </div>
            </div>
            <div className="text-red-700 mx-[20px] pt-3">
              <Link href="/">See all Reviews</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
