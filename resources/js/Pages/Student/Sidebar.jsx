import { Link, router } from "@inertiajs/react";
import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";


export default function Sidebar() {
    function logout() {
        router.post('/student/logout')
    }
    return (
        <aside className="bg-white flex flex-col min-h-screen left-0 w-60 shadow-xl">
            <p className="flex justify-center items-center font-plus-jakarta font-bold text-3xl">PeaceSchool</p>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 opacity-60 font-plus-jakarta">Main Menu</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link href={"/student/home"}
                    className="font-plus-jakarta font-bold bg-white p-2 py-2 hover:bg-[#96f2ff]  w-[125px] transition-all rounded-lg flex">
                    <MdDashboard className="flex justify-center mt-1 mr-1 text-lg" /> Dashboard
                </Link>
                <Link href={"/student/aspiration"}
                    className="font-plus-jakarta font-bold bg-white p-2 py-2 hover:bg-[#1CB3C8] w-[125px] transition-all rounded-lg flex">
                    <BiSolidMessageDetail className="flex justify-center mt-1 mr-1 text-lg" /> Aspirations</Link>
                <Link href={"/student/history"}
                    className="font-plus-jakarta font-bold bg-white p-2 py-2 hover:bg-[#1CB3C8] w-[125px] transition-all rounded-lg flex">
                    <FaHistory className="flex justify-center mt-1 mr-1 text-lg" /> History</Link>
            </div>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 opacity-60 font-plus-jakarta">Preference</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link className="font-plus-jakarta font-bold text-red-500 hover:text-white bg-white p-2 py-2 w-[125px] hover:bg-[#ff3131] transition-all rounded-lg flex" as={"button"} onClick={logout}><LuLogOut className="flex justify-center mt-1 mr-1 text-lg" /> Logout</Link>
            </div>
        </aside>
    );
}
