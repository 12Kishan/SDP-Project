import React from 'react'
import QuizCreation from '@/app/components/dashboardComponents/quizComponent/QuizCreation'

export const metadata = {
    title: "Quiz | QuizBee"
}

function QuizPage() {
  return (
    <div>
        <QuizCreation shared={false}/>
    </div>
  )
}

export default QuizPage