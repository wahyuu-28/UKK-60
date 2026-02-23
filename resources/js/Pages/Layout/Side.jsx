import React from 'react'
import Sidebar from '../Admin/Sidebar'

export default function Side({ children }) {
  return (
    <div className='flex min-h-screen'>
        <Sidebar />
        <div className='flex-1'>
            <main className='p-8'>
                {children}
            </main>
        </div>
    </div>
  )
}
