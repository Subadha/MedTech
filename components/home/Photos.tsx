import Image from 'next/image';
import p1 from "@/app/images/p1.png";
import p2 from "@/app/images/p2.png";
import p3 from "@/app/images/p3.png";
import p4 from "@/app/images/p4.png";
import p5 from "@/app/images/p5.png";
import p6 from "@/app/images/p6.png";

export default function Photo() {
    const images = [p1, p2, p3, p4, p5, p6];

    return (
        <div className="flex flex-col items-center sm:h-screen sm:p-4 p-6">
            <h1 className="text-5xl font-bold mb-8 text-center">
                See the Latest Photos
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
                {images.map((image, index) => (
                    <div key={index} className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                        <Image
                            src={image}
                            alt={`Photo ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
