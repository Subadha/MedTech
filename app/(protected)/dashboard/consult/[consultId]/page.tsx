import Image from "next/image";
import img from "@/app/images/doc1.png"
import { dummyData } from "@/dummydata";
import { FaUserDoctor } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import Appoint0 from "@/components/AppointmentModal/Appoint0";

interface ConsultDoctorProps {
    params: {
        consultId: string;
    };
}

export default function ConsultDoctor({ params }: ConsultDoctorProps) {

    const data = dummyData.find(doctor => doctor.id === parseInt(params.consultId));

    return (
        <div className="p-4 sm:p-8 w-full">
            <div className="flex flex-col text-center sm:text-left md:flex-row rounded-xl border-gray-400 border-2 p-5">
                <div className="w-full md:w-1/4 text-center sm:text-left flex flex-col items-center">
                    <Image src={img} alt="Doctor" className="object-contain w-full h-auto" />
                    <p className="mt-4 sm:mt-3 md:mt-2 text-xs sm:text-sm md:text-base lg:text-sm text-center bg-green-500 p-1">
                        Available Today
                    </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-5 w-full md:w-3/4">
                    <h1 className="text-purple-600 font-bold text-xl md:text-2xl lg:text-xl">{data?.name}</h1>
                    <div className="flex flex-wrap text-sm md:text-base">
                        <h1>{data?.specialization}</h1>
                        <h1 className="ml-4">{data?.experience}</h1>
                    </div>
                    <div className="flex items-center mt-2 text-sm md:text-base">
                        <FaUserDoctor />
                        <h1 className="font-bold pl-2">{data?.specialization}</h1>
                    </div>
                    <div className="flex items-center mt-2 text-sm md:text-base">
                        <IoStarSharp />
                    </div>
                    <div className="flex items-center mt-2 text-sm md:text-base">
                        <LiaLanguageSolid />
                        <p className="pl-2">English</p>
                        <p className="pl-2">Hindi</p>
                        <p className="pl-2">Tamil</p>
                    </div>
                    <div className="flex items-center mt-2 text-sm md:text-base">
                        <MdOutlineAddHomeWork />
                    </div>
                </div>
                <div className="w-full md:w-[20vw] mt-4 md:mt-0 flex flex-col md:ml-auto text-right">
                    <div className="flex items-center justify-end">
                        <FaRegMoneyBillAlt className="mr-2 text-base md:text-lg" />
                        <span className="text-sm md:text-base">INR {data?.fee}</span>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <MdAccessTime className="mr-2 text-base md:text-lg" />
                        <span className="text-sm md:text-base">10 - 30 min Consultation</span>
                    </div>
                    <div className="w-full">
                        <span className="mt-6 md:mt-10 w-full bg-purple-600 flex gap-2 py-2 px-3 justify-center items-center text-center rounded hover:bg-primary hover:text-white">
                            <Appoint0 details={data}/>
                        </span>
                    </div>
                </div>

            </div>
            <div className="mt-8 flex flex-col rounded-xl border-gray-400 border-2 p-5 mb-10">
                <div className="mt-[2vw] flex w-full justify-center items-center text-center">
                    <span className="flex justify-center items-center font-bold text-center text-xl md:text-2xl">Overview</span>
                </div>
                <hr/>
                <div className="flex flex-col mt-5">
                    <p className="text-purple-500 text-lg md:text-xl font-bold">Personal Statement</p>
                    <div className="rounded-md border-gray-400 border-2 p-5 bg-gray-100 w-full md:w-3/4">
                        <p>I am one of the highly qualified and an expert Family Medical Techniques with an invaluable experience of over 11 years. My residence is in Bareilly, Uttar Pradesh, India. I can fluently communicate with you in English, Hindi, Urdu, Russian, Punjabi. I will be happy to assist you via video and audio online medical consultation.</p>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-purple-500 text-lg md:text-xl font-bold">Doctor Information</p>
                    <div className="rounded-md border-gray-400 border-2 p-5 bg-gray-100 w-full md:w-3/4">
                        <div className="flex">
                            <FaUserDoctor size={32} />
                            <div className="flex flex-col pl-5">
                                <div>
                                    <h1 className="text-base md:text-lg font-bold">Speciality</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-base md:text-lg font-bold">Other Treatment Area</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-base md:text-lg font-bold">Education</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-base md:text-lg font-bold">Past Experience</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-purple-500 text-lg md:text-xl font-bold">Available Timings</p>
                    <div className="flex flex-col p-5 justify-center items-center">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <div key={day} className="flex justify-between items-center gap-4 w-full md:w-3/4">
                                <p className="text-base md:text-lg font-semibold">{day}</p>
                                <p className="text-base md:text-lg">09:00am To 09:00pm</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-purple-500 text-lg md:text-xl font-bold">Patient Reviews</p>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center p-5">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                                <Image src={img} alt="reviews" className="object-cover" />
                            </div>
                            <div className="pl-5">
                                <h1 className="font-bold text-lg">Jenifer Lopez</h1>
                                <p>Nov 2023</p>
                                <p>Dr. Deep Sorthiya is very kind and gives me detailed explanations</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
