
import { Quiz } from '@/app/model/quiz';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";

type Props = {
    quizuser: any
}

async function GivenQuiz({ quizuser }: Props) {
    
    const mainQuiz = await Quiz.findById({ _id: quizuser.quizId })
    // const [fetched, setFetched] = useState(false)
    // const [mainQuiz, setMainQuiz] = useState({
    //     _id: '',
    //     userId: '',
    //     shared: false,
    //     topic: '',
    //     type: 'mcq',
    //     difficulty: 'easy',
    //     questions: [],
    // })
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await Quiz.findById({ _id: quiz.id })
    //         setMainQuiz({ ...res })
    //         setFetched(true)
    //     }
    //     fetchData()
    //     console.log('given ');

    // }, [])
    return (
        <>
            <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="font-semibold text-xl">{mainQuiz.topic}</div>
                    <div className="font-base text-gray-400">{quizuser.timeStarted?.getDate() + "/" + (quizuser.timeStarted?.getMonth() + 1) + "/" + quizuser.timeStarted?.getFullYear()}</div>
                </div>
                <div className="mt-5  flex items-center justify-between">
                    <div className="">{mainQuiz.difficulty}</div>
                    <div className="">{mainQuiz.questions.length}</div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                    <div className="">{quizuser.timeTaken}</div>
                    <Link href='/statistics/[userId]/[quizId]' as={`/statistics/${quizuser.userId}/${mainQuiz._id}`} className='flex items-center justify-center gap-x-2 bg-gray-900 p-2 rounded-md hover:bg-gray-700'>
                        <div className="">more</div>
                        <IoIosArrowForward />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GivenQuiz