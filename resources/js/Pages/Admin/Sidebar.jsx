import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaHistory, FaUserPlus } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import Profile from '/storage/app/public/photo/bobby-fischer-gettyimages-495892222.avif'
import { CgProfile } from "react-icons/cg";

export default function Sidebar({  }) {
    const { props, url } = usePage()
    const { auth } = props

    const isActive = (path) => url.startsWith(path)

    function logout() {
        router.post('/admin/logout')
    }
    return (
        <aside className="bg-slate-900 flex flex-col min-h-screen left-0 w-60 shadow-xl">
            <p className="flex justify-center items-center font-plus-jakarta text-white font-bold text-3xl">PeaceSchool</p>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 text-slate-300 opacity-60 font-plus-jakarta">Main Menu</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link href={"/admin/home"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[125px] transition-all rounded-lg flex
                    ${isActive('/admin/home') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-300 hover:text-blue-600'}
                    `}>
                    <MdDashboard className="flex justify-center mt-1 mr-1 text-lg" /> Dashboard
                </Link>
                <Link href={"/admin/aspirations"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[125px] transition-all rounded-lg flex
                    ${isActive('/admin/aspirations') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-300 hover:text-blue-600'}
                    `}>
                    <BiSolidMessageDetail className="flex justify-center mt-1 mr-1 text-lg" /> Aspirations</Link>
                <Link href={"/admin/categories"}
                    className={`font-plus-jakarta font-bold p-2 py-2 w-[125px] transition-all rounded-lg flex
                    ${isActive('/admin/categories') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-300 hover:text-blue-600'}
                    `}>
                    <TbCategoryFilled className="flex justify-center mt-1 mr-1 text-lg" /> Categories</Link>
            </div>
            <p className="flex justify-start items-start mb-2 mt-4 ml-8 text-slate-300 opacity-60 font-plus-jakarta">Preference</p>
            <div className="flex flex-col justify-start items-start gap-2 ml-12">
                <Link className={`font-plus-jakarta font-bold p-2 py- w-[125px] transition-all rounded-lg flex
                    ${isActive('/admin/users') ? 'bg-blue-500/30 text-blue-600' : 'text-slate-300 hover:text-blue-600'}
                    `} href={"/admin/users"}><FaUserPlus className="flex justify-center mt-1 mr-1" size={20} /> User</Link>
                <Link className="font-plus-jakarta font-bold text-red-500 hover:text-white p-2 py-2 w-[125px] hover:bg-[#ff3131] transition-all rounded-lg flex" as={"button"} onClick={logout}><LuLogOut className="flex justify-center mt-1 mr-1" size={20} /> Logout</Link>
            </div>

            <div className="mt-auto pt-4 border-t-2 border-t-gray-200">
                <div className="flex justify-center px-5 gap-5">
                    <CgProfile size={50} className="text-white"/>
                    <div className="flex flex-col justify-center items-center font-plus-jakarta capitalize pb-4">
                        <h1 className="font-bold text-white">
                            {auth.user.name}
                        </h1>
                        <h3 className="font-medium text-white">
                            {auth.user.role}
                        </h3>
                    </div>
                </div>
            </div>
        </aside>
    );
}
