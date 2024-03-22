'use client'

import { DashboardLayout } from '@/app/dashboard/Layout'
import { TagsInput } from "react-tag-input-component";
import React, { useState } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Props = {
    params: {
        quizId: string
    }
}

export default function Page({ params: { quizId } }: Props) {
    const [mail, setMail] = useState<string[]>([])
    const [link, setLink] = useState<string>(`https://sdp-project-1.vercel.app/take-quiz/mcq/${quizId}`)
    const { data } = useSession()
    const [loading, setLoading] = useState(false)

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                toast.success('Link copied to clipboard', {
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
            })
            .catch((error) => {
                toast.error("Failed to copy link", {
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
            });
    };

    const handleSendEmails = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/email', {
                emails: mail,
                url: link,
                username: data?.user.name
            })
            const status = res.data.status
            if (status == 200) {
                toast.success('Mail send successfully', {
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
            } else if (status == 400) {
                toast.error("Please enter valid emails only", {
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
            } else {
                throw new Error()
            }
        } catch (e) {
            toast.error("Something went wrong", {
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
        } finally {
            setLoading(false)
        }
    };

    return (
        <DashboardLayout title='Share quiz'>
            <div className="rounded-3xl text-white flex flex-col h-full gap-y-6 bg-gray-800 p-6 lg:w-full">
                <div className="bg-gray-900 p-6 rounded-xl">
                    <div className="font-bold text-2xl">Share via link</div>
                    <div className="flex items-center justify-center gap-x-4">
                        <div className="w-fit flex justify-center">
                            <input
                                type="text"
                                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-s-lg focus:outline-none"
                                placeholder="Enter link here"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                readOnly
                            />
                            <button
                                className="bg-gray-800 p-3 hover:bg-gray-700 rounded-e-lg"
                                onClick={handleCopyLink}
                            >
                                <FaRegCopy />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl">
                    <div className="font-bold text-2xl">Send link to mail</div>
                    <div className="flex justify-center">
                        <div className="bg-gray-800 m-5 rounded-lg p-6 max-w-2xl flex flex-col items-center gap-y-4">
                            <TagsInput
                                classNames={{
                                    input: "flex-1 text-black font-bold focus:outline-none",
                                    tag: "text-black font-semibold px-2 py-1 rounded-full mr-2"
                                }}
                                value={mail}
                                onChange={setMail}
                                name="mails"
                                placeHolder="Enter valid email addresses"
                                separators={[' ', ',', 'Enter']}
                            />
                            <button
                                className="flex items-center text-center justify-center bg-gray-900 p-3 rounded-md hover:bg-gray-700 text-white disabled:bg-gray-700"
                                onClick={handleSendEmails}
                                disabled={loading ? true : false}
                            >
                                {loading ? "Please wait" : 'Send Mail'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </DashboardLayout>
    )
}