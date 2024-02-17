import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Quiz } from '@/app/model/quiz'
import { getServerSession } from 'next-auth'
import React from 'react'
import GivenQuiz from './GivenQuiz'

async function History() {

  const session = await getServerSession(authOptions)

  let givenQuizzes
  if (session?.user) {
    givenQuizzes = await Quiz.find({ userId: session?.user.id })
  }
  
  console.log(givenQuizzes)

  return (
    <div className='text-white md:flex lg:flex gap-x-5'>
      <div className='w-full'>
        <div className="font-semibold text-2xl mb-5">Given Quiz</div>
        <div className="mb-6 md:p-6 lg:p-8 md:pb-0 lg:mb-0 bg-gray-900 w-full md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 md:gap-3 lg:gap-4 md:rounded-l-2xl lg:rounded-l-2xl">
            {
              givenQuizzes?.map((quiz) => {
                return <GivenQuiz key={quiz._id} quiz={quiz}/>
              })
            }
        </div>
      </div>
      <div className="w-full">
        <div className="font-semibold text-2xl mb-5">Shared Quiz</div>
        <div className="mb-6 md:mb-0 lg:mb-0 bg-gray-900 w-full md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 md:gap4 lg:gap-6 md:rounded-r-2xl lg:rounded-r-2xl">
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
        </div>
      </div>
    </div>
  )
}

export default History