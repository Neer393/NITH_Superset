import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {
    const location = useLocation();

    useEffect(() => {
        document.title = "NITH | Superset";
        const hash = location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                element.focus();
            }
        }
    }, [location]);

    return (
        <div>
            <Navbar />
            <div className="flex flex-col-reverse md:flex-row items-center justify-around bg-white py-4 px-4 md:px-6 lg:px-8">
                <div className="md:w-1/2 text-center md:text-left md:pl-[2%]">
                    <h1 className="text-[2.5rem] font-bold text-gray-900">Where Talent</h1>
                    <h1 className="text-[2.5rem] font-bold text-gray-900">Meets Opportunity</h1>
                    <p className="mt-4 text-gray-600">
                        Superset helps fresh graduates get their first jobs,
                    </p>
                    <p className="text-gray-600">
                        enables employers to recruit faster,
                    </p>
                    <p className="text-gray-600">
                        and helps NIT Hamirpur streamline campus placements.
                    </p>
                    <Link to="/#get-started">
                        <button className="mt-6 bg-[#FFBB01] border-3 border-[#ECBA35] py-2 px-4 rounded-3xl text-[#000000] hover:bg-yellow-500">
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <div className="relative max-w-[450px] max-h-[450px] w-full mb-12">
                        <img
                            src="/website-hero-bg.svg"
                            alt="Background"
                            className="w-[92%] h-auto object-cover z-1"
                        />
                        <img
                            src="/hero-person-1.png"
                            alt="Person 1"
                            className="absolute top-0 left-[8%] w-[45%] md:w-[45%] h-[60%] z-2 rounded"
                        />
                        <img
                            src="/hero-person-2.svg"
                            alt="Person 2"
                            className="absolute top-[20%] md:top-[20%] left-[55%] md:left-[55%] w-[45%] h-auto z-2 rounded"
                        />
                        <img
                            src="/hero-person-3.svg"
                            alt="Person 3"
                            className="absolute top-[62%] md:top-[62%] left-[8%] w-[45%] md:w-[45%] h-auto z-2 rounded"
                        />
                    </div>
                </div>
            </div>
            <hr className="my-4" />
            <div className="flex flex-col items-center" id="get-started">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 mb-6">
                    <h3 className="font-bold">EMPLOYERS</h3>
                    <div className="flex flex-col items-center md:items-start mt-4 md:mt-0 md:ml-auto max-w-[440px]">
                        <h1 className="text-3xl font-bold">End-to-end virtual campus hiring</h1>
                        <p className="text-gray-600 mt-4">
                            Complete automation, right from - outreach to campus, engagement, assessments, virtual interviews to industry benchmarking and analytics.
                        </p>
                        <button className="mt-6 max-w-[150px] text-white bg-[#2E2B7E] py-2 px-4 rounded-3xl">
                            For Employers
                        </button>
                    </div>
                </div>
                <hr className="my-4 w-[80%]" />
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 mb-6">
                    <h3 className="font-bold">UNIVERSITY</h3>
                    <div className="flex flex-col mt-4 items-center md:items-start md:mt-0 md:ml-auto max-w-[440px]">
                        <h1 className="text-3xl font-bold">Digitise & automate placements online</h1>
                        <p className="text-gray-600 mt-4">
                            Effortlessly streamline your campus placement process by accessing the latest job openings, managing student data, and securing interviews, all with the aim of achieving a 100% campus placement success rate.
                        </p>
                        <button className="mt-6 max-w-[150px] text-white bg-[#2E2B7E] py-2 px-4 rounded-3xl">
                            For University
                        </button>
                    </div>
                </div>
                <hr className="my-4 w-[80%]" />
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 mb-6">
                    <h3 className="font-bold">STUDENTS</h3>
                    <div className="flex flex-col mt-4 items-center md:items-start md:mt-0 md:ml-auto max-w-[440px]">
                        <h1 className="text-3xl font-bold">Learn, prepare & apply to jobs</h1>
                        <p className="text-gray-600 mt-4">
                            Discover new opportunities, learn and practice on the go, prepare better for interviews
                        </p>
                        <button className="mt-6 max-w-[150px] text-white bg-[#2E2B7E] py-2 px-4 rounded-3xl">
                            For Students
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}