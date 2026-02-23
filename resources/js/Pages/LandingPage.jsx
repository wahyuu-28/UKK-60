import { Head, Link } from '@inertiajs/react'
import React from 'react'
import Navbar from './Landing/Navbar'
import Hero from './Landing/Hero'
import Services from './Landing/Services'
import Footer from './Landing/Footer'

export default function Home() {
    return (
        <div className='min-h-screen'>
            <Head title='Welcome' />

            <Navbar classname='' />
            <main className='pt-20'>
                <Hero/>
                <Services/>
                <Footer/>
                <div className='flex justify-center m-3'>
                    <Link className='bg-[#008BFF] px-2 py-2 hover:bg-[#3F9AAE] rounded-lg transition-all' href="/login">Login</Link>
                </div>
            </main>
        </div>

    )
}

