'use client'
import React, { useEffect, useState } from 'react'
import MCQ from '@/app/components/quizComponent/MCQ'
import Loader from '@/app/components/Loader';
import { useSession } from 'next-auth/react';


type Props = {
    params: {
        quizId: string
    }
}

function MCQQuestionPage({ params: { quizId } }: Props) {
    const { data } = useSession()
    const [quiz, setQuiz] = useState({})
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    // const router = useRouter()

    // if (!mongoose.Types.ObjectId.isValid(quizId)) {
    //     return router.push('/dashboard/quiz')
    // }
    useEffect(() => {
        fetch(`/api/questions/${quizId}`)
            .then((res) => res.json())
            .then((data) => {
          
                setQuiz(data['quiz'])
                setQuestions(data['questions'])
              
                setLoading(false)
            })
    }, [])

    return <>
        {loading && <Loader />}
        {!loading && <><MCQ quiz={quiz} questions={questions} userId={data?.user.id}/></>}
    </>
}

export default MCQQuestionPage


// const session = await getServerSession(authOptions)
// if (!session?.user) {
//     return redirect('/')
// }
// console.log('session checked')

// // validating quiz 65a50cccb026fa73017120e9
// let quiz
// if (mongoose.Types.ObjectId.isValid(quizId)) {
//     quiz = await Quiz.findOne({ _id: quizId })
//     if (!quiz || quiz.type !== 'mcq') {
//         return redirect('/dashboard/quiz')
//     }
// } else {
//     return redirect('/dashboard/quiz')
// }
// const questions = await Question.find({ quizId: quizId })

// take-quiz/mcq/65a50cccb026fa73017120e9