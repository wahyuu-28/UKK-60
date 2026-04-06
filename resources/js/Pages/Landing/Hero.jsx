import React from 'react'
import Kelas from '../../../../storage/app/public/photo/view-modern-classroom-schooll.jpg'
import { Link } from '@inertiajs/react'
import { motion, scale } from 'motion/react'

const containerText = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.4 } }

}

const itemText = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1, x: 0, transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
        }
    }
}

export default function Hero() {
    return (
        <section id='hero' className='relative pb-60 overflow-hidden'>
            <div className='absolute inset-0 z-0'>
                <img src={Kelas} className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'></div>
            </div>

            <div className='container mx-auto px-6 pt-32 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center gap-2'>

                    <motion.div
                        variants={containerText}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                        className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left'>
                        <motion.h1
                            variants={itemText}
                            className='font-plus-jakarta text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight  text-white flex flex-col'>
                            Bring Amazing Experience, With
                            <motion.span
                                variants={itemText}

                                className='text-[#00e1ff]'>
                                Your Action
                            </motion.span>
                        </motion.h1>
                        <motion.p
                            variants={itemText}
                            className='text-white font-plus-jakarta text-sm mb-5'>Mari ikut berkontribusi dalam usaha perawatan sarana dan prasarana sekolah</motion.p>

                        <motion.div
                            variants={itemText}
                        >
                            <motion.div
                                variants={itemText}
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                <Link as={'button'} href={'/login'} className='bg-[#00e1ff] text-slate-900 w-52 font-plus-jakarta font-semibold px-2 py-2 rounded-lg shadow-md hover:text-[#738598] hover:bg-white duration-300'>
                                    Buat Laporan
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            <div>

            </div>
        </section>
    )
}


