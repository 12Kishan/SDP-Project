// 'use client'

import { Quiz } from '@/app/model/quiz';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    quiz: any
}

async function SharedQuiz({ quiz }: Props) {
    return (
        <>
            <div className="flex flex-col gap-y-3 p-4 mb-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-xl">{quiz.topic}</div>
                    <div className="font-base text-gray-400">{quiz.date?.getDate() + "/" + (quiz.date?.getMonth() + 1) + "/" + quiz.date?.getFullYear()}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="">{quiz.difficulty}</div>
                    <div className="">{quiz.questions.length}</div>
                </div>
                {
                    quiz.description ? (<div className="text-gray-400">
                        {quiz.description}
                    </div>) : <div className='text-gray-400'>
                            hello
                    </div>
                }
                <div className="flex items-center justify-between">
                    {/* <div className="">{quiz.timeTaken}</div> */}
                    <Link href={`/responses/${quiz._id}`} className='flex items-center justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700'>
                        <div className="">more</div>
                        <IoIosArrowForward />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SharedQuiz