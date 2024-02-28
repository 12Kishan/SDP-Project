import Link from 'next/link'
import React from 'react'

function GenerateQuiz() {
  return (
    <>
      <div className='text-white md:flex lg:flex gap-x-5'>
        <div className='w-full'>
          <div className="mb-6 md:p-6 lg:p-8 md:pb-0 lg:mb-0 bg-gray-900 w-full rounded-2xl">
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="m-5 flex items-center justify-between">
                <div className="text-lg">Generate dynamic quizzes and share it to others</div>
                <Link href='/dashboard/share' className='flex items-center justify-center gap-x-2 bg-gray-900 p-4 rounded-md hover:bg-gray-700'>
                  <div className="">Generate quiz</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenerateQuiz