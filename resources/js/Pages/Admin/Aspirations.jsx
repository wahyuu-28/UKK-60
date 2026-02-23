import React from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head } from '@inertiajs/react'
import Kyoto from '../../../../public/photo/Kyoto.jpg'

export default function Aspirations() {
  return (
        <Side>
            <Head title='Responses' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <IoIosArrowForward className='flex justify-center mt-2 mr-1 text-lg' /><b>Aspirations</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Aspirations Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>

           <div className='flex flex-row gap-6 justify-center'>
                <div className='bg-white flex flex-col px-4 py-4 rounded-lg w-64'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl font-semibold'>Judul</h3>
                        <span className={`rounded-full h-5 flex items-center bg-yellow-200 border px-4 py-2 `}>
                            <p className='font-inter text-yellow-500'>Proccess</p>
                        </span>
                    </div>
                    <div className='font-inter'>
                        <p className='font-light line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum beatae saepe ad. Non nihil neque, labore distinctio eum dolore quasi? Dolor, temporibus. Consectetur, quod?</p>
                        <p className='text-end font-medium text-sm mt-[5px]'>22-1-2022</p>
                    </div>
                </div>
                <div className='bg-white flex flex-col px-2 py-2 rounded-lg w-64'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl font-semibold'>Judul</h3>
                        <span className={`rounded-full h-5 flex items-center bg-yellow-200 border px-4 py-2 `}>
                            <p className='font-inter text-yellow-500'>Proccess</p>
                        </span>
                    </div>
                    <div className='font-inter'>
                        <p className='font-light line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum beatae saepe ad. Non nihil neque, labore distinctio eum dolore quasi? Dolor, temporibus. Consectetur, quod?</p>
                        <p className='text-end font-medium text-sm mt-[5px]'>22-1-2022</p>
                    </div>
                </div>
                <div className='bg-white flex flex-col px-2 py-2 rounded-lg w-64'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl font-semibold'>Judul</h3>
                        <span className={`rounded-full h-5 flex items-center bg-yellow-200 border px-4 py-2 `}>
                            <p className='font-inter text-yellow-500'>Proccess</p>
                        </span>
                    </div>
                    <div className='font-inter'>
                        <p className='font-light line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum beatae saepe ad. Non nihil neque, labore distinctio eum dolore quasi? Dolor, temporibus. Consectetur, quod?</p>
                        <p className='text-end font-medium text-sm mt-[5px]'>22-1-2022</p>
                    </div>
                </div>
                <div className='bg-white flex flex-col px-2 py-2 rounded-lg w-64'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-2xl font-semibold'>Judul</h3>
                        <span className={`rounded-full h-5 flex items-center bg-yellow-200 border px-4 py-2 `}>
                            <p className='font-inter text-yellow-500'>Proccess</p>
                        </span>
                    </div>
                    <div className='font-inter'>
                        <p className='font-light line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum beatae saepe ad. Non nihil neque, labore distinctio eum dolore quasi? Dolor, temporibus. Consectetur, quod?</p>
                        <p className='text-end font-medium text-sm mt-[5px]'>22-1-2022</p>
                    </div>
                </div>
           </div>
        </Side>
  )
}

