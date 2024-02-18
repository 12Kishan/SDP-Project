"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import Loader from "@/app/components/Loader";
import CreateMCQ from '@/app/components/quizComponent/CreateMCQ';
import { useSearchParams } from "next/navigation";
import Loading from "react-loading";


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
    // const currData = {}
    // // useEffect(() => {
    // //     const fetchData = async () => {
    // if (currData) {
    //     return
    // }
    //         const reqStr = searchParams.get('obj')
    //         let body
            // if (typeof reqStr === 'string') {
            //     body = JSON.parse(reqStr)
            //     const res = await axios.post('/api/quiz/sharedquiz', body)
            //     // console.log('my page', res);
            //     setQuizObj(res.data.quizObj)
            //     setQuestionArr(res.data.questionArr)
            //     setLoading(false)
            // } else {
            //     return
            // }
    //     }
    //     fetchData()
    // },[])
    useEffect(() => {
        setQuizObj({
            type: "mcq",
            topic: "javascript",
            difficulty: "easy",
            shared: true
        })  
        setQuestionArr(
            [
                {
                    questionType: "mcq",
                    question: "Which keyword is used to declare a variable in JavaScript?",
                    answer: "var",
                    options: "[\"var\",\"let\",\"const\",\"string\"]"
                },
                {
                    questionType: "mcq",
                    question: "Which operator is used for concatenation in JavaScript?",
                    answer: "+",
                    options: "[\"+\",\"-\",\"*\",\"/\"]"
                }
            ]
        )
        setLoading(false)
    },[])
    return <>
        {loading && <Loader />}
        {!loading && <CreateMCQ quizObj={quizObj} questionArr={questionArr}/>}
        {/* {JSON.stringify(quizObj)}
        {JSON.stringify(questionArr)} */}
    </>
}

export default CreateMcqQuiz;