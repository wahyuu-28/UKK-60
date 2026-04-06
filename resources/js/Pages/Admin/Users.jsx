import React, { useEffect, useState } from 'react'
import Side from '../Layout/Side'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { MdAdd } from 'react-icons/md'
import { IoIosArrowForward } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { GrFormNext, GrFormPrevious, GrPrevious } from "react-icons/gr";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { AiOutlineRight } from 'react-icons/ai'

export default function Users({ users }) {

    const { search: initialSearch } = usePage().props
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'student',
        grade: '',
        NIS: '',
        NIP: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState(initialSearch || '')

    // liveSearch
    useEffect(() => {
        const filter = setTimeout(() => {
            router.get('/admin/users', {
                search: search
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            })
        }, 300)
        return () => clearTimeout(filter)
    }, [search])

    function handleSearch(e) {
        e.preventDefault()
        router.get('/admin/users', { search }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        })
    }

    function submit(e) {
        e.preventDefault()
        post('/admin/users', {
            onSuccess: () => {
                setIsOpen(false)
                reset()
            }
        })
    }

    function cancel() {
        setIsOpen(false)
        reset()
    }

    // console.log(users)
    function handlePagination(url) {
        if (url) router.visit(url, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <Side>
            <Head title='Users' />
            <h5 className='text-lg font-plus-jakarta font-medium flex'>Home <AiOutlineRight className='flex mt-[6px] text-lg' /><b>Users</b></h5>
            <h1 className='text-5xl font-bold font-plus-jakarta'>Users Overview</h1>
            <h1 className='font-plus-jakarta'>Here's a list of the user for you</h1>


            <div className='flex items-center w-full gap-4'>
                <div className='flex-1'>
                    {/* Search */}
                    <form className='flex items-center' onSubmit={handleSearch}>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='rounded-lg outline-none shadow-sm border-2 py-[6px] px-2 w-full' placeholder='Find by email or name...' />
                    </form>
                </div>

                {/* Add */}
                <button className='bg-slate-900 px-2 flex font-plus-jakarta font-semibold rounded-md hover:bg-blue-500 hover:text-slate-900 text-white transition-all h-fit py-2'
                    onClick={() => setIsOpen(true)}><MdAdd className='flex justify-center mt-1 mr-1 text-xl' />Add User</button>
            </div>


            <div className='bg-white rounded-lg overflow-hidden shadow mt-8'>
                {/* heade */}
                <div className='grid grid-cols-4 bg-gray-300 font-inter font-bold'>
                    <h3 className='px-4 py-2'>No</h3>
                    <h3 className='px-4 py-2'>Username</h3>
                    <h3 className='px-4 py-2'>Email</h3>
                    <h3 className='px-4 py-2'>Role</h3>
                    {/* <h3 className='px-4 py-2'>Action</h3> */}
                </div>

                {/* column */}
                <div>
                    {users.data.map((user, index) => (
                        <div key={user.id} className='grid grid-cols-4 border-t place-items-start justify-around font-inter hover:bg-gray-200 transition-all'>
                            <div className='px-4 py-4'>
                                {index + 1}
                            </div>
                            <div className='px-4 py-4'>
                                {user.name}
                            </div>
                            <div className='px-4 py-4'>
                                {user.email}
                            </div>
                            <div className='px-4 py-4 font-semibold'>
                                <span className={`px-4 py-2 rounded-full
                                ${user.role === 'admin' && 'rounded-full border capitalize bg-blue-100 text-blue-600'}
                                ${user.role === 'student' && 'rounded-full capitalize border bg-green-100 text-green-600'}
                                `}>
                                    {user.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className='p-[15px]'>
                <div className='flex justify-end'>
                    {/* langusng ke firspage */}
                    <button onClick={() => handlePagination(users.first_page_url)}
                        className='border px-4 py-2 duration-200 rounded-lg mx-[2px] bg-white hover:bg-gray-400 disabled:opacity-30 disabled:hover:cursor-not-allowed disabled:hover:bg-white' disabled={users.current_page === 1}>
                        <ChevronsLeft />
                    </button>

                    {/* Nomot yang lain */}
                    {users.links.map((link, idx) => (
                        <button key={idx} disabled={!link.url} onClick={() => handlePagination(link.url)}
                            className={`border px-4 py-2 duration-200 rounded-lg mx-[2px] font-bold
                            ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}
                            ${!link.url ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-400'}`}>
                            {link.label.includes('Previous') ? (
                                <ChevronLeft />
                            ) : link.label.includes('Next') ? (
                                <ChevronRight />
                            ) : (
                                <span>{link.label}</span>
                            )}
                        </button>
                    ))}

                    {/* langusng ke lastpage */}
                    <button onClick={() => handlePagination(users.last_page_url)}
                        className='border px-4 py-2 duration-200 rounded-lg mx-[2px] bg-white hover:bg-gray-400 disabled:opacity-30 disabled:hover:cursor-not-allowed disabled:hover:bg-white' disabled={users.current_page === users.last_page}>
                        <ChevronsRight />
                    </button>
                </div>
            </div>

            {isOpen && (
                // ini buat bg
                <div className='fixed bg-black/50 inset-0 backdrop-blur-sm flex justify-center items-center p-4'>
                    {/* ini buat card */}
                    <div className='bg-white rounded-lg w-full max-w-2xl m-4 p-4'>
                        <h1 className='text-center font-bold font-plus-jakarta text-[35px] mb-[20px] pt-4'>Please Input User Data</h1>
                        {/* ini formnya */}
                        <form onSubmit={submit} method='POST'>
                            <div className='flex flex-col mx-4 my-4 gap-4'>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Username</label>
                                    <input type="text" name="name" value={data.name} onChange={(e) => setData("name", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Email</label>
                                    <input type="email" name="email" value={data.email} onChange={(e) => setData("email", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='fon2t-plus-jakarta font-semibold'>Password</label>
                                    <input type="text" name="password" value={data.password} onChange={(e) => setData("password", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold text-gray-400'><i>Role</i></label>
                                    <input type="text" name="role" disabled value={'student'} onChange={(e) => setData("role", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>

                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>NIS</label>
                                    <input type="text" name="NIS" value={data.NIS} onChange={(e) => setData("NIS", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-plus-jakarta font-semibold'>Grade</label>
                                    <input type="text" name="grade" value={data.grade} onChange={(e) => setData("grade", e.target.value)} className='border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 ' />
                                </div>
                            </div>

                            <div className='flex justify-end gap-x-4'>
                                <button type='submit' disabled={processing} className='bg-sky-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg'>Save</button>
                                <button type='button' onClick={cancel} className='bg-red-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg'>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Side>
    )
}

