import React from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head } from '@inertiajs/react'
import Kyoto from '../../../../public/photo/Kyoto.jpg'

export default function Responses() {
    return (
        <Side>
            <Head title='Responses' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <IoIosArrowForward className='flex justify-center mt-2 mr-1 text-lg' /><b>Responses</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Responses Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>

            <div>

            </div>

            <div className='grid lg:grid-cols-3 gap-6 sm:grid-cols-1'>
                <div className='bg-white shadow-md rounded-lg lg:hover:-translate-y-3 lg:hover:shadow-2xl duration-200'>
                    <div className='rounded-md'>
                        <img className='rounded-xl p-2' src={Kyoto} alt="Foto keluhan" />
                    </div>
                    <div className='flex flex-col mx-2'>
                        <div className='flex flex-row justify-between'>
                            <div>
                            <h1 className='font-satoshi text-2xl font-bold'>Lorem ipsum dolor sit.</h1>
                            </div>
                            <span className="bg-[#D1FAE5] text-[#065F46] h-fit mt-2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Completed
                            </span>
                        </div>
                        <div>
                            <p className='text-xs font-satoshi line-clamp-3 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aliquam officiis, qui recusandae, ad, ipsum quas fuga voluptatibus nobis perspiciatis nihil. Sunt velit laboriosam cupiditate.</p>
                            <h6 className='text-sm font-inter text-end'>25-2-2003</h6>
                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-md rounded-lg lg:hover:-translate-y-3 lg:hover:shadow-2xl duration-200'>
                    <div className='rounded-md'>
                        <img className='rounded-xl p-2' src={Kyoto} alt="Foto keluhan" />
                    </div>
                    <div className='flex flex-col mx-2'>
                        <div className='flex flex-row justify-between'>
                            <div>
                            <h1 className='font-satoshi text-2xl font-bold'>Lorem ipsum dolor sit.</h1>
                            </div>
                            <span className="bg-[#D1FAE5] text-[#065F46] h-fit mt-2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Completed
                            </span>
                        </div>
                        <div>
                            <p className='text-xs font-satoshi line-clamp-3 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aliquam officiis, qui recusandae, ad, ipsum quas fuga voluptatibus nobis perspiciatis nihil. Sunt velit laboriosam cupiditate.</p>
                            <h6 className='text-sm font-inter text-end'>25-2-2003</h6>
                        </div>
                    </div>
                </div>
                <div className='bg-white shadow-md rounded-lg lg:hover:-translate-y-3 lg:hover:shadow-2xl duration-200'>
                    <div className='rounded-md'>
                        <img className='rounded-xl p-2' src={Kyoto} alt="Foto keluhan" />
                    </div>
                    <div className='flex flex-col mx-2'>
                        <div className='flex flex-row justify-between'>
                            <div>
                            <h1 className='font-satoshi text-2xl font-bold'>Lorem ipsum dolor sit.</h1>
                            </div>
                            <span className="bg-[#D1FAE5] text-[#065F46] h-fit mt-2 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Completed
                            </span>
                        </div>
                        <div>
                            <p className='text-xs font-satoshi line-clamp-3 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aliquam officiis, qui recusandae, ad, ipsum quas fuga voluptatibus nobis perspiciatis nihil. Sunt velit laboriosam cupiditate.</p>
                            <h6 className='text-sm font-inter text-end'>25-2-2003</h6>
                        </div>
                    </div>
                </div>
            </div>
        </Side>
    )
}

