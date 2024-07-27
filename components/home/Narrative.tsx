import Image from "next/image";
import c10 from "@/app/images/p1.png";
import c11 from "@/app/images/p2.png";

export default function Narrative() {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:h-screen bg-purple-100 px-4 md:px-[150px] py-10">
            <div className="text-center md:text-left mb-10 sm:mb-[350px]">
                <p className="text-purple-700 font-bold mb-2">Our Testimonial</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-5">Healing Narrative</h1>
                <button className="bg-purple-700 w-[200px] h-[50px] rounded-lg text-white font-bold">
                    See All Reviews
                </button>
            </div>
            <div className="flex items-center flex-col sm:ml-[200px]">
                <div className="flex flex-row w-full md:w-[600px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 flex-1">
                        <p className="mb-4">Far away behind the world of mountains far from the country Volkalia and Consonatia, there live the blind text.</p>
                        <div className="font-bold text-xl mb-2">Gabby Smith</div>
                        <p className="text-gray-500">Customer</p>
                    </div>
                    <div className="w-[120px] h-[120px] relative">
                        <Image src={c10} alt="Gabby Smith" layout="fill" objectFit="cover" />
                    </div>
                </div>
                <div className="flex flex-row w-full md:w-[600px] bg-white mb-10 shadow-md rounded-lg overflow-hidden">
                    <div className="p-6 flex-1">
                        <p className="mb-4">Far away behind the world of mountains far from the country Volkalia and Consonatia, there live the blind text.</p>
                        <div className="font-bold text-xl mb-2">Flyod Weather</div>
                        <p className="text-gray-500">Customer</p>
                    </div>
                    <div className="w-[120px] h-[120px] relative">
                        <Image src={c11} alt="Flyod Weather" layout="fill" objectFit="cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
