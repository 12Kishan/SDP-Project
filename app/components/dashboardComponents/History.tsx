import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import React from 'react'
import GivenQuiz from './GivenQuiz'
import { QuizUsers } from '@/app/model/quiz_user'
import { Quiz } from '@/app/model/quiz'
import SharedQuiz from './SharedQuiz'

async function History() {

  const session = await getServerSession(authOptions)

  let givenQuizzes: any
  let sharedQuizzes: any

  if (session?.user) {
    givenQuizzes = await QuizUsers.find({ userId: session.user.id })
    sharedQuizzes = await Quiz.find({ userId: session.user.id, shared: true })
  }

  console.log(givenQuizzes)

  return (
    <>
      <div className='text-white md:flex lg:flex gap-x-5'>
        <div className='w-full'>
          <div className="font-semibold text-2xl mb-5">Given Quiz</div>
          <div className="mb-6 md:p-6 lg:p-8 md:pb-0 lg:mb-0 bg-gray-900 w-full md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 md:gap-3 lg:gap-4 md:rounded-l-2xl lg:rounded-l-2xl">
            {
              givenQuizzes?.map((quizuser: any, index:number) => (
                <GivenQuiz key={index} quizuser={quizuser} />
              ))
            }
          </div>
        </div>
        <div className="w-full">
          <div className="font-semibold text-2xl mb-5">Shared Quiz</div>
          <div className="mb-6 md:p-6 lg:p-8 md:pb-0 lg:mb-0 bg-gray-900 w-full md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 md:gap-3 lg:gap-4 md:rounded-r-2xl lg:rounded-r-2xl">
            {
              sharedQuizzes.map((quiz: any, index: number) => (
                <SharedQuiz key={index} quiz={quiz} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default History
