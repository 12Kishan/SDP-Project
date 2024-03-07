import React from 'react'
import QuizCreation from '@/app/components/dashboardComponents/quizComponent/QuizCreation'
import { DashboardLayout } from '../Layout'

export const metadata = {
    title: "Quiz | QuizBee"
}

function QuizPage() {
    return (
        <DashboardLayout title='Fill the form'>
            <div className=" rounded-3xl bg-gray-800 p-6 lg:w-full">
                <QuizCreation shared={true} />
            </div>
        </DashboardLayout>
    )
}

export default QuizPage