import React, { useState } from 'react'
import Sides from '../Layout/Sides'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { IoIosArrowForward } from 'react-icons/io'
import { FaUpload } from 'react-icons/fa'
import { id } from 'date-fns/locale'
import { formatDistanceStrict } from 'date-fns'


export default function Aspirations({ aspirations, categories }) {
    const { data, setData, post, reset, errors } = useForm({
        subject: '',
        photo: null,
        location: '',
        urgency: '',
        caption: '',
        category_id: '',
    })

    const { search: initialSearch } = usePage().props
    const [search, setSearch] = useState(initialSearch || '')
    const [isOpen, setIsOpen] = useState(false)
    const [preview, setPreview] = useState(null)

    function handelPreview(e) {
        const file = e.target.files[0]
        setData('photo', file)

        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    function cancel() {
        setIsOpen(false)
        reset()
        setPreview(null)
    }

    function submit(e) {
        e.preventDefault()
        post('/student/aspiration', {
            forceFormData: true,
            onSuccess: () => {
                setIsOpen(false)
                reset()
                setPreview(null)
            }
        })
    }

    function handleSearch(e) {
        e.preventDefault()
        router.get('student/')
    }
    return (
        <Sides>
            <Head title='Aspirations' />

            <h5 className='text-lg font-plus-jakarta flex font-bold'>Home <IoIosArrowForward className='flex justify-center mt-2 mr-1 text-lg' /><b>Aspirations</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Home Overview</h1>
            <h1 className='font-plus-jakarta'>Let's see whats new on your dashboard</h1>

            <div className='mt-[40px] flex justify-end gap-2 mb-12'>
                <form onSubmit={handleSearch} className=''>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='outline-none p-2 rounded-md' />
                </form>
                <button className='bg-blue-700 px-2 py-2 rounded-md shadow-lg font-semibold hover:bg-white duration-200 text-white hover:text-black'
                    onClick={() => setIsOpen(true)}>Add Aspiration</button>
            </div>

            {/* tampilan */}
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                {aspirations.data.map((asp) => (
                    <div key={asp.id}>
                        <Link>

                            <div className='bg-white rounded-lg shadow-lg hover:-translate-y-3 px-2 py-2 duration-200'>
                                <div className='flex justify-center'>
                                    <img src={`/storage/${asp.photo}`} className='rounded-md' />
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <h2 className='font-inter text-lg font-bold'>{asp.subject}</h2>
                                    <span className={`rounded-full font-inter font-semibold px-2 h-fit border shadow-sm ${asp.status === 'Submitted' ? 'bg-gray-300 text-gray-600' :
                                        asp.status === 'Proccess' ? 'bg-amber-200 text-amber-600' :
                                            asp.status === 'Verified' ? 'bg-blue-300 text-blue-600' :
                                                asp.status === 'Complete' ? 'bg-green-200 text-green-600' :
                                                    ''
                                        }
                                `}
                                    >{asp.status}</span>
                                </div>
                                <p className='font-inter line-clamp-2 font-medium'>{asp.caption}</p>
                                <p className='font-inter text-[12px] text-end'>- {formatDistanceStrict(new Date(asp.created_at), new Date(), {
                                    addSuffix: true,
                                    locale: id
                                })}</p>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>

            {isOpen && (
                <div className='fixed bg-black/50 inset-0 backdrop-blur-sm flex justify-center items-center'>
                    <div className='bg-white rounded-lg w-2xl max-h-[90vh] overflow-y-auto m-4 p-4'>

                        <div className='flex justify-center items-center my-2'>
                            <h1 className='font-bold font-inter text-2xl'>Form Pengisian Lembar Aspirasi</h1>
                        </div>

                        <form onSubmit={submit} method='POST' className='mt-12'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Judul</label>
                                    <input type="text" name="subject" onChange={(e) => setData("subject", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                    {errors.subject && (
                                        <p className='text-sm text-red-600 font-satoshi'>{errors.subject}</p>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Status</label>
                                    <input type="text" name="status" value='Submitted' disabled className='border-2 border-gray-300 rounded-lg p-1 text-gray-400 cursor-not-allowed' />
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
                                    <label className='font-plus-jakarta font-semibold'>Tingkat Kepentingan</label>
                                    <select name="urgency" onChange={(e) => setData('urgency', e.target.value)} value={data.urgency} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200'>
                                        <option value="">Pilih tingkat kepentingan</option>
                                        <option value="low">Kecil</option>
                                        <option value="medium">Sedang</option>
                                        <option value="high">Tinggi</option>
                                        <option value="emergensy">Darurat</option>
                                    </select>
                                    {errors.urgency && (
                                        <p className='text-sm text-red-600 font-satoshi'>{errors.urgency}</p>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label className='font-plus-jakarta font-semibold'>Lokasi</label>
                                <textarea type="text" name="location" onChange={(e) => setData("location", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                {errors.location && (
                                    <p className='text-sm text-red-600 font-satoshi'>{errors.location}</p>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-plus-jakarta font-semibold'>Caption</label>
                                <textarea type="text" name="caption" onChange={(e) => setData("caption", e.target.value)} className='border-2 border-gray-300 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
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
                                <button type='submit' className='bg-blue-500 hover:bg-black font-plus-jakarta font-semibold hover:text-white px-2 py-2 rounded-lg duration-200'>Submit</button>
                                <button onClick={cancel} type='button' className='bg-red-500 hover:bg-black font-plus-jakarta font-semibold hover:text-white px-2 py-2 rounded-lg duration-200'>Cancel</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </Sides>
    )
}
