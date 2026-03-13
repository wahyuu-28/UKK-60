import { Head, Link, router, useForm } from '@inertiajs/react'
import React from 'react'
import Side from '../Layout/Side';
import { CircleCheckBig, Send } from 'lucide-react';
import { FaRunning } from 'react-icons/fa';
import { TbCancel } from 'react-icons/tb';

export default function Home({ status }) {
    return (
        <Side>
            <Head title='Home'/>

            <h5 className='text-lg font-plus-jakarta flex font-bold'>Home</h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Home Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>

            <div className='grid grid-cols-3 gap-4 mt-[40px]'>
                {/* Waiting */}
                <div className='bg-white p-6 rounded-2xl border-2 border-gray-100 transition-all shadow-md w-full'>
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
                <div className='bg-white p-6 rounded-2xl border-2 border-gray-100 transition-all shadow-md w-full'>
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
                <div className='bg-white p-6 rounded-2xl border-2 border-gray-100 transition-all shadow-md w-full'>
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

            {/* Recent acitvity */}

        </Side>
    )
}
