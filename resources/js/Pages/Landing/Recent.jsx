import React from 'react'
import Classroom from '/public/photo/indonesian classroom.jpg'
import Whitebroad from '/public/photo/broken whiteboard.webp'
import PC from '/public/photo/school pc'
import { GoDotFill } from 'react-icons/go'
import { FaArrowRightLong } from 'react-icons/fa6'
import { MdOutlineLocationOn } from 'react-icons/md'
import { Link } from '@inertiajs/react'
import { motion, scale } from 'motion/react'

const recentAspirations = [
    { id: 1, subject: 'Perbaikan ruang kelas', status: 'Proccess', image: Classroom, caption: 'Perbaikan kerusakan kelas XI Mesin yang tidak memungkinkan untuk dilaksanakannya proses ajar mengajar', location: 'Ruang 24', time: '16 menit lalu' },
    { id: 2, subject: 'Perbaikan PC Lab', status: 'Proccess', image: PC, caption: 'Perbaikan PC RPL yang kondisinya tidak memungkinkan untuk digunakan selama proses pembelajaran', location: 'Lab B', time: '3 jam yang lalu' },
    { id: 3, subject: 'Perbaikan Papan Tulis', status: 'Verified', image: Whitebroad, caption: 'Penggantian papan tulis yang baru untuk kelas XI Geomatika 2 yang kondisinya tidak memungkinkan untuk dilaksanakannya proses ajar mengajar', location: 'Ruang 12', time: '1 hari lalu' },
]

const containerText = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
}
const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
}

const itemText = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1, x: 0, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20
        }
    }
}
const item = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1, y: 0, transition: {
            type: 'spring',
            stiffness: 260,
            damping: 40
        }
    }
}

export default function Recent() {

    return (
        <section id='recent' className='py-24 bg-gray-200'>

            <motion.div
                variants={containerText}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                className='container px-6'>
                <div className='text-center text-2xl mx-auto mb-12'>
                    <motion.h3
                        variants={itemText}
                        className='text-[#3C415E] text-start text-4xl font-plus-jakarta font-extrabold capitalize mb-2'>
                        Aspirasi Terbaru
                    </motion.h3>
                    <motion.p
                        variants={itemText}
                        className='text-lg font-plus-jakarta text-start text-gray-500'>
                        Aspirasi yang sedang ditindaklanjuti!. Jadilah bagian dari sekarang
                    </motion.p>
                </div>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', delay: 0.6, stiffness: 200 }}
            viewport={{ once: true }}
            >
                <Link href={'/login/student'} className='flex items-center justify-end text-[#3C415E] font-semibold text-xl font-inter px-2 me-4 mb-3'>Lihat Semua <FaArrowRightLong className='ms-2' /></Link>
            </motion.div>


            <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
            className='grid grid-cols-3 px-4 gap-3'>
                {recentAspirations.map((asp) => (

                    <motion.div
                    variants={item}
                    key={asp.id} className='relative'>

                        <img src={asp.image} className='rounded-t-lg object-cover h-64 w-full' />
                        <span className={`rounded-full font-inter font-semibold px-2 h-fit shadow-lg absolute top-4 right-4
                            ${asp.status === 'Submitted' ? 'bg-gray-200 text-gray-600' :
                                asp.status === 'Proccess' ? 'bg-amber-200 text-amber-600' :
                                    asp.status === 'Rejected' ? 'bg-red-200 text-red-600' :
                                        asp.status === 'Complete' ? 'bg-blue-200 text-blue-600' :
                                            ''
                            }
                            `}
                        >{asp.status}</span>



                        <div className='bg-white rounded-b-lg shadow-lg border py-2 px-3'>
                            <span className='flex flex-row items-center py-2 px-2 gap-3'>
                                <MdOutlineLocationOn className='text-[16px] text-gray-500' />
                                <p className='font-inter font-medium text-sm text-gray-500'>{asp.location}</p>
                                <GoDotFill className='text-[8px] text-gray-500' />
                                <p className='font-inter font-medium text-sm text-gray-500'>{asp.time}</p>
                            </span>
                            <h3 className='font-inter font-bold text-2xl capitalize'>{asp.subject}</h3>
                            <p className='line-clamp-2 font-inter font-light text-gray-600'>{asp.caption}</p>
                            <div className='flex justify-end px-4 py-2'>
                                <Link href={'/login/student'} className='font-inter font-semibold text-[#3C415E]'>Detail</Link>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </motion.div>


        </section>
    )
}
