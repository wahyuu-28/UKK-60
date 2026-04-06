import React, { useState } from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head, Link, useForm } from '@inertiajs/react'
import Kyoto from '../../../../public/photo/Kyoto.jpg'
import { GoDotFill } from 'react-icons/go'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { PiArrowBendUpLeftBold, PiBroom } from 'react-icons/pi'
import { IoSend } from 'react-icons/io5'
import { FaUpload } from 'react-icons/fa'

export default function Responses({ aspiration }) {
    const { data, setData, post, reset, errors } = useForm({
        status: aspiration.status,
        caption: '',
        photo: null
    })
    const [preview, setPreview] = useState(false)

    function submit(e){
        e.preventDefault()
        post(`/admin/aspirations/${aspiration.id}/respons`, {
            forceFormData: true,
            onSuccess: () => {
                handleReset()
            }
        })
    }

    function handleReset(){
        reset()
        setPreview(false)
    }

    function handelPreview(e) {
        const file = e.target.files[0]
        setData('photo', file)

        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }
    const dateCreated = format(new Date(aspiration.created_at), 'dd MMMM yyyy', { locale: id })

    return (
        <Side>
            <Head title={`Responses - ${aspiration.subject}`} />
            <div className='flex items-baseline justify-between'>
                <div>
                    <h1 className='text-5xl font-bold font-plus-jakarta'>Reply Aspiration</h1>
                    <h1 className='font-plus-jakarta'>Menage and respond aspirations effectively.</h1>
                </div>

                <div className='flex gap-4 h-full font-inter font-bold'>
                    <button onClick={() => handleReset()} type='button' className='bg-white border-2 border-black/20 rounded-xl px-2 py-2 flex items-center gap-[6px] hover:border-white hover:bg-black hover:text-white transition-colors duration-200'><PiBroom /> Reset</button>
                    <button type='submit' form='formRespon' className='bg-indigo-500 px-2 py-2 rounded-xl flex items-center gap-[6px] text-white shadow-md hover:scale-110 transition-transform duration-200'><IoSend />Submit Respons</button>
                </div>
            </div>

            <div className='grid grid-cols-12 mt-12 gap-6'>
                <div className='col-span-4'>
                    <img src={`/storage/${aspiration.photo}`} className='object-cover rounded-t-lg shadow-xl' />

                    <div className='bg-white rounded-b-lg shadow-xl py-3 px-2'>
                        <div className='flex gap-x-2 items-center'>
                            <span className={`text-sm font-inter rounded-full w-24 text-center font-semibold h-fit px-2
                                ${aspiration.status === 'Submitted' ? 'bg-gray-500/15 text-gray-600' :
                                    aspiration.status === 'Rejected' ? 'bg-red-500/15 text-red-600' :
                                        aspiration.status === 'Proccess' ? 'bg-amber-500/15 text-amber-600' :
                                            aspiration.status === 'Completed' ? 'bg-blue-500/15 text-blue-600' :
                                                ''
                                }`}>
                                {aspiration.status}
                            </span>
                            <p className='flex items-center text-gray-400'><GoDotFill size={10} /></p>
                            <p className='font-inter text-sm font-medium text-gray-400'>{dateCreated}</p>
                        </div>

                        <div className='font-inter px-4 py-4 bg-gray-400/20 rounded-xl mt-4'>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Pengirim</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed capitalize'>{aspiration.user.name}</span>
                            </div>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Judul</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed'>{aspiration.subject}</span>
                            </div>
                            <div className='flex my-2'>
                                <span className='w-32 font-bold text-gray-700 flex-shrink-0'>Deskripsi</span>
                                <span className='px-2'>:</span>
                                <span className='break-words text-gray-600 leading-relaxed line-clamp-2'>{aspiration.caption}</span>
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
                        </div>
                    </div>
                </div>

                <div className='col-span-8'>
                    <div className='bg-white rounded-lg shadow-lg py-3 px-2'>
                        <div>
                            <div className='flex gap-x-3'>
                                <Link href={`/admin/aspirations/${aspiration.id}`}>
                                    <PiArrowBendUpLeftBold size={25} className='text-indigo-500' />
                                </Link>
                                <h3 className='font-bold font-inter capitalize text-xl'>Form Respons untuk aspirasi {aspiration.user.name}</h3>
                            </div>

                            <div className='my-6'>
                                <form id='formRespon' onSubmit={submit} method='POST'>
                                    <div className='flex flex-col'>
                                        <label className='font-plus-jakarta font-semibold'>Perubahan Status</label>
                                        <select name="status" onChange={(e) => setData('status', e.target.value)} value={data.status} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200'>
                                            <option value="Submitted">Submitted</option>
                                            <option value="Proccess">Proccess</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label className='font-plus-jakarta font-semibold'>Caption</label>
                                        <textarea type="text" name="caption" onChange={(e) => setData("caption", e.target.value)} value={data.caption} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                        {errors.caption && (
                                            <p className='text-sm text-red-600 font-satoshi'>{errors.caption}</p>
                                        )}
                                    </div>

                                    <label className='font-plus-jakarta font-semibold'>Gambar</label>
                                    <div className='flex flex-col items-center justify-center w-full'>
                                        <label htmlFor='imageIn' className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 bg-gray-600/10 rounded-lg overflow-hidden mt-2 cursor-pointer'>

                                            {preview ? (
                                                <img src={preview} className='w-full h-full object-cover' />
                                            ) : (
                                                <div className='flex flex-col justify-center items-center'>
                                                    <div className='bg-blue-200 p-4 rounded-full border shadow-blue-300 shadow-sm duration-200'>
                                                        <FaUpload className='text-blue-600' />
                                                    </div>
                                                    <p className='text-lg font-inter font-semibold'>Upload Gambar</p>
                                                    <p className='text-[8px] font-inter font-light'>Mohon upload gambar dengan size max 2048mb</p>

                                                </div>
                                            )}
                                            <input type="file" className='hidden' accept='image/*' id="imageIn" onChange={handelPreview} />

                                        </label>
                                        {errors.photo && (
                                            <p className='text-sm text-red-600 font-satoshi'>{errors.photo}</p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Side>
    )
}

