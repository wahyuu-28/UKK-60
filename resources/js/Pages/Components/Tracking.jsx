import React, { useState } from 'react'

export default function Tracking({ currentStatus }) {

    const statusToIndex = {
        'Submitted': 0,
        'Process': 1,
        'Completed': 2,
        'Rejected': -1
    };

    const activeDex = statusToIndex[currentStatus] ?? 0

    const steps = [
        { id: 'Submitted', label: 'Terkirim', desc: activeDex > 0 ? 'Sudah dikonfirmasi' : 'Menunggu Konfirmasi...' },
        { id: 'Process', label: 'Diproses', desc: activeDex > 1 ? 'Selesai ditangani...' : 'Sedang dalam proses penanganan...' },
        { id: 'Completed', label: 'Selesai', desc: 'Laporan selesai diatasi' },
    ]


    return (
        <div className='flex flex-col p-4 '>
            {steps.map((step, index) => (
                <div key={step.id} className='relative flex gap-x-4'>
                    {index !== steps.length - 1 && (
                        <div className={`absolute left-[11px] top-6 bottom-0 w-[2px] transition-colors duration-500
                        ${index < activeDex ? 'bg-indigo-600' : 'bg-gray-200'}
                        ` }>
                        </div>
                    )}

                    <div className='relative flex h-6 w-6 shrink-0 items-center justify-center'>
                        <div className={`h-4 w-4 rounded-full border-2 transition-all duration-500
                                ${index <= activeDex ? 'bg-indigo-600 border-indigo-600 shadow-sm' : 'bg-gray-200 border border-slate-300'}
                                `}>
                        </div>
                    </div>

                    <div className="pb-16">
                        <p className={`text-sm font-semibold leading-none transition-all duration-500
                            ${index <= activeDex ? 'text-indigo-600' : 'text-slate-400'}`}>
                            {step.label}
                        </p>

                        <div className={`transition-all duration-700 delay-100 ${index <= activeDex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                            <p className='text-xs text-slate-500 my-1 font-inter font-medium leading-relaxed'>
                                {step.desc}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
