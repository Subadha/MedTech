import Image from "next/image";
import img from "@/app/images/doc1.png"
import { dummyData } from "@/dummydata";
import { FaUserDoctor } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
interface ConsultDoctorProps {
    params: {
        consultId: string;
    };
}

{/* Hello {params.consultId} */ }

export default function ConsultDoctor({ params }: ConsultDoctorProps) {

    const data = dummyData.find(doctor => doctor.id === parseInt(params.consultId));

    return (
        <div className="w-[80vw] pl-[2vw] pt-[2vw] pb-[2vw]">
            <div className="flex rounded-xl border-gray-400 box-border border-2 p-5">
                <div className="w-[8vw]">
                    <Image src={img} alt="Doctor" objectFit="true" />
                    <p className="m-1 mt-[1vw] text-sm bg-green-500 p-1">Avaiable Today</p>
                </div>
                <div className="ml-[5vw]">
                    <div className="w-[13vw]">
                        <h1 className="text-purple-600 font-bold text-[1.42vw]">{data?.name}</h1>
                        <div className="flex justify-between">
                            <h1>{data?.specialization}</h1>
                            <h1>{data?.experience}</h1>
                        </div>
                    </div>
                    <div className="flex pt-[1vw]">
                        <FaUserDoctor /><h1 className="font-bold pl-[1vw]" >{data?.specialization}</h1>
                    </div>
                    <div className="flex pt-[0.8vw]">
                        <IoStarSharp />
                    </div>
                    <div className="flex pt-[0.8vw]">
                        <p className=""><LiaLanguageSolid /></p>
                        <p className="pl-[1vw]">English</p>
                        <p className="pl-[1vw]">Hindi</p>
                        <p className="pl-[1vw]">Tamil</p>
                    </div>
                    <div className="flex pt-[0.8vw]">
                        <MdOutlineAddHomeWork />
                        <p></p>
                    </div>
                </div>
                <div className="flex flex-col  ml-auto text-right">
                    <div className="flex">
                        <FaRegMoneyBillAlt className="mr-2" />
                        <span>INR {data?.fee}</span>
                    </div>
                    <div className="flex mt-[1vw]">
                        <MdAccessTime className="mr-2" />
                        <span>10 - 30 min Consultaion</span>
                    </div>
                    <div>
                        <button className="mt-10 w-[10vw] bg-purple-600 flex gap-2 py-2 px-3 justify-center items-center text-center rounded hover:bg-primary hover:text-white">Consult Online</button>
                    </div>
                </div>
            </div>
            <div className="mt-[2vw] flex flex-col rounded-xl border-gray-400 box-border border-2 p-5 mb-10">
                <div className="flex w-full justify-center items-center text-center">
                    <span className="font-bold text-[1.8vw]">OverView</span>
                    <hr className="text-gray-500" />
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <p className="text-purple-500 text-[1.5vw] font-bold">Personal Statement</p>
                    <div className="rounded-md border-gray-400 box-border border-2 p-5 mr-auto bg-gray-100 w-[60vw]">
                        <p>I am one of the highly qualified and an expert Family Medical Techniques with an invaluable experience of over 11 years. My residence is in Bareilly, Uttar Pradesh, India. I can fluently communicate with you in English, Hindi, Urdu, Russian, Punjabi. I will be happy to assist you via video and audio online medical consultation.</p>
                    </div>
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <p className="text-purple-500 text-[1.5vw] font-bold">Doctor Information</p>
                    <div className="rounded-md border-gray-400 box-border border-2 p-5 mr-auto bg-gray-100">
                        <div className="flex">
                            <FaUserDoctor color="" size={32} />
                            <div className="flex flex-col pl-[2vw]">
                                <div>
                                    <h1 className="text-[1.3vw] font-bold">Speciality</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-[1.3vw] font-bold">Other Treatment Area</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-[1.3vw] font-bold">Education</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                                <div>
                                    <h1 className="text-[1.3vw] font-bold">Past Experience</h1>
                                    <p>{data?.specialization}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <p className="text-purple-500 text-[1.5vw] font-bold">Available Timmings</p>
                    <div className="flex  p-5 justify-center items-center">
                        <div className="flex flex-col ">
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Monday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Tuesday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Wednesday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Thursday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Friday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <p className="text-lg font-semibold">Saturday</p>
                                <p className="text-lg">09:00am To 09:00pm</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col mt-[1vw]">
                    <p className="text-purple-500 text-[1.5vw] font-bold">Patient Reviews</p>
                    <div className="flex p-5 mr-auto">
                        <div className="w-[4vw] h-[4vw] rounded-full overflow-hidden">
                            <Image src={img} alt="reviews" objectFit="cover" />
                        </div>
                        <div className="pl-[3vw]">
                            <h1 className="font-bold text-[1vw]">Jenifer Lopez</h1>
                            <p>Nov 2023</p>
                            <p>Dr. Deep Sorthiya is very kind and gives me detailed explanations</p>
                        </div>
                    </div>
                    <div className="flex p-5 mr-auto">
                        <div className="w-[4vw] h-[4vw] rounded-full overflow-hidden">
                            <Image src={img} alt="reviews" objectFit="cover" />
                        </div>
                        <div className="pl-[3vw]">
                            <h1 className="font-bold text-[1vw]">Jenifer Lopez</h1>
                            <p>Nov 2023</p>
                            <p>Dr. Deep Sorthiya is very kind and gives me detailed explanations</p>
                        </div>
                    </div>
                    <div className="flex p-5 mr-auto">
                        <div className="w-[4vw] h-[4vw] rounded-full overflow-hidden">
                            <Image src={img} alt="reviews" objectFit="cover" />
                        </div>
                        <div className="pl-[3vw]">
                            <h1 className="font-bold text-[1vw]">Jenifer Lopez</h1>
                            <p>Nov 2023</p>
                            <p>Dr. Deep Sorthiya is very kind and gives me detailed explanations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
