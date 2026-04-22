import React from 'react'
import Sides from '../Layout/Sides'
import { Head, Link } from '@inertiajs/react'
import { AiOutlineRight } from 'react-icons/ai'
import { format, isThisMonth, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns'
import { CiBellOn } from 'react-icons/ci'
import { motion, scale } from 'motion/react'


const listContainer = {
    invisible: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
}

const listItem = {
    invisible: { opacity: 0, scale: 0.9,  y: 40 },
    visible: {
        opacity: 1, scale: 1, y: 0, transition: {
            stiffness: 260,
            damping: 20,
            type: 'spring'
        }
    }
}

export default function Responses({ Notifications = [] }) {
    const groupingNotif = Notifications.reduce((groups, notif) => {
        const date = parseISO(notif.created_at)
        let label = 'Baru baru ini'

        if (isToday(date)) label = 'Hari ini'
        else if (isYesterday(date)) label = 'Kemarin'
        else if (isThisWeek(date)) label = 'Minggu ini'
        else label = format(date, 'dd MMMM yyyy').toUpperCase()

        if (!groups[label]) groups[label] = []
        groups[label].push(notif)
        return groups
    }, {})

    return (
        <Sides>
            <Head title='Notifications' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <AiOutlineRight className='flex mt-[6px] text-lg' /><b>Notifications</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Notifications Overview</h1>
            <h1 className='font-plus-jakarta'>Here's list of recent notifications</h1>

            <div className='max-w-5xl mt-12'>
                {Object.keys(groupingNotif).length > 0 ? (
                    Object.entries(groupingNotif).map(([label, items]) => (
                        <div key={label} className='mb-10 tracking-wide'>
                            <div className='flex justify-between items-center mb-4 border-b border-gray-100 pb-2'>
                                <span className='text-xs font-bold text-gray-400 font-plus-jakarta'>
                                    {label}
                                </span>
                                {label === 'Hari ini' && (
                                    <span className='text-xs font-semibold text-blue-500'>
                                        {items.length} New
                                    </span>
                                )}
                            </div>

                            <motion.div className='space-y-4' variants={listContainer} viewport={{ once: true, amount: 0.3 }} initial="invisible" animate="visible">
                                {items.map((notif) => (
                                    <motion.div key={notif.id} variants={listItem}
                                        >
                                        <Link href={`/student/aspirations/${notif.aspiration.id}`} className='block'>

                                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex gap-4 relative items-start">
                                                <div className="w-12 h-12 rounded-full bg-gray-100 shadow-inner flex-shrink-0 flex items-center justify-center">
                                                    <CiBellOn size={30} className='text-indigo-600' />
                                                </div>

                                                <div className='flex-1 font-plus-jakarta'>
                                                    <div className='text-[14px] font-bold px-2 py-2 rounded capitalize bg-blue-50 text-blue-600'>
                                                        {notif.response?.subject || 'judul'}
                                                    </div>
                                                    <span>
                                                        <p className='text-sm font-medium text-gray-500 line-clamp-1 capitalize'>{notif.response?.caption || 'isi desk'}</p>
                                                    </span>
                                                </div>
                                            </div>

                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))
                ) : (
                    <div className='text-center py-20 rounded-3xl border-2 border-dashed border-gray-200 text-gray-400'>
                        <p className='font-satoshi'>Belum ada notifikasi yang masuk...</p>
                    </div>
                )}
            </div>
        </Sides>
    )
}
