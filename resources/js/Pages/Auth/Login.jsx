import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import LoginIlustration from "../../assets/Seminar-amico.svg";
import { MdEmail } from "react-icons/md";
import { IoMdEye, IoMdEyeOff, IoMdLock } from "react-icons/io";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const [password, setPassword] = useState(false)

    function submit(e) {
        e.preventDefault();
        post("/login");
    }
    return (

        <div className="min-h-screen flex relative justify-center mr-96">
            <Head title="Login" />


            <div className="hidden lg:flex w-8/12 items-center justify-center">
                <img
                    src={LoginIlustration}
                    alt="Login Ilustration"
                    className=" w-[500px]"
                />
            </div>

            <div className="fixed right-0 top-0 h-screen w-96 lg:w-1/3 bg-white shadow-xl flex flex-col justify-center">
                <div clas>
                    <div className="flex flex-col justify-center items-center pb-16">
                        <h1 className="font-bold font-inter text-center text-[4rem]">
                            Sign In
                        </h1>
                        <p className="font-inter text-center">
                            Please enter your details to access your account.
                        </p>
                    </div>
                    <form className="flex flex-col" onSubmit={submit}>
                        <div className="flex flex-col items-center gap-5">
                            <div className="relative flex items-center justify-center mb-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="   "
                                    id="email"
                                    className="peer border-2 outline-none focus:border-[#1CB3C8] border-gray-300 bg-inherit w-80 rounded-xl px-3 py-2"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {/* <p className="invisible peer-invalid:visible">Please input valid email</p> */}
                                <label className="font-plus-jakarta opacity-40 absolute left-4 text-lg tracking-wide duration-200 pointer-events-none
                                peer-focus:font-semibold peer-focus:opacity-100 peer-focus:text-sm peer-focus:text-[#1CB3C8]
                                peer-focus:-translate-y-8 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:opacity-40 peer-placeholder-shown:text-lg
                                peer-[:not(placeholder-shown)]:-translate-y-8 peer-[:not(placeholde-shown)]:opacity-100 peer-[:not(placeholde-shown)]:font-semibold peer-[:not(placeholde-shown)]:text-sm">
                                    Email
                                </label>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <input
                                    type={password ? 'text' : 'password'}
                                    name="password"
                                    placeholder="  "
                                    className="peer border-2 outline-none focus:border-[#1CB3C8] border-gray-300 bg-inherit w-80 rounded-xl px-3 py-2"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <label className="font-plus-jakarta opacity-40 absolute left-4 text-lg tracking-wide duration-200 pointer-events-none flex items-center gap-[5px]
                                peer-focus:font-semibold peer-focus:opacity-100 peer-focus:text-sm peer-focus:text-[#1CB3C8]
                                peer-focus:-translate-y-8 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:opacity-40 peer-placeholder-shown:text-lg
                                peer-[:not(placeholder-shown)]:-translate-y-8 peer-[:not(placeholde-shown)]:opacity-100 peer-[:not(placeholder-shown)]:font-semibold peer-[:not(placeholde-shown)]:text-sm">
                                    Password
                                </label>
                                <button type="button" onClick={() => setPassword(!password)} className="absolute right-3 text-gray-500 focus:outline-none hover:text-[#1CB3C8] transition-all">
                                    {password ? (
                                        <IoMdEyeOff size={22} />
                                    ) : (
                                        <IoMdEye size={22} />
                                    )}
                                </button>
                            </div>

                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn bg-black rounded-xl hover:bg-white w-full border font-plus-jakarta border-black hover:text-black transition-all px-2 py-2 text-white mx-16"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
