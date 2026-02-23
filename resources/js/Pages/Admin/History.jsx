import React from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head } from '@inertiajs/react'

export default function History() {
    return (
        <Side>
            <Head title='History' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <IoIosArrowForward className='flex justify-center mt-2 mr-1 text-lg' /><b>History</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>History Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>
        </Side>
    )
}
