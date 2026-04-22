import React, { useState } from 'react'
import Side from '../Layout/Side'
import { Head, useForm, Link } from '@inertiajs/react'
import { FaUser } from 'react-icons/fa6'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { FaEdit, FaPlus, FaTrashAlt, FaUpload } from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import { Plus } from 'lucide-react'
import Tracking from '../Components/Tracking'
import { LuMessageSquareText } from 'react-icons/lu'

export default function Detail({ aspiration, categories }) {
    const { data, setData, post, delete: destroy, errors, reset } = useForm({
        _method: 'put',
        subject: aspiration.subject,
        photo: null,
        status: aspiration.status,
        location: aspiration.location,
        urgency: aspiration.urgency,
        caption: aspiration.caption,
        category_id: aspiration.category_id,
    })

    const [editModal, editModalOpen] = useState(false)
    const [delModal, delModalOpen] = useState(false)
    const [preview, setPreview] = useState(false)

    function handelPreview(e) {
        const file = e.target.files[0]
        setData('photo', file)

        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    function edit(e) {
        e.preventDefault()
        post(`/admin/aspirations/${aspiration.id}`, {
            forceFormData: true,
            onSuccess: () => {
                editModalOpen(false)
                reset()
            }
        })
    }

    function handleDestroy(e) {
        e.preventDefault()
        destroy(`/admin/aspirations/${aspiration.id}`)
        delModalOpen(false)
    }

    function cancelEdit() {
        editModalOpen(false)
        reset()
    }

    function cancelDestroy() {
        delModalOpen(false)
        reset()
    }


    const dateCreated = format(new Date(aspiration.created_at), 'dd MMMM yyyy', { locale: id })

    return (
        <Side>
            <Head title={aspiration.subject} />
            <div className='grid grid-cols-12 gap-x-2 gap-y-4 p-3'>
                <div className='bg-white rounded-lg shadow-lg col-span-8 px-4 py-2'>
                    <div className='mb-2'>
                        <div className='flex justify-end'>
                            <Link href={'/admin/aspirations'}>
                                <Plus size={54} className='rotate-45 hover:text-red-500 hover:scale-90 duration-200' />
                            </Link>
                        </div>

                        <div className='font-inter px-4 py-4'>
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


                    <div className='flex justify-end items-center gap-x-4 px-4'>
                        <Link href={`/admin/response/${aspiration.id}`} className='flex px-2 py-2 items-center gap-x-1 font-bold font-plus-jakarta text-[#ff5b04]'><LuMessageSquareText size={15} className='text-center' /> Balas</Link>
                        <button onClick={() => editModalOpen(true)} className='text-[#0096c7] px-2 py-2 flex items-center gap-x-1 font-bold font-plus-jakarta'><FaEdit size={15} className='text-[#0096c7] text-center' />Edit</button>
                        <button onClick={() => delModalOpen(true)} className='text-[#ff4e45] px-2 py-2 flex items-center gap-x-1 font-bold font-plus-jakarta'><FaTrashAlt size={15} className='text-[#ff4e45] text-center' />Hapus</button>
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
                        <div className='grid grid-cols-2 gap-2'>
                            {aspiration.response.map((res, index) => (
                                res.photo && (
                                    <img
                                    key={index}
                                    src={`/storage/${res.photo}`}
                                    className='w-full h-24 object-cover rounded-md'
                                    />
                                )
                            ))}
                        </div>
                    ) : (
                        <p className='text-xs text-gray-400 italic text-center py-4'>Belum ada gambar feedback.</p>
                    )}
                    </div>
                </div>

                {/* gambar */}
                <div className='bg-white rounded-lg shadow-lg col-span-8 px-4 py-6'>
                    <img src={`/storage/${aspiration.photo}`} className='rounded-lg object-contain w-full h-96' />
                </div>
            </div>


            {editModal && (
                <div className={`absolute inset-0 backdrop-blur-sm flex justify-center items-center transition-colors
                ${editModal ? 'visible bg-black/50' : 'invisible'}
                `}>
                    <div className={`bg-white rounded-lg lg:w-[900px] md:w-[600px] max-h-[90vh] overflow-y-auto m-4 p-4 transition-all
                        ${editModal ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
                        `}>

                        <div className='flex justify-center items-center my-2'>
                            <h1 className='font-bold font-inter text-2xl'>Form Pengisian Lembar Aspirasi</h1>
                        </div>

                        <form onSubmit={edit} className='mt-12'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Judul</label>
                                    <input type="text" value={data.subject} name="subject" onChange={(e) => setData("subject", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                    {errors.subject && (
                                        <p className='text-sm text-red-600 font-satoshi'>{errors.subject}</p>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Status</label>
                                    <select name="status" onChange={(e) => setData('status', e.target.value)} value={data.status} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200'>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Process">Process</option>
                                        <option value="Rejected">Rejected</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-plus-jakarta font-semibold'>Kategori</label>
                                <select name="category_id" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200'>
                                    <option value='' disabled>Pilih Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} >{cat.category_name}</option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className='text-sm text-red-600 font-satoshi'>{errors.category_id}</p>
                                )}
                            </div>

                            <div className='flex flex-col'>
                                <label className='font-plus-jakarta font-semibold'>Lokasi</label>
                                <textarea type="text" value={data.location} name="location" onChange={(e) => setData("location", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                {errors.location && (
                                    <p className='text-sm text-red-600 font-satoshi'>{errors.location}</p>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-plus-jakarta font-semibold'>Caption</label>
                                <textarea type="text" value={data.caption} name="caption" onChange={(e) => setData("caption", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                {errors.caption && (
                                    <p className='text-sm text-red-600 font-satoshi'>{errors.caption}</p>
                                )}
                            </div>

                            <div className='flex flex-col items-center justify-center w-full'>
                                <label htmlFor='imageIn' className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300  rounded-lg overflow-hidden mt-2 cursor-pointer'>

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

                            {/* Button */}
                            <div className='flex justify-end mt-4 gap-2'>
                                <button onClick={cancelEdit} type='button' className='bg-red-500 hover:bg-black font-plus-jakarta font-semibold hover:text-white px-2 py-2 rounded-lg duration-200'>Cancel</button>
                                <button type='submit' className='bg-blue-500 hover:bg-black font-plus-jakarta font-semibold hover:text-white px-2 py-2 rounded-lg duration-200'>Submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}


            {delModal && (
                <div className='fixed bg-black/50 backdrop-blur-sm inset-0 flex justify-center items-center'>
                    <div className='bg-white rounded-xl shadow p-6'>
                        <form onSubmit={handleDestroy} method='POST'>
                            <h3 className='text-2xl font-plus-jakarta font-bold'>Anda yakin ingin menghapusnya?</h3>
                            <div className='flex justify-center items-center gap-4 px-3 py-2'>
                                <button type='submit' className='bg-red-500 text-white px-2 py-2 w-20 rounded-xl font-plus-jakarta font-semibold hover:bg-white hover:border-2 hover:text-black duration-300'>Ya</button>
                                <button type='button' onClick={cancelDestroy} className='bg-white text-red-500 border-2 px-2 py-2 w-20 rounded-xl font-plus-jakarta font-semibold hover:bg-amber-500 hover:text-white duration-300 hover:border-white'>Tidak</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Side>
    )
}
