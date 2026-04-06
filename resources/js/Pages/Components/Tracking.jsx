import React, { useState } from 'react'

export default function Tracking({ currentStatus }) {

    const statusToIndex = {
        'Submitted': 0,
        'Proccess': 1,
        'Completed': 2,
        'Rejected': -1
    };

    const steps = [
        { id: 'Submitted', label: 'Terkirim', desc: 'Menunggu konfirmasi...' },
        { id: 'Proccess', label: 'Diproses', desc: 'Laporan sedang dalam pengerjaan' },
        { id: 'Completed', label: 'Selesai', desc: 'Laporan selesai diatasi' },
    ]

    const activeDex = statusToIndex[currentStatus] ?? 0

    return (
        <div className='flex flex-col p-4'>
            {steps.map((step, index) => (
                <div key={step.id} className='relative flex gap-x-4'>
                    {index !== steps.length - 1 && (
                        <div className={`absolute left-[11px] top-6 bottom-0 w-[2px] transition-colors duration-500
                        ${index < activeDex ? 'bg-indigo-600' : 'bg-gray-200'}
                        ` }>
                        </div>
                    )}

                    <div className='relative z-10 flex h-6 w-6 shrink-0 items-center justify-center'>
                        <div className={`h-4 w-4 rounded-full border-2 transition-all duration-500
                                ${index <= activeDex ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-gray-200 border border-slate-300'}
                                `}>
                        </div>
                    </div>

                    <div className="pb-16">
                        <p className={`text-sm font-bold leading-none transition-colors duration-500
                            ${index <= activeDex ? 'text-indigo-600 visible' : 'hidden'}`}>
                            {step.label}
                        </p>
                        <p className={`text-xs text-gray-400 mt-1.5
                            ${index <= activeDex ? 'visible' : 'hidden'}`}>
                                {step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
