import { FaGoogle, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full bg-purple-900">
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row py-8">
        <div className="w-full px-4 md:w-1/2 flex flex-col items-center justify-center">
          <h1 className="max-w-sm text-md text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit sit amet consectetur sit amet consectetur</h1>
          <div className="mt-4 inline-flex w-full items-center md:w-3/4">
            <FaGoogle className='text-white mx-3'/>
            <FaFacebook className='text-white mx-3'/>
            <FaInstagram className='text-white mx-3'/>
            <FaTwitter className='text-white mx-3'/>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-white ">Helpful Link</p>
              <hr className="my-4 border-t-2 border-blue-800 w-16" />
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-white">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Press Release</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-600 " />
      <div className="mx-auto max-w-6xl items-center justify-center px-4 md:flex lg:px-0 sm:py-4">
        <div className="my-4 md:mt-0 ">
          <p className="text-sm font-medium text-white">Copyright © 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
