import React, { useEffect } from 'react'
import Sidebar from '../Student/Sidebar'
import { Link, router, usePage } from '@inertiajs/react'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'motion/react'
import { TbBellRingingFilled } from 'react-icons/tb'

export default function Sides({ children }) {
    const { auth } = usePage().props

    useEffect(() => {
        if (auth.user) {
            window.Echo.private(`respons.${auth.user.id}`)
                .listen('SendResponse', (e) => {
                    router.reload({ preserveScroll: true })
                    console.log('event masuk: ', e)
                    toast.custom((t) => (
                        <Link href={'/student/notifications'}>
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{
                                opacity: t.visible ? 1 : 0,
                                x: t.visible ? 0 : 20,
                                scale: t.visible ? 1 : 0.6 }}
                            transition={{ type: 'spring' ,stiffness: 260 ,damping: 30 ,duration: 0.6 }}

                            onClick={() => {
                                toast.dismiss(t.id)
                            }}

                            className='max-w-md w-full bg-white shadow-2xl rounded-2xl pointer-events-auto flex border border-gray-100 cursor-pointer overflow-hidden'
                        >
                            <div className='flex-1 p-4'>
                                <div className='flex items-start'>
                                    <div className='flex shrink-0 pt-0.5 text-2xl'>
                                        <TbBellRingingFilled className='text-indigo-500' />
                                    </div>

                                    <div className='ml-3 flex-1'>
                                        <p className='text-sm font-bold text-gray-900 font-plus-jakarta'>{e.message}</p>
                                        <p className='text-xs font-semibold text-gray-700 font-plus-jakarta'>{e.subject}</p>
                                        <p className='mt-1 text-xs font-medium text-gray-500 line-clamp-2'>{e.caption}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex border-l border-gray-100'>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        toast.dismiss(t.id)
                                    }}
                                    className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-600 focus:outline-none'>Close</button>
                            </div>
                        </motion.div>
                        </Link>
                    ), { duration: 6000, position: 'top-right' })
                })
            return () => {
                window.Echo.leave(`respons.${auth.user.id}`)
            }
        }
    }, [auth.user])
    return (
        <div className='flex min-h-screen'>
            <Toaster position='top-right' />
            <Sidebar />
            <div className='flex-1'>
                <main className='p-8'>
                    {children}
                </main>
            </div>
        </div>
    )
}
