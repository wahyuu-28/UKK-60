import { Head, Link } from '@inertiajs/react'
import React from 'react'
import Navbar from './Landing/Navbar'
import Hero from './Landing/Hero'
import Services from './Landing/Services'
import Footer from './Landing/Footer'
import Recent from './Landing/Recent'

export default function Home() {
    return (
        <div className='min-h-screen'>
            <Head title='Welcome' />

            <Navbar classname='' />
            <main className='pt-20'>
                <Hero/>
                <Services/>
                <Recent/>
                <Footer/>
            </main>
        </div>

    )
}

