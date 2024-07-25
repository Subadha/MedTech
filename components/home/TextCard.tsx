import { FaRegCheckCircle } from "react-icons/fa";

export const TextCard = () => {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6  xl:col-span-6">
          <h1 className="mt-8 text-xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            Bhrunomatra: Smart Wearable Pregnancy Montoring Device
          </h1>

          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            modi blanditiis dolores quasi eaque explicabo!,Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consequatur modi blanditiis dolores quasi eaque
            explicabo Lorem ipsum
          </p>
          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            modi blanditiis dolores quasi eaque explicabo!,Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Consequatur modi blanditiis dolores quasi eaque
            explicabo Lorem ipsum
          </p>
        </div>
        <div className="h-[200px] w-[300px]">
          <img
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[300px] xl:aspect-[16/9]"
            src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className=" h-[300px] w-[300px] mt-8 px-4 py-8 max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center bottom-4 left-4 text-left" >
              <FaRegCheckCircle className="text-blue-600 mx-2" />
              <p className="mt-2 text-sm text-gray-800 bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi
              </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
              <FaRegCheckCircle className="text-blue-600 mx-2" />
              <p className="mt-2 text-sm text-gray-800 bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi
              </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
              <FaRegCheckCircle className="text-blue-600 mx-2" />
              <p className="mt-2 text-sm text-gray-800 bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi
              </p>
          </div>
          <div className="flex items-center bottom-4 left-4 text-left" >
              <FaRegCheckCircle className="text-blue-600 mx-2" />
              <p className="mt-2 text-sm text-gray-800 bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};
