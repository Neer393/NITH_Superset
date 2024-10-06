import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { IoPlayCircleOutline } from "react-icons/io5";

function TpoLanding() {
    const redirect = useNavigate();

    const fade = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { ease: "easeInOut", duration: 1.5 },
        },
    };
  return (
    <div >
        <Navbar />
        <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-white py-4 px-4 md:px-6 lg:px-8 ">
            <div className="max-w-[35rem] md:text-left md:pl-[2%] md:mt-[-200px]">
                    <motion.h1
                        className="text-[2.3rem] text-center md:text-left w-full font-bold text-gray-900"
                        initial="hidden"
                        animate="visible"
                        variants={fade}
                    >
                       Take your placement cell online.
                    </motion.h1>

                    <p className="mt-4 text-lg sm:px-0 px-2 text-center md:text-left text-gray-600">
                    Digitisation & Automation of Campus Placements, tried and tested by universities across.
                    </p>

                    <div className="flex flex-wrap  mx-auto w-full justify-center md:justify-start gap-4">
                        <button
                            className="mt-6 bg-[#FFBB01] border-3 w-40 border-[#ECBA35] py-2 px-4 rounded-3xl text-[#000000] hover:bg-yellow-500"
                            onClick={() => redirect("/getStarted")}
                        >
                            Get Started
                        </button>
                        <button className="mt-6  border-2  py-2 px-4 w-40 rounded-3xl text-[#000000] cursor-pointer flex items-center gap-2 justify-center ">
                            Watch Video{" "}
                            <IoPlayCircleOutline className="text-xl" />
                        </button>
                    </div>
            </div>
            <div className="md:w-1/2 flex justify-center mb-6 md:mb-0 ">
                    <div className="relative max-w-[600px] w-full md:w-[600px] md:h-[600px]  mb-12 ">
                        <img
                            src="https://joinsuperset.com/img/superset-lp-hero-illustration.svg"
                            alt="Hero Illustration"
                            className="w-[92%] h-auto object-cover z-1"
                            initial="hidden"
                            animate="visible"
                            variants={fade}
                        />
                    </div>
            </div>
            
        </div>

        <div className='mb-8'>
            <div className='flex flex-col items-center justify-center mb-8'>

              <h1 className="text-[2.0rem] text-center w-full font-semibold text-gray-900">
              All the data you need, in one glance.
              </h1>
              <h1 className="mt-4 text-[1.7rem] sm:px-0 px-2 text-center text-gray-400 font-semibold">
              Gold mine of data insights
              </h1>
              
              <video className=" max-w-[900px] mt-8 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 border-medium" loop autoPlay muted poster="https://joinsuperset.com/img/video-dashboard-poster.webp">
              <source src="https://joinsuperset.com/img/video-dashboard-clip-min.mp4" type="video/mp4;" />
              </video>
            </div>

            <div className='bg-yellow-500 h-[200px] flex flex-col items-center'>
                <h1 className='font-semibold text-[2.0rem] pt-8'>
                    Career come seeking you
                </h1>
                <h1 className='font-normal text-[1.1rem] pt-2'>
                    Get discovered by new employers
                </h1>

            </div>

            <div className='flex flex-col items-center justify-center mt-4'>

              <h1 className="text-[2.0rem] text-center w-full font-semibold text-gray-900">
              Streamlining placements end-to-end
              </h1>
              <h1 className="mt-4 text-[1.6rem] sm:px-0 px-2 text-center text-gray-400 font-semibold">
              Seamless student data management
              </h1>

              <h1 className="text-[1.2rem] sm:px-0 px-2 text-center text-gray-400 font-medium">
              Save 80% more time, and track every student's placement cycle in one glance
              </h1>
              
              <video className=" max-w-[900px] mt-8 bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 border-medium" loop autoPlay muted poster=" https://joinsuperset.com/img/vid1-poster-min.webp">
              <source src=" https://joinsuperset.com/img/vid2.mp4" type="video/mp4;" />
              </video>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default TpoLanding