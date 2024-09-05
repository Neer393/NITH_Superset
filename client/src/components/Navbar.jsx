

// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     return (
//         <>
//             <>
//                 <div className="p-4 max-h-[100px] flex flex-row justify-between items-center">
//                     <div className="flex flex-row">
//                         <Link to="/" className="flex flex-row items-center">
//                             <img src="/NITH_LOGO.png" alt="logo" className="max-h-[68px] max-w-[68px]" />
//                             <span className="ml-4 text-xl">NITH SUPERSET</span>
//                         </Link>
//                     </div>

//                     <div className="sm:hidden">
//                         <button
//                             className="text-[#02263C] focus:outline-none"
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                             </svg>
//                         </button>
//                     </div>

//                     <div className="hidden sm:flex flex-row">
//                         <button className="w-[75px] bg-[#02263C] text-white flex flex-row p-2 items-center justify-center rounded-3xl hover:bg-[#640E13]">
//                             <Link to="/login">Login</Link>
//                         </button>
//                         <button className="w-[90px] bg-[#02263C] text-white flex flex-row p-2 items-center justify-center rounded-3xl ml-4 hover:bg-[#640E13]">
//                             <Link to="/student-register">Register</Link>
//                         </button>
//                     </div>
//                 </div>
//             </>
//             <div className={`overflow-hidden transition-all duration-700 ease-in-out sm:hidden ${isMenuOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
//                 <div className="flex flex-row sm:hidden bg-white shadow-md rounded-lg p-4 pt-1 pb-3 justify-around items-center">
//                     <button className="w-[90px] bg-[#02263C] text-white p-2 rounded-3xl hover:bg-[#640E13]">
//                         <Link to="/login">Login</Link>
//                     </button>
//                     <button className="w-[90px] bg-[#02263C] text-white p-2 rounded-3xl hover:bg-[#640E13]">
//                         <Link to="/student-register">Register</Link>
//                     </button>
//                 </div>

//             </div>
//         </>
//     );
// }

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="p-4 max-h-[100px] flex flex-row justify-between items-center relative">
                <div className="flex flex-row">
                    <Link to="/" className="flex flex-row items-center">
                        <img src="/NITH_LOGO.png" alt="logo" className="max-h-[68px] max-w-[68px]" />
                        <span className="ml-4 text-xl">NITH SUPERSET</span>
                    </Link>
                </div>

                <div className="sm:hidden">
                    <button
                        className="text-[#02263C] focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                <div className="hidden sm:flex flex-row">
                    <Link to="/login">
                        <button className="w-[75px] bg-[#02263C] text-white flex flex-row p-2 items-center justify-center rounded-3xl hover:bg-[#640E13]">
                            Login
                        </button>
                    </Link>
                    <Link to="/student-register">
                        <button className="w-[90px] bg-[#02263C] text-white flex flex-row p-2 items-center justify-center rounded-3xl ml-4 hover:bg-[#640E13]">
                            Register
                        </button>
                    </Link>
                </div>
            </div>

            {isMenuOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}

            <div className={`fixed top-0 right-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col p-4 space-y-4">
                    <Link to="/login">
                        <button className="w-full bg-[#02263C] text-white p-2 rounded-3xl hover:bg-[#640E13]">
                            Login
                        </button>
                    </Link>
                    <Link to="/student-register">
                        <button className="w-full bg-[#02263C] text-white p-2 rounded-3xl hover:bg-[#640E13]">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
