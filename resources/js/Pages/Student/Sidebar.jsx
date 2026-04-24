import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidBellRing, BiSolidMessageDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";


export default function Sidebar() {
    const { props, url } = usePage()
    const { auth } = props

    useEffect(() => {
        if (auth.user) {
            window.Echo.private(`App.models`)
        }
    })
    const isActive = (path) => url.startsWith(path)

    function logout() {
        router.post('/student/logout')
    }
    return (
        <aside className="bg-slate-100 flex flex-col min-h-screen left-0 w-60 shadow-xl">
            <p className="flex justify-center items-center font-plus-jakarta font-bold text-3xl">PeaceSchool</p>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 opacity-60 font-plus-jakarta">Main Menu</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link href={"/student/home"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[140px] transition-all rounded-lg flex
                    ${isActive('/student/home') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-600 hover:text-blue-600'}
                    `}>
                    <MdDashboard className="flex shrink-0 justify-center mt-1 mr-1 text-lg" /> Dashboard
                </Link>

                <Link href={"/student/aspirations"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[140px] transition-all rounded-lg flex
                    ${isActive('/student/aspirations') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-600 hover:text-blue-600'}
                    `}>
                    <BiSolidMessageDetail className="flex shrink-0 justify-center mt-1 mr-1 text-lg" /> Aspirations
                </Link>

                <Link href={"/student/notifications"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[140px] transition-all rounded-lg flex
                    ${isActive('/student/notifications') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-600 hover:text-blue-600'}
                    `}>
                    <BiSolidBellRing className="flex shrink-0 justify-center mt-1 mr-1 text-lg" /> Notifications
                </Link>

            </div>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 opacity-60 font-plus-jakarta">Preference</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link className="font-plus-jakarta font-bold text-red-500 hover:text-white  p-2 py-2 w-[125px] hover:bg-[#ff3131] transition-all rounded-lg flex" as={"button"} onClick={logout}><LuLogOut className="flex justify-center mt-1 mr-1 text-lg" /> Logout</Link>
            </div>

            <div className="mt-auto pt-4 border-t-2 border-t-black">
                <div className="flex justify-center px-5 gap-5">
                    <CgProfile size={50} className="text-black" />
                    <div className="flex flex-col justify-center items-center font-plus-jakarta capitalize pb-4">
                        <h1 className="font-bold text-center text-black">
                            {auth.user.name}
                        </h1>
                        <h3 className="font-medium text-black">
                            {auth.user.siswa.grade}
                        </h3>
                    </div>
                </div>
            </div>
        </aside>
    );
}

