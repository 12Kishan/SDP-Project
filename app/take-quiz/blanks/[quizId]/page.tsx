'use client'
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader';
import { useRouter } from 'next/navigation';
import mongoose from 'mongoose';
import Blank from '@/app/components/quizComponent/Blank';


type Props = {
  params: {
    quizId: string
  }
}

function BlankQuestionPage({ params: { quizId } }: Props) {
  const [quiz, setQuiz] = useState({})
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // if (!mongoose.Types.ObjectId.isValid(quizId)) {
  //   return router.push('/dashboard/quiz')
  // }
  useEffect(() => {
    fetch(`/api/getQuestions/${quizId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data ", data)
        setQuiz(data['quiz'])
        setQuestions(data['questions'])
        console.log(quiz)
        console.log(questions)
        setLoading(false)
      })
  }, [])

  return <>

     { loading && <Loader /> }
     { !loading && <><Blank quiz={quiz} questions={questions} /></> }
  </>
}

export default BlankQuestionPage //65b3d80f4da04f8acf41eece
