"use client"
// Import necessary libraries and components
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Define the functional component 'page'
export default function page() {

    // State variables using the 'useState' hook
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<loginError>();

    // Function to handle form submission
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        // Send a POST request to the server to initiate password reset
        axios.post('/api/auth/forgot-password', { email: email })
            .then((res) => {
                setLoading(false);
                const response = res.data;

                // Handle different response statuses
                if (response.status == 200) {
                    // Display success toast if the request is successful
                    setLoading(false);
                    displaySuccessToast(response.message.toLowerCase());
                } else if (response.status == 400) {
                    // Display error toast and set errors if request fails due to bad data
                    setLoading(false);
                    setErrors(response.errors);
                    for (const key in response.errors) {
                        if (response.errors.hasOwnProperty(key)) {
                            const errorMessage = response.errors[key].toLowerCase();
                            displayWarningToast(`${errorMessage}`);
                        }
                    }
                } else if (response.status == 500) {
                    // Display warning toast if the request fails due to server error
                    setLoading(false);
                    displayWarningToast(response.message.toLowerCase());
                }
            })
            .catch((err) => {
                displayWarningToast(errors?.email?.toLowerCase());
                // Handle and log errors
                setLoading(false);
                console.log("the error is ", err);
            });
    }

    // Functions to display different types of toasts
    const displayErrorToast = (str: String) => {
        toast.error(str, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    const displayWarningToast = (str: String | undefined) => {
        toast.warning(str, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    const displaySuccessToast = (str: String) => {
        toast.success(str, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
    }

    // JSX structure for the component
    return (
        <>
            {/* Container for the main content */}
            <div className="flex items-center justify-center px-4 sm:px-6 h-screen sm:py-16 lg:px-8 lg:py-24">
                <div className="className= bg-gray-900 rounded-3xl px-7 py-7 text-white w-[400px]">
                    <div className="xl:mx-auto items-center xl:w-full xl:max-w-sm space-y-5 2xl:max-w-md">
                        <div className="mb-2 flex justify-center">
                            {/* Link to the home page */}
                            <Link href={"/"}>
                                <Image src="/logo.png" alt='logo' width={60} height={60} />
                            </Link>
                        </div>
                        <h1 className="text-center text-2xl font-bold leading-tight text-white">Forgot Password</h1>
                        <p className="mt-5 text-center text-gray-300">Enter your email and we&#39;ll send you a link to reset your password.</p>
                        <form method="GET">
                            <div>
                                {/* Input for entering email address */}
                                <label className="block mt-3 mb-2">Email</label>
                                <input
                                    className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Email address"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="mt-5 mb-5">
                                {/* Submit button */}
                                <button
                                    type="button"
                                    className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7`}
                                    disabled={loading}
                                    onClick={submit}
                                >
                                    {loading ? "Processing" : "Submit"}
                                </button>
                            </div>
                            <div className="mt-5 mb-5">
                                {/* Link to go back to the login page */}
                                <Link href={"/login"}>
                                    <button
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7 ${loading ? "bg-gray-500" : "bg-transparent"}`}
                                    >
                                        Back To Login
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Container for displaying toasts */}
            <ToastContainer />
        </>
    );
}
