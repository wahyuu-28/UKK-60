import { ChartLine } from 'lucide-react'
import React from 'react'
import { FaTasks, FaThumbsUp } from 'react-icons/fa'
import { FaChartSimple } from 'react-icons/fa6'
import { motion } from 'motion/react'

const containerText = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
}
const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.6 } }
}

const itemText = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1, y: 0, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    }
}
const item = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1, y: 0, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    }
}



export default function Services() {
    return (
        <section id='services' className='py-24 bg-white'>
            <motion.div
                variants={containerText}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}

                className='container mx-auto px-6'>
                <div className='text-center text-2xl mx-auto mb-16'>
                    <motion.h2
                        variants={itemText}

                        className='text-[#3C415E] font-plus-jakarta font-bold tracking-wider uppercase text-sm mb-3'>
                        Layanan Kami
                    </motion.h2>
                    <motion.h3
                        variants={itemText}

                        className='text-[#3C415E] text-4xl font-plus-jakarta font-extrabold capitalize mb-6'>
                        Mengapa menggunakan layanan kami?
                    </motion.h3>
                    <motion.p
                        variants={itemText}

                        className='text-lg font-plus-jakarta text-gray-500'>
                        Kami mempermudah proses penyampaian laporan anda kepada pihak terkait dengan lebih mudah
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-4 gap-8'>

                <motion.div
                    variants={item}
                >
                    <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                        <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                            <FaChartSimple size={24} className='text-white' />
                        </div>
                        <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Easy Submission
                        </div>
                        <p className='font-medium text-gray-500 text-md font-plus-jakarta'>Sampaikan aspirasi anda hanya dengan beberapa klik tanpa proses panjang dan rumit</p>
                    </div>
                </motion.div>

                <motion.div
                    variants={item}

                >
                    <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                        <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                            <FaTasks size={24} className='text-white' />
                        </div>
                        <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Easy Tracking
                        </div>
                        <p className='font-medium text-gray-500 font-plus-jakarta'>Pantau perkembangan laporan anda hanya melalui perangkat digital anda</p>
                    </div>
                </motion.div>

                <motion.div
                variants={item}
                >
                    <div className='bg-white shadow-md rounded-2xl p-10 border border-gray-100 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group'>
                        <div className='bg-[#1CB3C8] w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                            <FaThumbsUp size={24} className='text-white' />
                        </div>
                        <div className='text-2xl font-plus-jakarta text-[#1a1a3a] font-semibold'>
                            Social Impact
                        </div>
                        <p className='font-medium text-gray-500 font-plus-jakarta'>Lihat bagaimana kontribusi anda memberikan dampak nyata bagi sekolah</p>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    )
}
