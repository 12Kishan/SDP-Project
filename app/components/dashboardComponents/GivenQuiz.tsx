'use client'
import { Quiz } from '@/app/model/quiz';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    quiz: any
}

function GivenQuiz({ quiz }: Props) {

    const [mainQuiz, setMainQuiz] = useState({
        _id:'',
        userId: '',
        shared: false,
        topic: '',
        type: 'mcq',
        difficulty: 'easy',
        questions: [],
    })
    useEffect(() => {
        const fetchData = async () => {
            const res = await Quiz.findOne({ _id: quiz.id })
            setMainQuiz({...res})
        }
        fetchData()
    },[])
    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="font-semibold text-xl">{mainQuiz.topic}</div>
                <div className="font-base text-gray-400">{quiz.timeStarted?.getDate() + "/" + (quiz.timeStarted?.getMonth() + 1) + "/" + quiz.timeStarted?.getFullYear()}</div>
            </div>
            <div className="mt-5  flex items-center justify-between">
                <div className="">{mainQuiz.difficulty}</div>
                <div className="">{mainQuiz.questions.length}</div>
            </div>
            <div className="mt-5 flex items-center justify-between">
                <div className="">{quiz.timeTaken}</div>
                <Link href='/statistics/[userId]/[quizId]' as={`/statistics/${quiz.userId}/${mainQuiz._id}`} className='flex items-center justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700'>
                    <div className="">more</div>
                    <IoIosArrowForward />
                </Link>
            </div>
        </div>
    )
}

export default GivenQuiz