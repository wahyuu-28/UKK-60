import { Head, Link, router, useForm } from '@inertiajs/react'
import React from 'react'
import Side from '../Layout/Side';
import { CircleCheckBig, Send } from 'lucide-react';
import { FaRunning } from 'react-icons/fa';
import { TbCancel } from 'react-icons/tb';
import Sides from '../Layout/Sides'

export default function Home() {
    function logout() {
        router.post('/student/logout')
    }
    return (
        <Sides>
             <Head title='Home'/>

            <h5 className='text-lg font-plus-jakarta flex font-bold'>Home</h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Home Overview</h1>
            <h1 className='font-plus-jakarta'>Let's see whats new on your dashboard</h1>


            <div className='grid grid-cols-4 gap-4 mt-[40px]'>
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
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>9350383</h3>
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
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>9350383</h3>
                    </div>
                </div>

                {/* Rejected */}
                <div className='bg-white p-6 rounded-2xl border-1 border-gray-400 transition-all shadow-md w-full'>
                    {/* icon dari react icons */}
                    <div className='flex justify-between items-start mb-4'>
                        <div className='p-2 rounded-xl bg-[#fecaca] border'>
                            <TbCancel className='text-[#ef4444] text-2xl' />
                        </div>
                    </div>
                    {/* text */}
                    <div>
                        <p className='font-plus-jakarta font-medium text-gray-500 text-sm'>Rejected</p>
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>9350383</h3>
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
                        <h3 className='font-inter text-2xl font-bold text-gray-900 mt-1 break-all'>9350383</h3>
                    </div>
                </div>
            </div>

            {/* Recent acitvity */}
            <div className='mt-12'>
                <h3 className='font-inter font-bold ms-4 text-[30px]'>Recently</h3>
                <table className='min-w-full divide divide-gray-200'>
                    <thead>
                        <tr>
                            <th className='bg-[#738598] p-2 text-white font-inter rounded-tl-lg'>No</th>
                            <th className='bg-[#738598] p-2 text-white font-inter'>Action</th>
                            <th className='bg-[#738598] p-2 text-white font-inter rounded-tr-lg'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='hover:bg-gray-200 bg-white duration-200'>
                            <td className='px-6 py-4 whitespace-nowrap text-center font-semibold font-inter'>1</td>
                            <td className='px-6 py-4 whitespace-nowrap text-center font-semibold font-inter'>Adding User : Wahyu as admin</td>
                            <td className='px-6 py-4 whitespace-nowrap text-center font-semibold font-inter'>2 min ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Sides>
    )
}
