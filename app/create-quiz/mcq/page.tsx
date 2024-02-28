"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import Loader from "@/app/components/Loader";
import CreateMCQ from '@/app/components/quizComponent/CreateMCQ';
import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/app/dashboard/Layout";


function CreateMcqQuiz() {
    // console.log(quizId);
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
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
                console.log('my page', res);
                setQuizObj(res.data.quizObj)
                setQuestionArr(res.data.questionArr)
                setLoading(false)
            } else {
                return
            }
        }
        fetchData()
    },[])
    return <>
        {loading && <Loader />}
        {!loading && <DashboardLayout title='Create for others'>
            <CreateMCQ quizObj={quizObj} questionArr={questionArr} />
        </DashboardLayout>}
    </>
}

export default CreateMcqQuiz;