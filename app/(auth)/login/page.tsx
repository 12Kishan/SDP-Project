'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false)
    // const [errors, setErrors] = useState<loginError>({})
    const [authState, setAuthState] = useState({
        email: '',
        password: ''
    })

    const googleSignin = async () => {
        await signIn('google', {
            callbackUrl: "/dashboard",
            redirect: true
        })
        // localStorage.setItem('email', authState?.email)
    }

    const submit = () => {
        setLoading(true)
        axios.post('/api/auth/login', authState)
            .then((res) => {
                setLoading(false)
                const response = res.data

                if (response.status == 200) {
                    signIn("credentials", {
                        email: authState.email,
                        password: authState.password,
                        callbackUrl: '/dashboard',
                        redirect: true
                    })
                } else if (response?.status == 400) {
                    for (const key in response.errors) {
                        if (response.errors.hasOwnProperty(key)) {
                            const errorMessage = response.errors[key].toLowerCase();
                            displayWarningToast(`${errorMessage}`);
                        }
                    }
                }
            })
            .catch((err) => {
                setLoading(false)
                displayErrorToast("Something went wrong")
            })
    }

    const displayErrorToast = (str: String) => {
        toast.error(str, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    const displayWarningToast = (str: String) => {
        toast.warning(str, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 sm:px-6 h-screen sm:py-16 lg:px-8 lg:py-24">
                <div className="bg-gray-900 rounded-3xl px-7 py-7 text-white" >
                    <div className="xl:mx-auto items-center xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            <Link href={"/"}>
                                <Image src="/logo.png" alt='logo' width={60} height={60} />
                            </Link>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400 ">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                title=""
                                className="font-semibold text-white transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-300">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email" onChange={(e) => { setAuthState({ ...authState, email: e.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-300">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <a href="#" title="" className="text-sm font-semibold text-white hover:underline">
                                            {' '}
                                            Forgot password?{' '}
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password" onChange={(e) => { setAuthState({ ...authState, password: e.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7 ${loading ? "bg-gray-500" : "bg-transparent"}`} onClick={submit}
                                    >
                                        {loading ? "Loading" : "Sign In"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className='mt-3 text-center text-white'>-- OR --</p>
                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center border-solid border-2 bg-white text-gray-900 rounded-full hover:bg-transparent px-3.5 py-2.5 font-semibold leading-7 hover:text-white"
                                onClick={googleSignin}
                            >
                                <span className="mr-2 inline-block">
                                    <svg
                                        className="h-6 w-6 text-rose-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                    </svg>
                                </span>
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
