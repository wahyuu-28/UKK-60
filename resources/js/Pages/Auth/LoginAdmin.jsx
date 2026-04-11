import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import LoginIlustration from "../../assets/Seminar-amico.svg";
import { MdEmail } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";

export default function LoginAdmin() {
    const { data, setData, post, processing, errors } = useForm({
        nip: "",
        password: "",
    });

    const [password, setPassword] = useState(false)

    function submit(e) {
        e.preventDefault();
        post("/login/admin");
    }
    return (

        <div className="min-h-screen flex relative justify-center bg-gray-500/30 lg:mr-96">
            <Head title="Login" />


            <div className="hidden lg:flex w-8/12 items-center justify-center">
                <img
                    src={LoginIlustration}
                    alt="Login Ilustration"
                    className=" w-10/12"
                />
            </div>

            <div className="fixed inset-0 lg:left-auto lg:right-0 h-screen w-full lg:w-96 bg-slate-900 shadow-xl flex flex-col justify-center px-4">
                <div>
                    <div className="flex flex-col justify-center items-center pb-16">
                        <h1 className="font-bold font-inter text-center text-[4rem] text-white">
                            Sign In
                        </h1>
                        <p className="font-inter text-center text-white">
                            Hallo admin, please enter your details to access your account.
                        </p>
                    </div>
                    <form className="flex flex-col" onSubmit={submit} noValidate>
                        <div className="flex flex-col items-center gap-5">
                            <div className="relative flex flex-col justify-center mb-2">
                                <input
                                    type="text"
                                    name="nip"
                                    placeholder="   "
                                    id="nip"
                                    className={`peer border-2 outline-none focus:border-[#1CB3C8] bg-inherit w-80 rounded-xl px-3 py-2 text-white ${errors.nip ? 'border-red-500' : 'border-gray-300'}`}
                                    value={data.nip}
                                    onChange={(e) =>
                                        setData("nip", e.target.value)
                                    }
                                />
                                {/* <p className="invisible peer-invalid:visible">Please input valid email</p> */}
                                <label className="font-plus-jakarta opacity-40 absolute left-4 top-2 text-lg tracking-wide duration-200 pointer-events-none text-white
                                peer-focus:font-semibold peer-focus:opacity-100 peer-focus:text-sm peer-focus:text-[#1CB3C8]
                                peer-focus:-translate-y-8 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:opacity-40 peer-placeholder-shown:text-lg
                                peer-[:not(placeholder-shown)]:-translate-y-8 peer-[:not(placeholde-shown)]:opacity-100 peer-[:not(placeholde-shown)]:font-semibold peer-[:not(placeholde-shown)]:text-sm">
                                    NIP
                                </label>
                                {errors.nip && (
                                    <p className="text-red-600 font-inter font-medium text-start text-sm px-2">{errors.nip}</p>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <div className="relative flex flex-col justify-center">
                                    <input
                                        type={password ? 'text' : 'password'}
                                        name="password"
                                        placeholder="  "
                                        className={`peer border-2 outline-none focus:border-[#1CB3C8] bg-inherit w-80 rounded-xl px-3 py-2 text-white ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <label className="font-plus-jakarta absolute left-4 top-2 text-lg tracking-wide duration-200 pointer-events-none flex items-center gap-[5px] text-white
                                peer-focus:font-semibold peer-focus:opacity-100 peer-focus:text-sm peer-focus:text-[#1CB3C8]
                                peer-focus:-translate-y-8 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:opacity-40 peer-placeholder-shown:text-lg
                                peer-[:not(placeholder-shown)]:-translate-y-8 peer-[:not(placeholde-shown)]:opacity-100 peer-[:not(placeholder-shown)]:font-semibold peer-[:not(placeholde-shown)]:text-sm">
                                        Password
                                    </label>
                                    <button type="button" onClick={() => setPassword(!password)} className="absolute right-3 text-white hover:text-[#1CB3C8] transition-all">
                                        {password ? (
                                            <IoMdEyeOff size={22} />
                                        ) : (
                                            <IoMdEye size={22} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-600 font-inter font-medium text-start text-sm px-2">{errors.password}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center mt-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-white rounded-xl hover:bg-gray-500/30 lg:w-full sm:w-[300px] border font-plus-jakarta font-bold border-white hover:text-white transition-all px-2 py-2 text-black mx-16"
                            >
                                Login
                            </button>
                            <p className="font-inter text-white">Anda adalah siswa?. <a href="/login/student" className="text-blue-500">Klik disni</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
