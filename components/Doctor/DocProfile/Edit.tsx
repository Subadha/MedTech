import img from "@/app/images/doc1.png";
import Image from "next/image";

export default function Edit() {
    return (
        <div className="flex flex-col gap-5 w-full md:w-[30vw]">
            <div>
                <h1 className="font-bold text-lg md:text-xl">Edit Profile</h1>
            </div>
            <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image src={img} alt="doc" className="object-cover" />
                    </div>
                    <div className="flex justify-center bg-purple-200 p-3 rounded-lg items-center text-center h-[6vh]">
                        <button className="text-sm md:text-md font-medium">Change Photo</button>
                    </div>
                </div>

                {/* Profile Info Section */}
                <div className="flex flex-col border-2 rounded-lg shadow-lg p-6 gap-4">
                    {["Your Name", "Your Email", "Your Phone Number"].map((label, index) => (
                        <div key={index} className="flex flex-col w-full">
                            <div className="flex pb-2">
                                <h1 className="text-sm md:text-md">{label}</h1>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-sm md:text-md">Sid</h1>
                                </div>
                                <div>
                                    <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* KYC Section */}
                <div className="flex flex-col gap-4 border-2 rounded-lg shadow-lg p-6">
                    <div>
                        <h1 className="text-sm md:text-md font-semibold">KYC</h1>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm md:text-md">KYC Status</h1>
                            <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">View</button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm md:text-md">KYC Details</h1>
                            <button className="bg-purple-200 px-3 py-1 rounded-lg cursor-pointer text-xs md:text-sm">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
