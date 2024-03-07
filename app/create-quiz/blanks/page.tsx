"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import Loader from "@/app/components/Loader";
import CreateBlanks from '@/app/components/quizComponent/CreateBlanks';
import { useSearchParams } from "next/navigation";
import Loading from "react-loading";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/app/dashboard/Layout";


function CreateMcqQuiz() {
    // console.log(quizId);
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    const router = useRouter();
    const [quizObj, setQuizObj] = useState({
        type: "",
        topic: "",
        difficulty: "",
        shared: false
    })
    const [questionArr, setQuestionArr] = useState([
        {
            questionType: "",
            question: "",
            answer: "",
        }
    ])
     const currData = {}
     useEffect(() => {
        const fetchData = async () => {
            const reqStr = searchParams.get('obj')
            let body
            if (typeof reqStr === 'string') {
                body = JSON.parse(reqStr)
                const res = await axios.post('/api/quiz/sharedquiz', body)
                if (res.status == 200) {
                    console.log('my page', res);
                    setQuizObj(res.data.quizObj)
                    setQuestionArr(res.data.questionArr)
                    setLoading(false)
                } else {
                    toast.error('Something went wrong', {
                        style: {
                            border: '2px solid #111827',
                            padding: '16px',
                            color: '#fff',
                            background: 'red'
                        },
                        iconTheme: {
                            primary: 'white',
                            secondary: 'red',
                        },
                    })
                    router.push('/dashboard/share')
                }
            } else {
                return
            }
        }
        fetchData()
    }, [])
    // useEffect(() => {
    //     setQuizObj({
    //         type: "mcq",
    //         topic: "javascript",
    //         difficulty: "easy",
    //         shared: true
    //     })  
    //     setQuestionArr(
    //         [
    //             {
    //                 questionType: "mcq",
    //                 question: "Which keyword is used to declare a variable in JavaScript?",
    //                 answer: "var",
    //                 //options: "[\"var\",\"let\",\"const\",\"string\"]"
    //             },
    //             {
    //                 questionType: "mcq",
    //                 question: "Which operator is used for concatenation in JavaScript?",
    //                 answer: "+",
    //                 //options: "[\"+\",\"-\",\"*\",\"/\"]"
    //             }
    //         ]
    //     )
    //     setLoading(false)
    // },[])
    return <>

{loading && <Loader />}
        {!loading && <DashboardLayout title='Create for others'>
            <CreateBlanks quizObj={quizObj} questionArr={questionArr} />
        </DashboardLayout>}
        <Toaster
            position="top-right"
            reverseOrder={false}
        />


        {/* {JSON.stringify(quizObj)}
        {JSON.stringify(questionArr)} */}
    </>
}

export default CreateMcqQuiz;