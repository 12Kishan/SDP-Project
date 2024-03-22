"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import Loader from "@/app/components/Loader";
import CreateMCQ from '@/app/components/quizComponent/CreateMCQ';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Loading from "react-loading";
import toast, { Toaster } from 'react-hot-toast'
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
            options: ""
        }
    ])
    useEffect(() => {
        const fetchData = async () => {
            const reqStr = searchParams.get('obj')
            let body
            if (typeof reqStr === 'string') {
                body = JSON.parse(reqStr)
                const res = await axios.post('/api/quiz/sharedquiz', body)
                if (res.status == 200) {
                    
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
    //               questionType: 'mcq',
    //               question: "What is the purpose of the 'finally' block in Java exception handling?",
    //               answer: 'To execute code after try-catch blocks regardless of an exception',
    //               options: '["To define custom exception classes for error handling","To specify multiple catch blocks for different exceptions","To catch exceptions thrown by the try block","To execute code after try-catch blocks regardless of an exception"]'
    //             //   quizId: new ObjectId('65d62ea27a403b88db8106e6')
    //             },
    //             {
    //               questionType: 'mcq',
    //               question: "What is the difference between '== ' and '.equals()' when comparing strings in Java?",
    //               answer: '== compares memory addresses, .equals() compares actual string contents',
    //               options: '["== checks for string length, .equals() checks for case","== compares ASCII values, .equals() compares Unicode values","== compares memory addresses, .equals() compares actual string contents","== checks for null values, .equals() compares content"]'
    //             //   quizId: new ObjectId('65d62ea27a403b88db8106e6')
    //             },
    //             {
    //               questionType: 'mcq',
    //               question: 'What is polymorphism in Java?',
    //               answer: 'Polymorphism allows objects of different classes to be treated as objects of a common superclass',
    //               options: '["Polymorphism allows objects of different classes to be treated as objects of a common superclass","Polymorphism is a way to handle runtime exceptions","Polymorphism is the use of multiple threads to execute code concurrently","Polymorphism is the process of converting objects into bytes for storage"]',
    //             //   quizId: new ObjectId('65d62ea27a403b88db8106e6')
    //             }
    //           ]
    //     )
    //     setLoading(false)
    // },[])
    return <>
         {loading && <Loader />}
        {!loading && <DashboardLayout title='Create for others'>
            <CreateMCQ quizObj={quizObj} questionArr={questionArr} />
        </DashboardLayout>}
        <Toaster
            position="top-right"
            reverseOrder={false}
        />
     
    </>
}

export default CreateMcqQuiz;