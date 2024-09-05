
// export default function Footer() {
//     return (
//         <div className="flex flex-col p-4 items-center text-white bg-[#02263C] pt-8">
//             <div className="flex flex-row justify-around items-center">
//                 <div className="flex flex-row items-center">
//                     <img src="/NITH_LOGO_blacknwhite.png" alt="logo" className="max-h-[55px] max-w-[55px]" />
//                     <span className="ml-2 text-lg">superset</span>
//                 </div>
//                 <div className="flex flex-row max-w-[75%] text-[12px]">
//                     Superset enables National Institute of Technology, Hamirpur to automate end-to-end campus placements, helps employers hire one of the best young talents from across departments in the college, and empowers students to access opportunities democratically.
//                 </div>
//             </div>
//             <hr className="my-4 w-[90%] border-t-2 border-gray-300" />
//             <div className="flex flex-row justify-around">
//                 <p>© 2024 All Rights Reserved .</p>
//             </div>
//         </div>
//     )
// }

// export default function Footer() {
//     return (
//         <div className="flex flex-col p-4 items-center text-white bg-[#02263C] pt-8">
//             <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center w-full">
//                 <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left">
//                     <img src="/NITH_LOGO_blacknwhite.png" alt="logo" className="max-h-[55px] max-w-[55px] mx-auto sm:mx-0" />
//                     <span className="mt-2 sm:mt-0 sm:ml-2 text-lg text-center sm:text-left">superset</span>
//                 </div>
//                 <div className="flex flex-col sm:flex-row sm:max-w-[75%] text-[12px] mt-4 sm:mt-0 text-center sm:text-left">
//                     Superset enables National Institute of Technology, Hamirpur to automate end-to-end campus placements, helps employers hire one of the best young talents from across departments in the college, and empowers students to access opportunities democratically.
//                 </div>
//             </div>
//             <hr className="my-4 w-[90%] border-t-2 border-gray-300" />
//             <div className="flex flex-row justify-around w-full">
//                 <p>© 2024 All Rights Reserved.</p>
//             </div>
//         </div>
//     )
// }

export default function Footer() {
    return (
        <div className="flex flex-col p-4 pt-8 sm:pt-6 items-center text-white bg-[#02263C]">
            <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center w-full">
                <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left">
                    <img src="/NITH_LOGO_blacknwhite.png" alt="logo" className="max-h-[55px] max-w-[55px] mx-auto sm:mx-0" />
                    <span className="mt-2 sm:mt-0 sm:ml-2 text-lg text-center sm:text-left">NITH superset</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:max-w-[75%] text-[12px] mt-4 sm:mt-0 text-center sm:text-left">
                    Superset enables National Institute of Technology, Hamirpur to automate end-to-end campus placements, helps employers hire one of the best young talents from across departments in the college, and empowers students to access opportunities democratically.
                </div>
            </div>
            <hr className="my-4 w-[90%] border-t-2 border-gray-300" />
            <div className="flex flex-row justify-around w-full">
                <p>© 2024 All Rights Reserved.</p>
            </div>
        </div>
    )
}
