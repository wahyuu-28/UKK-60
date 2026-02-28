import React from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head, Link } from '@inertiajs/react'
import Kyoto from '../../../../public/photo/Kyoto.jpg'
import { formatDistanceStrict } from 'date-fns'
import { id } from 'date-fns/locale'

export default function Aspirations({ aspirations }) {
    return (
        <Side>
            <Head title='Responses' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <IoIosArrowForward className='flex justify-center mt-2 mr-1 text-lg' /><b>Aspirations</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Aspirations Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>

            <div className='grid grid-cols-3 gap-6 my-12 justify-center'>
                {aspirations.map((asp) => (
                    <div key={asp.id}>
                        <Link href={`/admin/aspirations/${asp.id}`}>
                            <div className='bg-white flex flex-col hover:-translate-y-2 hover:shadow-xl shadow-md px-2 py-2 rounded-lg duration-300'>   
                                <div className='flex justify-between items-center'>
                                    <h1 className='font-inter font-semibold text-2xl'>
                                        {asp.subject}
                                    </h1>
                                    <span className={`text-sm font-inter rounded-full font-semibold h-fit px-2 ${asp.status === 'Submitted' ? 'bg-gray-200 text-gray-600' :
                                        asp.status === 'Verified' ? 'bg-green-200 text-green-600' :
                                            asp.status === 'Proccess' ? 'bg-amber-200 text-amber-600' :
                                                asp.status === 'Complete' ? 'bg-blue-200 text-blue-600' :
                                                    ''
                                        }`}>
                                        {asp.status}
                                    </span>
                                </div>
                                <p className='font-inter font-medium text-gray-500 line-clamp-2'>{asp.caption}</p>
                                <p className='font-inter text-[10px] text-end'>- {formatDistanceStrict(new Date(asp.created_at), new Date(), {
                                    addSuffix: true,
                                    locale: id
                                })}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </Side>
    )
}

