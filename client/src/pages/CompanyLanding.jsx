import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { IoPlayCircleOutline } from "react-icons/io5";

export default function Landing() {
    const redirect = useNavigate();

    const fade = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { ease: "easeInOut", duration: 1.5 },
        },
    };
    return (
        <div>
            <Navbar />
            <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-white py-4 px-4 md:px-6 lg:px-8">
                <div className="max-w-[40rem] text-center md:text-left md:pl-[2%]">
                    <motion.h1
                        className="text-[2.3rem] w-full font-bold text-gray-900"
                        initial="hidden"
                        animate="visible"
                        variants={fade}
                    >
                        Recruitment Infrastructure for Campus Hiring
                    </motion.h1>

                    <p className="mt-4 text-lg sm:px-0 px-2 text-justify text-gray-600">
                        Thousands of Employers of all sizes — from startups to
                        large enterprises — use Superset to accept applications,
                        conduct assessments and interviews, roll out offers ‐
                        all with one account
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
                <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <div className="relative max-w-[450px] w-full md:w-[450px] md:h-[450px]  mb-12">
                        <img
                            src="/employer-hero-illustration-1.webp"
                            alt="Hero Illustration"
                            className="w-[92%] h-auto object-cover z-1"
                            initial="hidden"
                            animate="visible"
                            variants={fade}
                        />
                    </div>
                </div>
            </div>

            <motion.div
                className="lg:w-3/4 flex flex-col md:flex-row mx-auto justify-around items-center p-5 gap-10 md:gap-0 mb-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                <img
                    src="https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png"
                    className="h-20 saturate-0 opacity-50"
                    alt="ORACLE"
                />
                <img
                    src="https://seeklogo.com/images/B/bny-mellon-logo-9469CD5143-seeklogo.com.png"
                    className="h-14 saturate-0 opacity-50"
                    alt="BNY Mellon"
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg"
                    alt="wipro"
                    className="h-16 saturate-0 opacity-50"
                />
                <img
                    src="https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png?t=1720244494"
                    alt="TCS"
                    className="h-16 saturate-0 opacity-50"
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png"
                    alt="INFOSYS"
                    className="h-16 saturate-0 opacity-50"
                />
            </motion.div>

            <Footer />
        </div>
    );
}
