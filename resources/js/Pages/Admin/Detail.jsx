import React from 'react'
import Side from '../Layout/Side'
import { Head } from '@inertiajs/react'
import { FaUser } from 'react-icons/fa6'

export default function Detail({ aspiration }) {
    return (
        <Side>
            <Head title={aspiration.subject} />
            <div className='bg-white flex flex-col relative w-full rounded-xl px-2'>
                <div className='px-2 py-4'>
                    <h1 className='font-inter font-extrabold text-5xl'>
                        {aspiration.subject}
                    </h1>
                    <div className='flex items-center gap-x-2'>
                        <FaUser/>
                        <p className='font-inter capitalize'>{aspiration.user.name}</p>
                    </div>
                </div>

                <div className='flex items-center justify-center p-3'>
                    <img src={`/storage/${aspiration.photo}`} className='rounded-lg h-96' />
                </div>


            </div>
        </Side>
    )
}
