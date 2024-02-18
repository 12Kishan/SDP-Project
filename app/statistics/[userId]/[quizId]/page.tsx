import Accuracy from '@/app/components/StatsComponents/Accuracy'
import QuestionTable from '@/app/components/StatsComponents/QuestionTable'
import TimeTaken from '@/app/components/StatsComponents/TimeTaken'
import UserChart from '@/app/components/StatsComponents/UserChart'
import { Question } from '@/app/model/question'
import { QuestionUser } from '@/app/model/question_user'
import { Quiz } from '@/app/model/quiz'
import { QuizUsers } from '@/app/model/quiz_user'
import { User } from '@/app/model/user'
import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'
type Props = {
    params: {
        userId: string
        quizId: string
    },
    searchParams: any
}
const StatisticPage = async ({ params }: Props) => {
    const questionUser = await QuestionUser.find({ quizId: params.quizId, userId: params.userId }, { isCorrect: 1, userAnswer: 1 })
    const quizUser = await QuizUsers.findOne({ quizId: params.quizId, userId: params.userId }, { timeTaken: 1 })
    const user = await User.findOne({ _id: params.userId }, { name: 1, _id: 0 })
    const quiz = await Quiz.findOne({ _id: params.quizId }, { topic: 1, _id: 0, difficulty: 1 })
    const questions = await Question.find({ quizId: params.quizId }, { question: 1, answer: 1, questionType: 1 })

    // const questionUser = await QuestionUser.find({ userId: params.userId })

    // const user = await User.findOne({ _id: params.userId }, { name: 1, _id: 0 })
    // const questions = await Question.find({ quizId: params.quizId })
    // const quiz = await Quiz.findOne({ _id: params.quizId }, { topic: 1, timeTaken: 1, _id: 0, difficulty: 1 })

    let correct: number = 0
    for (let obj of questionUser) {
        if (obj?.isCorrect) {
            correct++
        }
    }
    return (
        <>
            <section className='bg-gray-800 h-screen overflow-y-scroll'>
                <div className="flex items-center justify-center px-4 sm:px-6 py-6 lg:px-8 lg:py-8">
                    <div className="bg-gray-900 w-full mx-28 rounded-3xl px-7 py-7" >
                        <div className="gap-x-4 flex justify-between items-center text-white">
                            <div className="text-lg md:text-2xl lg:text-3xl font-extrabold">Statistics</div>
                            <Link href={'/dashboard'} className="bg-red-700 p-2 gap-x-2 flex items-center justify-center rounded-xl"><FaHome className='h-4 md:h-4 lg:h-6  w-4 md:w-4 lg:w-6' />
                                <div className="text-xs md:text-base lg:text-lg">Dashboard</div>
                            </Link>
                        </div>
                        <div className="bg-gray-700 py-2 px-5 rounded-md mt-5">
                            <div className="font-bold text-white mb-2 text-sm md:text-lg lg:text-xl">{user.name}</div>
                            <hr className="h-px mb-2 bg-gray-500 border-1 border-gray-500 dark:bg-gray-700" />
                            <div className="items-center text-xs md:text-sm lg:text-base lg:flex lg:justify-between lg:items-center md:flex md:justify-between font-semibold md:items-center text-white">
                                <div className="flex items-center gap-x-1 justify-center">
                                    <div>Type</div>
                                    <div className="px-1 py-0.5 font-bold bg-gray-900 rounded-md mb-0.5">{questions[0].questionType}</div>
                                </div>
                                <div className="flex items-center gap-x-1 justify-center">
                                    <div>Topic</div>
                                    <div className="px-1 py-0.5 font-bold bg-gray-900 rounded-md mb-0.5">{quiz.topic}</div>
                                </div>
                                <div className="flex items-center gap-x-1 justify-center">
                                    <div>Difficulty</div>
                                    <div className="px-1 py-0.5 font-bold bg-gray-900 rounded-md mb-0.5">{quiz.difficulty}</div>
                                </div>
                                <div className="flex items-center gap-x-1 justify-center">
                                    <div>No. of questions</div>
                                    <div className="px-1 py-0.5 font-bold bg-gray-900 rounded-md">{questions.length}</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-row-2 lg:grid-flow-col lg:gap-0.5">

                            <div className="lg:col-span-2 bg-gray-700 py-2 px-5 text-white rounded-md mt-5 items-center text-center text-xs md:text-sm lg:text-base lg:flex lg:justify-between lg:items-center md:flex md:justify-between font-semibold md:items-center">
                                <Accuracy correct={correct} incorrect={questions.length - correct} />
                            </div>
                            <div className="lg:col-span-2 bg-gray-700 py-2 px-5 text-white rounded-md mt-5 items-center text-center text-xs md:text-sm lg:text-base lg:flex lg:justify-between lg:items-center md:flex md:justify-between font-semibold md:items-center">
                                <TimeTaken timeTaken={quizUser.timeTaken} />
                            </div>
                            <div className="lg:row-span-2 flex h-56 justify-center mt-5 rounded-md bg-gray-700 lg:ml-4">
                                <UserChart correct={correct} incorrect={questions.length - correct} />
                            </div>
                        </div>
                        <div className="bg-gray-700 flex items-center justify-center text-white py-2 px-5 rounded-md mt-5">
                            <QuestionTable questions={questions} questionUser={questionUser}/>
                            {/* {JSON.stringify(questions)} */}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default StatisticPage

// < section className = "py-5 text-white bg-gray-900 sm:py-10 lg:py-12" >
//     <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//         <div className="max-w-2xl mx-auto text-center">
//             <h2 className="text-xl font-bold leading-tight sm:text-4xl lg:text-5xl">Statistics</h2>
//         </div>

//         <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
//             <div className="grid grid-cols-1 gap-6 px-8 text-center">
//                 <div className="overflow-hidden bg-gray-700 rounded-xl">
//                     <div className="p-6">
//                         <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                                 stroke-width="1"
//                                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                             />
//                         </svg>
//                         <p className="mt-6 text-lg font-medium text-white">+1-316-555-0116</p>
//                         <p className="mt-1 text-lg font-medium text-white">+1-446-526-0117</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-6 overflow-hidden bg-gray-700 rounded-xl">
//                 <div className="px-6 py-12 sm:p-12">
//                     <h3 className="text-3xl font-semibold text-center text-white">Send us a message</h3>

//                     <form action="#" method="POST" className="mt-14">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
//                             <div>
//                                 <label className="text-base font-medium text-white"> Your name </label>
//                                 <div className="mt-2.5 relative">
//                                     <input type="text" name="" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="text-base font-medium text-white"> Email address </label>
//                                 <div className="mt-2.5 relative">
//                                     <input type="email" name="" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="text-base font-medium text-white"> Phone number </label>
//                                 <div className="mt-2.5 relative">
//                                     <input type="tel" name="" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="text-base font-medium text-white"> Company name </label>
//                                 <div className="mt-2.5 relative">
//                                     <input type="text" name="" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-2">
//                                 <label className="text-base font-medium text-white"> Message </label>
//                                 <div className="mt-2.5 relative">
//                                     <textarea name="" id="" placeholder="" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-gray-700 border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
//                                 </div>
//                             </div>

//                             <div className="sm:col-span-2">
//                                 <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
//                                     Send
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//         </section >