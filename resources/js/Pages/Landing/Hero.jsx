import React from 'react'
import Kelas from '../../../../storage/app/public/photo/view-modern-classroom-schooll.jpg'
import { Link } from '@inertiajs/react'

export default function Hero() {
    return (
        <section className='relative pb-60 overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <img src={Kelas} className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'></div>
            </div>

            <div className='container mx-auto px-6 pt-32 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center gap-2'>

                    <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
                        <h1 className='font-plus-jakarta text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight  text-white flex flex-col'>
                            Bring Amazing Experience, With
                            <span className='text-[#1CB3C8]'>
                                 Your Action
                            </span>
                        </h1>
                        <p className='text-white font-plus-jakarta text-sm mb-5'>Mari ikut berkontribusi dalam usaha perawatan sarana dan prasarana sekolah</p>
                        <Link as={'button'} href={'/login'} className='bg-[#1CB3C8] text-[#DFE2E2] w-52 font-plus-jakarta font-semibold px-2 py-2 rounded-lg shadow-md hover:text-[#738598] hover:bg-white duration-300'>Beri Aspirasi</Link>
                    </div>

                </div>
            </div>

            <div>

            </div>
        </section>
    )
}


