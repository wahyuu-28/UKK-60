import { ChartLine } from 'lucide-react'
import React from 'react'
import { FaTasks, FaThumbsUp } from 'react-icons/fa'
import { FaChartSimple } from 'react-icons/fa6'
import { GoGraph } from 'react-icons/go'

export default function Services() {
    return (
        <section className='py-24 bg-white'>
            <div className='container mx-auto px-6'>
                <div className='text-center text-2xl mx-auto mb-16'>
                    <h2 className='text-[#3C415E] font-plus-jakarta font-bold tracking-wider uppercase text-sm mb-3'>
                        Layanan Kami
                    </h2>
                    <h3 className='text-[#3C415E] text-4xl font-plus-jakarta font-extrabold capitalize mb-6'>
                        Siap Melayani Aspirasi anda
                    </h3>
                    <p className='text-lg font-plus-jakarta text-gray-500'>
                        Dengan menggunakan website kami, penyampaian aspirasi anda akan lebih mudah diproses
                    </p>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-4 gap-8'>
                <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                    <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform'>
                        <FaChartSimple size={24} className='text-white' />
                    </div>
                        <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Total Aspirasi
                        </div>
                        <p className='font-semibold text-gray-500 text-2xl font-plus-jakarta'>500k</p>
                </div>
                <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                    <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform'>
                        <FaTasks size={24} className='text-white' />
                    </div>
                    <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Aspirasi Terselesaikan
                        </div>
                        <p className='font-semibold text-gray-500 text-2xl font-plus-jakarta'>500k</p>
                </div>
                <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                    <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform'>
                        <FaThumbsUp size={24} className='text-white' />
                    </div>
                    <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Kepuasan Pengguna
                        </div>
                        <p className='font-semibold text-gray-500 text-2xl font-plus-jakarta'>100%</p>
                </div>

            </div>
        </section>
    )
}
