import React, { useEffect, useState } from 'react'
import Side from '../Layout/Side'
import { IoIosArrowForward } from 'react-icons/io'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { formatDistanceStrict } from 'date-fns'
import { id } from 'date-fns/locale'
import { AiOutlineRight } from 'react-icons/ai'
import { MdSort } from 'react-icons/md'

export default function Aspirations({ aspirations, categories, filters }) {
    const { search: initialSearch } = usePage().props
    const [openSort, setIsOpenSort] = useState(false)
    const [search, setSearch] = useState(initialSearch || '')

    // liveSearch
    useEffect(() => {
        // debounce
        const filter = setTimeout(() => {
            router.get('/admin/aspirations', {
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
        router.get('/admin/aspirations',
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

    function handleSearch(e) {
        e.preventDefault()
        router.get('/admin/aspirations', { search }, {
            preserveScroll: true,
            preserveState: true,
            replace: true
        })
    }

    return (
        <Side>
            <Head title='Aspirations' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <AiOutlineRight className='flex mt-[6px] text-lg' /><b>Aspirations</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Aspirations Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of Aspirations</h1>

            <form className='mt-4' onSubmit={handleSearch}>
                <div className='flex justify-end gap-2'>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search nama aspirasi ...' className='outline-none px-2 py-[6px] shadow-sm rounded-lg w-full border-2' />
                    <button onClick={toggleSort} className='bg-white rounded-lg border-2 shadow-sm px-2 py-2'><MdSort size={30} /></button>

                </div>
            </form>
            <div className='grid grid-cols-3 gap-3 my-8 justify-center items-stretch'>
                {aspirations.data.map((asp) => (
                    <div key={asp.id} className='h-full'>
                        <Link href={`/admin/aspirations/${asp.id}`} className='h-full block'>
                            <div className='bg-white border border-slate-200 rounded-xl flex flex-col hover:-translate-y-2 hover:shado w-xl h-full shadow-md px-2 py-2 duration-300'>

                                <div className='flex justify-end mb-2'>
                                    <span className={`text-xs font-inter rounded-full px-3 py-1 font-semibold
                                    ${asp.status === 'Submitted' ? 'bg-gray-500/15 text-gray-600' :
                                        asp.status === 'Rejected' ? 'bg-red-500/15 text-red-600' :
                                        asp.status === 'Process' ? 'bg-amber-500/15 text-amber-600' :
                                        asp.status === 'Completed' ? 'bg-blue-500/15 text-blue-600' : ''
                                        }`}>
                                        {asp.status}
                                    </span>
                                </div>

                                <div className='flex-grow'>

                                <h1 className='font-inter font-semibold capitalize line-clamp-1 text-2xl'>
                                    {asp.subject}
                                </h1>
                                <p className='font-inter font-medium text-gray-500 line-clamp-2'>{asp.caption}</p>
                                </div>
                                <p className='font-inter text-[10px] text-end italic text-gray-400'>{formatDistanceStrict(new Date(asp.created_at), new Date(), {
                                    addSuffix: true,
                                    locale: id
                                })}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {openSort && (
                <div className='absolute right-24 top-12 z-50'>
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
                </div>
            )}
        </Side>
    )
}

