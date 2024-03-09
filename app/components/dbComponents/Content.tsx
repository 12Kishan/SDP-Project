import React from 'react'
import Home from '../dashboardComponents/Home'
import Quiz from '../dashboardComponents/Quiz'
import History from '../dashboardComponents/History'
import GenerateQuiz from '../dashboardComponents/GenerateQuiz'

type Props = {
    title: string
}
export default function Content({title}: Props) {
    return (
        <div className=" rounded-3xl bg-gray-800 p-6 lg:w-full">
            {title === 'Home' && <Home />}
            {title === 'Assess yourself' && <Quiz/>}
            {title === 'History' && <History />}
            {title === 'Generate for others' && <GenerateQuiz/>}
        </div>
    )
}