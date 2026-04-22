import React, { useState } from "react";
import Side from "../Layout/Side";
import { Head, router, useForm } from "@inertiajs/react";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineRight } from "react-icons/ai";
import toast from "react-hot-toast";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

export default function Categories({ categories }) {
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        errors,
        process,
        reset,
    } = useForm({
        id: null,
        category_name: "",
    });

    const [open, setIsOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDel, setOpenDel] = useState(false);

    function submit(e) {
        e.preventDefault();
        post("/admin/categories", {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                toast.success("Berhasil menambahkan Category");
            },
            onError: () => {
                console.log(errors);
                toast.error("Gagal menambahkan Category");
            },
        });
    }

    function handelOpenEdit(cat) {
        setData({
            id: cat.id,
            category_name: cat.category_name,
        });
        setOpenEdit(true);
    }

    function handelOpenDel(cat) {
        setData({
            id: cat.id,
        });
        setOpenDel(true);
    }

    function handleEdit(e) {
        e.preventDefault();
        put(`/admin/categories/${data.id}`, {
            onSuccess: () => {
                setOpenEdit(false);
                reset();
            },
        });
    }

    function handleDes(e) {
        e.preventDefault();
        destroy(`/admin/categories/${data.id}`, {
            onSuccess: () => {
                setOpenDel(false);
            },
        });
    }

    function cancel() {
        setIsOpen(false);
        reset();
    }

    function cancelEdit() {
        setOpenEdit(false);
        reset();
    }

    function cancelDes() {
        setOpenDel(false);
        reset();
    }

    function handlePagination(url) {
        if (url)
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
    }

    return (
        <Side>
            <Head title="Categories" />
            <h5 className="text-lg font-plus-jakarta font-medium flex">
                Home <AiOutlineRight className="flex mt-[6px] text-lg" />
                <b>Categories</b>
            </h5>
            <h1 className="text-5xl font-bold font-plus-jakarta">
                Categories Overview
            </h1>
            <h1 className="font-plus-jakarta">
                Here's a list of the Categories
            </h1>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="bg-slate-900 px-2 flex font-plus-jakarta font-semibold rounded-md hover:bg-blue-500 hover:text-slate-900 text-white transition-all h-fit py-2"
                >
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow mt-2">
                {/* heade */}
                <div className="grid grid-cols-3 bg-gray-300 font-inter font-bold">
                    <h3 className="px-4 py-2">No</h3>
                    <h3 className="px-4 py-2">Name</h3>
                    <h3 className="px-4 py-2">Action</h3>
                    {/* <h3 className='px-4 py-2'>Action</h3> */}
                </div>

                {/* column */}
                <div>
                    {categories.data.map((cat, index) => (
                        <div
                            key={cat.id}
                            className="grid grid-cols-3 border-t place-items-start justify-around font-inter hover:bg-gray-200 transition-all"
                        >
                            <div className="px-4 py-4">{index + 1}</div>
                            <div className="px-4 py-4">{cat.category_name}</div>
                            <div className="px-4 py-4 flex ">
                                <button
                                    onClick={() => handelOpenEdit(cat)}
                                    className="bg-blue-500 px-2 py-2 font-plus-jakarta font-semibold rounded-l-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handelOpenDel(cat)}
                                    className="bg-red-500 px-2 py-2 font-plus-jakarta font-semibold rounded-r-lg"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pagination */}
            <div className="p-[15px]">
                <div className="flex justify-end">
                    {/* langusng ke firspage */}
                    <button
                        onClick={() =>
                            handlePagination(categories.first_page_url)
                        }
                        className="border px-4 py-2 duration-200 rounded-lg mx-[2px] bg-white hover:bg-gray-400 disabled:opacity-30 disabled:hover:cursor-not-allowed disabled:hover:bg-white"
                        disabled={categories.current_page === 1}
                    >
                        <ChevronsLeft />
                    </button>

                    {/* Nomot yang lain */}
                    {categories.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() => handlePagination(link.url)}
                            className={`border px-4 py-2 duration-200 rounded-lg mx-[2px] font-bold
                            ${link.active ? "bg-blue-500 text-white" : "bg-white text-gray-600"}
                            ${!link.url ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-400"}`}
                        >
                            {link.label.includes("Previous") ? (
                                <ChevronLeft />
                            ) : link.label.includes("Next") ? (
                                <ChevronRight />
                            ) : (
                                <span>{link.label}</span>
                            )}
                        </button>
                    ))}

                    {/* langusng ke lastpage */}
                    <button
                        onClick={() =>
                            handlePagination(categories.last_page_url)
                        }
                        className="border px-4 py-2 duration-200 rounded-lg mx-[2px] bg-white hover:bg-gray-400 disabled:opacity-30 disabled:hover:cursor-not-allowed disabled:hover:bg-white"
                        disabled={
                            categories.current_page === categories.last_page
                        }
                    >
                        <ChevronsRight />
                    </button>
                </div>
            </div>

            {open && (
                <div className="fixed bg-black/50 inset-0 backdrop-blur-sm flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl m-4 p-4">
                        <h1 className="font-plus-jakarta font-bold text-center text-[35px] mb-[20px] pt-4">
                            Form Tambah Kategori
                        </h1>
                        <form onSubmit={submit} method="POST">
                            <div className="flex flex-col my-2">
                                <label className="font-plus-jakarta font-semibold">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    name="category_name"
                                    value={data.category_name}
                                    onChange={(e) =>
                                        setData("category_name", e.target.value)
                                    }
                                    className="border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 "
                                />
                                {errors.category_name && (
                                    <p className="text-sm text-red-600 font-satoshi">
                                        {errors.category_name}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-x-4">
                                <button
                                    type="button"
                                    onClick={cancel}
                                    className="bg-red-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-sky-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openEdit && (
                <div className="fixed bg-black/50 inset-0 backdrop-blur-sm flex justify-center items-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl m-4 p-4">
                        <h1 className="font-plus-jakarta font-bold text-center text-[35px] mb-[20px] pt-4">
                            Form Edit Kategori
                        </h1>
                        <form onSubmit={handleEdit}>
                            <div className="flex flex-col my-2">
                                <label className="font-plus-jakarta font-semibold">
                                    Nama Kategori
                                </label>
                                <input
                                    type="text"
                                    name="category_name"
                                    value={data.category_name}
                                    onChange={(e) =>
                                        setData("category_name", e.target.value)
                                    }
                                    className="border-2 border-gray-400/50 rounded-lg p-1 focus:border-[#1CB3C8] outline-none duration-200 "
                                />
                            </div>
                            <div className="flex justify-end gap-x-4">
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="bg-red-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-sky-500 font-plus-jakarta font-bold px-2 py-2 text-white rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {openDel && (
                <div className="fixed bg-black/50 backdrop-blur-sm inset-0 flex justify-center items-center">
                    <div className="bg-white rounded-xl shadow p-6">
                        <form onSubmit={handleDes} method="POST">
                            <h3 className="text-2xl font-plus-jakarta font-bold">
                                Anda yakin ingin menghapusnya?
                            </h3>
                            <div className="flex justify-center items-center gap-4 px-3 py-2">
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-2 py-2 w-20 rounded-xl font-plus-jakarta font-semibold hover:bg-white hover:border-2 hover:text-black duration-300"
                                >
                                    Ya
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelDes}
                                    className="bg-white text-red-500 border-2 px-2 py-2 w-20 rounded-xl font-plus-jakarta font-semibold hover:bg-amber-500 hover:text-white duration-300 hover:border-white"
                                >
                                    Tidak
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Side>
    );
}
