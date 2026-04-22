import React, { useState } from 'react'
import Sides from '../Layout/Sides'
import Tracking from '../Components/Tracking'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Plus } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'

export default function Detail({ aspiration, categories }) {

    const [openImage, setIsOpenImage] = useState(null)
    const [image, setImage] = useState(null)

    function handleImageView(photo) {
        setIsOpenImage(photo)
    }

    function handleImage(photo) {
        setImage(photo)
    }

    const dateCreated = format(new Date(aspiration.created_at), 'dd MMMM yyyy', { locale: id })
    return (
        <Sides>
            <Head title={aspiration.subject} />
            <div className='grid grid-cols-12 gap-x-2 gap-y-4 p-3'>
                <div className='bg-white rounded-lg shadow-lg col-span-8 px-4 py-4 h-fit'>
                    <div className='mb-2'>
                        <div className='flex justify-end'>
                            <Link href={'/student/aspirations'}>
                                <Plus size={54} className='rotate-45 hover:text-red-500 hover:scale-90 duration-200' />
                            </Link>
                        </div>

                        <div className='font-inter px-4 py-4'>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Judul</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed'>{aspiration.subject}</span>
                            </div>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Deskripsi</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed'>{aspiration.caption}</span>
                            </div>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Lokasi</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed'>{aspiration.location}</span>
                            </div>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Kategori</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed'>{aspiration.category.category_name}</span>
                            </div>
                            <div className='flex my-4'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Dibuat Pada</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed '>{dateCreated}</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* tracking progress */}
                <div className='bg-white rounded-lg col-span-4 row-span-2 shadow-lg px-4 py-6'>
                    <div className='flex justify-center items-center'>
                        <Tracking currentStatus={aspiration.status} />
                    </div>
                    <div>
                        <h3 className='font-plus-jakarta font-bold text-xl mb-4'>Feedback Photos</h3>
                        {aspiration.response && aspiration.response.length > 0 ? (
                            <div className='grid grid-cols-2 gap-2 cursor-pointer'>
                                {aspiration.response.map((res, index) => (
                                    res.photo && (
                                        <img
                                            key={index}
                                            src={`/storage/${res.photo}`}
                                            className='w-full h-24 object-cover rounded-md shadow-md'
                                            onClick={() => handleImageView(res.photo)}
                                        />

                                    )
                                ))}
                            </div>
                        ) : (
                            <p className='text-xs text-gray-400 italic text-center py-4'>Belum ada gambar feedback.</p>
                        )}
                    </div>
                </div>

                {openImage && (
                    <div className='bg-black/50 backdrop-blur-sm fixed inset-0 flex justify-center items-center' onClick={() => setIsOpenImage(null)}>
                        <div className='bg-white rounded-md px-4 py-4 shadow-md'>
                            <img src={`/storage/${openImage}`} className='shadow-lg' />
                        </div>
                    </div>
                )}

                {/* gambar */}
                <div className='bg-white rounded-lg shadow-lg col-span-8 px-4 py-6'>
                    <img src={`/storage/${aspiration.photo}`} className='rounded-lg object-contain w-full h-96' onClick={() => handleImage(aspiration.photo)} />
                </div>

                {image && (
                    <div className='bg-black/50 backdrop-blur-sm fixed inset-0 flex justify-center items-center' onClick={() => setImage(null)}>
                        <div className='bg-white rounded-md px-4 py-4 shadow-md'>
                            <img src={`/storage/${image}`} className='shadow-lg' />
                        </div>
                    </div>
                )}
            </div>
        </Sides>
    )
}

