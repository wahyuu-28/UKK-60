import React, { useEffect, useState } from 'react'
import Sides from '../Layout/Sides'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { IoIosArrowForward } from 'react-icons/io'
import { FaUpload } from 'react-icons/fa'
import { id } from 'date-fns/locale'
import { formatDistanceStrict } from 'date-fns'
import toast from 'react-hot-toast'
import { MdSort } from 'react-icons/md'
import { AnimatePresence, motion } from 'motion/react'



const aspiContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
}

const aspiItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1, y: 0, transition: {
            type: 'spring',
            stiffness: 160,
            damping: 20
        }
    }
}

const backdropVariants = {
    invisible: { opacity: 0 },
    visible: { opacity: 1 }
}

const modalVariants = {
    invisible: {
        opacity: 0,
        scale: 0.75,
        y: -20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 300
        }
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 }
    }
}

export default function Aspirations({ aspirations, categories, filters }) {
    const { data, setData, post, reset, errors } = useForm({
        subject: '',
        photo: null,
        location: '',
        caption: '',
        category_id: '',
    })

    const { search: initialSearch } = usePage().props
    const [search, setSearch] = useState(initialSearch || '')
    const [isOpen, setIsOpen] = useState(false)
    const [openSort, setIsOpenSort] = useState(false)
    const [preview, setPreview] = useState(null)


    // liveSearch
    useEffect(() => {
        // debounce
        const filter = setTimeout(() => {
            router.get('/student/aspirations', {
                search: search,
                sort: filters.sort
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        }, 300)
        return () => clearTimeout(filter)
    }, [search])

    const updateFilters = (newParams) => {
        router.get('/student/aspirations',
            {
                search: search,
                sort: filters.sort,
                status: filters.status,
                category: filters.category,
                ...newParams
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true
            }
        )
    }

    function toggleSort(e) {
        e.preventDefault()
        setIsOpenSort(!openSort)
    }

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
        post('/student/aspirations', {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Berhasil membuat aspirasi baru!')
                setIsOpen(false)
                reset()
                setPreview(null)
            },
            onError: () => {
                console.log(errors)
                toast.error('Gagal membuat aspirasi baru!, mohon ikuti panduan')
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
            <h1 className='text-5xl font-bold font-plus-jakarta'>Aspirations Overview</h1>
            <h1 className='font-plus-jakarta'>Here is where you can see all your report.</h1>

            <div className='flex justify-end my-4'>
                <button className='bg-blue-700 px-2 py-2 font-inter rounded-md shadow-lg font-semibold hover:bg-white duration-200 border-2 text-white hover:text-black'
                    onClick={() => setIsOpen(true)}>Add Aspiration</button>
            </div>

            <form className='my-4' onSubmit={handleSearch}>
                <div className='flex justify-end gap-2'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search nama aspirasi ...' className='outline-none px-2 py-[6px] shadow-sm rounded-lg w-full border-2' />
                    <button onClick={toggleSort} className='bg-white rounded-lg border-2 shadow-sm px-2 py-2'><MdSort size={30} /></button>

                </div>
            </form>

            {/* tampilan */}
            <motion.div variants={aspiContainer} initial="hidden" animate="visible" viewport={{ once: true }} className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
                {aspirations.data.map((asp) => (
                    <motion.div variants={aspiItem} key={asp.id} className="h-full">
                        <Link href={`/student/aspirations/${asp.id}`} className="group">
                            <div className='bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 px-3 py-3 duration-300 h-full flex flex-col border border-gray-100'>

                                {/* Image Wrapper */}
                                <div className='overflow-hidden rounded-lg aspect-video bg-gray-100'>
                                    <img
                                        src={`/storage/${asp.photo}`}
                                        className='w-full h-full object-cover group-hover:scale-110 duration-500'
                                        alt={asp.subject}
                                    />
                                </div>

                                {/* Content */}
                                <div className='flex flex-col flex-grow mt-3'>
                                    <div className='flex justify-between items-start gap-2 mb-2'>
                                        <h2 className='font-inter text-lg font-bold leading-tight line-clamp-1'>{asp.subject}</h2>
                                        <span className={`rounded-full font-inter text-sm font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm border ${asp.status === 'Submitted' ? 'bg-gray-200 text-gray-600 border-gray-200' :
                                            asp.status === 'Process' ? 'bg-amber-200 text-amber-600 border-amber-200' :
                                                asp.status === 'Rejected' ? 'bg-red-200 text-red-600 border-red-200' :
                                                    asp.status === 'Completed' ? 'bg-blue-200 text-blue-600 border-green-200' : ''
                                            }`}>
                                            {asp.status}
                                        </span>
                                    </div>

                                    <p className='font-inter text-sm text-gray-600 line-clamp-3 mb-4 flex-grow'>
                                        {asp.caption}
                                    </p>

                                    {/* Footer Card */}
                                    <div className='pt-3 border-t border-gray-50 mt-auto'>
                                        <p className='font-inter text-[10px] text-gray-400 italic text-end'>
                                            {formatDistanceStrict(new Date(asp.created_at), new Date(), {
                                                addSuffix: true,
                                                locale: id
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={backdropVariants}
                        initial="invisible"
                        animate="visible"
                        exit="invisible"
                        className='fixed bg-black/50 inset-0 backdrop-blur-sm flex justify-center items-center'>
                        <motion.div
                            variants={modalVariants}
                            className='bg-white rounded-lg lg:w-[900px] md:w-[600px] max-h-[90vh] overflow-y-auto m-4 p-4'>

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

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {openSort && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className='absolute right-24 top-12 z-50'>
                        <div className='bg-white rounded-lg shadow-xl border-2 font-inter w-48 overflow-hidden'>
                            <div className='bg-gray-100 px-4 py-1 text-[10px] font-bold text-gray-500 uppercase'>Sort By</div>
                            <p onClick={() => updateFilters({ sort: 'name' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Name (A-Z)</p>
                            <p onClick={() => updateFilters({ sort: 'newest' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Newest</p>
                            <p onClick={() => updateFilters({ sort: 'oldest' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Oldest</p>

                            <div className='bg-gray-100 px-4 py-1 text-[10px] font-bold text-gray-500 uppercase'>Filter Status</div>
                            <p onClick={() => updateFilters({ status: 'Submitted' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Submitted</p>
                            <p onClick={() => updateFilters({ status: 'Process' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Process</p>
                            <p onClick={() => updateFilters({ status: 'Completed' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Completed</p>
                            <p onClick={() => updateFilters({ status: 'Rejected' })} className='px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm'>Rejected</p>

                            <div>
                                <div className='bg-gray-100 px-4 py-1 text-[10px] font-bold text-gray-500 uppercase'>Filter Kategori</div>
                                <select
                                    className='w-full text-xs border rounded-lg p-2 outline-none focus:ring-1 focus:ring-blue-500'
                                    value={filters.category || ''}
                                    onChange={(e) => updateFilters({ category: e.target.value })}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Tombol Reset */}
                            <p onClick={() => {
                                setSearch('');
                                router.get('/admin/aspirations', {}, { replace: true });
                                setIsOpenSort(false);
                            }} className='px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer text-sm font-bold'>Reset Filter</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </Sides>
    )
}
