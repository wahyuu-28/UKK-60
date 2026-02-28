import React from 'react'
import Sidebar from '../Student/Sidebar'

export default function Sides({ children }) {
  return (
    <div className='flex min-h-screen'>
        <Sidebar/>
    <div className='flex-1'>
            <main className='pf-8'>
                {children}
            </main>
        </div>
    </div>
  )
}
