import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";
import doc from "@/app/images/doc1.png"
export const TextCard = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6  xl:col-span-6">
          <h1 className="mt-8 text-xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            Bhrunomatra: Smart Wearable Pregnancy Montoring Device
          </h1>

          <p className="mt-8 text-lg text-gray-700">
            Pregnacy related complications are a global issue in current world especially in developing countries.In 2017 about 29,50,000 women died during and following pregnacy and child birth.Every year about 2 million babies are still born of which 40 percent stillbirths occured during labour

          </p>
          <p className="mt-8 text-lg text-gray-700">
            To reduce the global burden , Kaustubha Medtech Pvt.Ltd purposes a werable pregnancy device Bhrunomatra ,fro monitoring pregnancy ,labour , delivery and post pregnancy for people who are in low resource settings
          </p>
        </div>
        <div className="h-screen w-[300px]">
          <Image
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[600px] xl:aspect-[16/9]"
            src={doc}
            alt=""
          />
        </div>
        <div className=" h-[300px] w-[400px] mt-[150px] px-4 ml-[200px] py-8 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center bottom-4 left-4 text-left" >
            <FaRegCheckCircle size={22} className="text-blue-600 mx-2" />
            <p className="mt-2 text-sm text-gray-800 bold">
              Continous monitoring for pregnancy
            </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
            <FaRegCheckCircle size={22} className="text-blue-600 mx-2" />
            <p className="mt-2 text-sm text-gray-800 bold">
             Helps in photo charting
            </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
            <FaRegCheckCircle size={22} className="text-blue-600 mx-2" />
            <p className="mt-2 text-sm text-gray-800 bold">
              Nonstress test (NST) & Contraction Stress Test (CST)
            </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
            <FaRegCheckCircle size={22}  className="text-blue-600 mx-2" />
            <p className="mt-2 text-sm text-gray-800 bold">
              Multiple parameter detection
            </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
            <FaRegCheckCircle size={32} className="text-blue-600 mx-2 " />
            <p className="mt-2 text-md text-gray-800 bold">
              Real World evidence.Cloud Computing & Deep learning for data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
