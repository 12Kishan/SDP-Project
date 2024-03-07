'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { passwordStrength } from 'check-password-strength'
import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Register() {

    const router = useRouter()

    {/* States */ }
    const [loading, setLoading] = useState<boolean>(false)
    // const [errors, setErrors] = useState<registerError>({})
    const [authState, setAuthState] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    {/* Functions */ }
    const googleSignin = async () => {
        await signIn('google', {
            callbackUrl: "/",
            redirect: true
        })
        localStorage.setItem('email', authState?.email)
    }

    const onPasswordChange = (e: any) => {
        setAuthState({ ...authState, password: e.target.value })
        setPassword(e.target.value)
    }

    useEffect(() => {
        if (password)
            setMessage(passwordStrength(password).value)
    }, [password])

    const submit = async () => {
        setLoading(true)
        if (message === 'Strong') {
            // try {
            //     const response = await fetch('/api/auth/register', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(authState),
            //     });

            //     const responseData = await response.json();
            //     setLoading(false);

            //     if (response.ok) {
            //         displaySuccessToast(responseData.data.message?.toLowerCase());
            //         setTimeout(() => {
            //             router.push(`/login`);
            //         }, 1000);
            //     } else if (response.status == 400) {
            //         for (const key in responseData.errors) {
            //             if (responseData.errors.hasOwnProperty(key)) {
            //                 const errorMessage = responseData.errors[key].toLowerCase();
            //                 displayWarningToast(`${errorMessage}`);
            //             }
            //         }
            //     }
            // } catch (err) {
            //     setLoading(false);
            //     displayErrorToast("Something went wrong");
            // }
            await axios.post('/api/auth/register', authState)
                .then((res) => {
                    setLoading(false)
                    const response = res.data
                    if (response.status == 200) {
                        displaySuccessToast(response.message?.toLowerCase())
                        setTimeout(() => {
                            router.push(`/login`)
                        }, 1000);
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

        } else {
            setLoading(false)
            displayWarningToast('Use strong password')
        }
    }

    const displayErrorToast = (str: string) => {
        toast.error(str, {
            style: {
                border: '2px solid #111827',
                padding: '16px',
                color: '#fff',
                background: 'red'
            },
            iconTheme: {
                primary: 'white',
                secondary: 'red',
            },
        })
    }

    const displayWarningToast = (str: string) => {
        toast.error(str, {
            style: {
                border: '2px solid #111827',
                padding: '16px',
                color: '#fff',
                background: 'red'
            },
            iconTheme: {
                primary: 'white',
                secondary: 'red',
            },
        })
    }

    const displaySuccessToast = (str: string) => {
        toast.success(str, {
            style: {
                border: '2px solid #111827',
                padding: '16px',
                color: '#fff',
                background: 'green'
            },
            iconTheme: {
                primary: 'white',
                secondary: 'green',
            },
        })
    }

    return (
        <section className='bg-gray-700'>
            <div className="flex items-center justify-center px-4 sm:px-6 h-screen sm:py-16 lg:px-8 lg:py-24">
                <div className="bg-gray-900 rounded-3xl px-7 py-7" text-white>
                    <div className="xl:mx-auto items-center xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            <Link href={"/"}>
                                <Image src="/logo.png" alt='logo' width={60} height={60} />
                            </Link>
                        </div>
                        <h2 className="text-center text-2xl font-bold leading-tight text-white">
                            Create new account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400 ">
                            already have an account?{' '}
                            <Link
                                href="/login"
                                title=""
                                className="font-semibold text-white transition-all duration-200 hover:underline"
                            >
                                Login to your account
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-5">
                            <div className="space-y-2">
                                <div>
                                    <label htmlFor="" className="text-sm font-medium text-gray-300">
                                        Username
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username" onChange={(e) => { setAuthState({ ...authState, name: e.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-sm font-medium text-gray-300">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => { setAuthState({ ...authState, email: e.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-sm font-medium text-gray-300">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        {/* Justified here */}
                                        <span className='text-gray-400 text-xs'>{message ? `Password is ${message.toLowerCase()}` : ''}</span>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={password}
                                            type="password"
                                            placeholder="Password"
                                            onChange={onPasswordChange}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-sm font-medium text-gray-300">
                                            {' '}
                                            Confirm Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Re-type your password"
                                            onChange={(e) => { setAuthState({ ...authState, password_confirmation: e.target.value }) }}
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className={`inline-flex w-full mt-1.5 items-center justify-center border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7 text-white 
                                        ${loading ? "bg-gray-500" : "bg-transparent"}`}
                                        onClick={submit}
                                    >
                                        {loading ? "Loading" : "Sign Up"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center border-solid border-2 bg-white text-gray-900 rounded-full hover:bg-transparent px-3.5 py-2.5 mt-0.5 font-semibold leading-7 hover:text-white"
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
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </section>
    )
}
/*

await axios.post('/api/auth/register', authState)
                .then((res) => {
                    setLoading(false)
                    const response = res.data
                    if (response.status == 200) {
                        displaySuccessToast(response.message?.toLowerCase())
                        setTimeout(() => {
                            router.push(`/login`)
                        }, 1000);
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


*/