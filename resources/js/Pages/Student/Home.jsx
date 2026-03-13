import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import Side from '../Layout/Side';
import { CircleCheckBig, Send } from 'lucide-react';
import { FaRunning } from 'react-icons/fa';
import { TbCancel } from 'react-icons/tb';
import Sides from '../Layout/Sides'
import { MdOutlineLocationOn } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

export default function Home({ status, recentAspi }) {
    const { auth } = usePage().props

    return (
        <Sides>
            <Head title='Home' />

            <h5 className='text-lg font-plus-jakarta flex font-bold'>Home</h5>
            <h1 className='text-5xl font-bold font-plus-jakarta capitalize'>Welcome {auth.user.name}</h1>
            <h1 className='font-plus-jakarta'>Here is where you can monitoring your report.</h1>


            <div className='grid grid-cols-3 gap-4 mt-[40px]'>
                {/* Waiting */}
                <div className='bg-white p-6 rounded-2xl border-1 border-gray-400 transition-all shadow-md w-full'>
                    {/* icon dari lucide icons */}
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-2 rounded-xl bg-[#cffafe] border'>
                            <Send className='text-[#06b6d4] text-2xl' />
                        </div>
                    </div>
                    {/* text */}
                    <div>
                        <p className='font-plus-jakarta font-medium text-gray-500 text-sm'>Submitted</p>
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>{status.submitted}</h3>
                    </div>
                </div>

                {/* Proccess */}
                <div className='bg-white p-6 rounded-2xl border-1 border-gray-400 transition-all shadow-md w-full'>
                    {/* icon dari react icons */}
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-2 rounded-xl bg-[#fef08a] border'>
                            <FaRunning className='text-[#eab308] text-2xl' />
                        </div>
                    </div>
                    {/* text */}
                    <div>
                        <p className='font-plus-jakarta font-medium text-gray-500 text-sm'>Proccess</p>
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>{status.proccess}</h3>
                    </div>
                </div>

                {/* Completed */}
                <div className='bg-white p-6 rounded-2xl border-1 border-gray-400 transition-all shadow-md w-full'>
                    {/* icon dari react icons */}
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-2 rounded-xl bg-[#bbf7d0] border'>
                            <CircleCheckBig className='text-[#22c55e] text-2xl' />
                        </div>
                    </div>
                    {/* text */}
                    <div>
                        <p className='font-plus-jakarta font-medium text-gray-500 text-sm'>Completed</p>
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>{status.completed}</h3>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="font-bold font-plus-jakarta my-8">Recent Aspirations</h2>
                <div className='grid grid-cols-2 px-4 gap-3'>
                    {recentAspi.length > 0 ? (
                        recentAspi.map((item) => (
                            <Link href={`/student/aspirations/${item.id}`}>
                                <div key={item.id} className="relative">

                                    <img src={`/storage/${item.photo}`} className='rounded-t-lg aspect-video h-64 w-full' />
                                    <span className={`rounded-full font-inter font-semibold px-2 h-fit shadow-lg absolute top-4 right-4
                                ${item.status === 'Submitted' ? 'bg-gray-200 text-gray-600' :
                                            item.status === 'Proccess' ? 'bg-amber-200 text-amber-600' :
                                                item.status === 'Rejected' ? 'bg-red-200 text-red-600' :
                                                    item.status === 'Completed' ? 'bg-blue-200 text-blue-600' :
                                                        ''
                                        }
                                    `}
                                    >{item.status}</span>

                                    <div className='bg-white rounded-b-lg shadow-lg border py-2 px-3'>
                                        <span className='flex flex-row items-center py-2 px-2 gap-3'>
                                            <MdOutlineLocationOn className='text-[16px] text-gray-500' />
                                            <p className='font-inter font-medium text-sm text-gray-500'>{item.location}</p>
                                            <GoDotFill className='text-[8px] text-gray-500' />
                                            <p className='font-inter font-medium text-sm text-gray-500'>{item.time}</p>
                                        </span>
                                        <h3 className='font-inter font-bold text-2xl capitalize'>{item.subject}</h3>
                                        <p className='line-clamp-2 font-inter font-light text-gray-600'>{item.caption}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-xs opacity-50">Belum ada aspirasi...</p>
                    )}
                </div>
            </div>

        </Sides>
    )
}
