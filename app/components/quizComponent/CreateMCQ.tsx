"use client";
import React from 'react';
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { Card } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';




type Props = {
    quizObj: any
    questionArr: any
}

function CreateMCQ({ quizObj, questionArr }: Props) {

    const router = useRouter();
    const { data } = useSession()
    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState({
        userId: '',
        type: "",
        topic: "",
        difficulty: "",
        shared: true
    })
    const [questions, setQuestions] = useState([
        {
            questionType: "",
            question: "",
            answer: "",
            options: ""
        }
    ]);


    useEffect(() => {

        setQuestions(questionArr);
        setQuiz({ ...quizObj, shared: true, userId:data?.user.id});
        console.log("useEffect called in crete mcq");
        setLoading(false);
    }, []);

    const handleQuestion = (id: number, question: string) => {
        const new_data = questions.map((item, index) =>
            index === id ? { ...item, question: question } : item
        );
        setQuestions(new_data);
    };

    const handleOptions = (
        indexOfQuestion: number,
        indexOfOption: number,
        newOption: string
    ) => {
        const newQuestions = questions.map((item, inIndex) => {
            if (inIndex == indexOfQuestion) {

                let updatedans;
                indexOfOption == 0 ? (updatedans = newOption) : (updatedans = item.answer);


                const updatedOptions = JSON.parse(item.options).map((option: string, inOptionIndex: number) => {

                    return inOptionIndex == indexOfOption ? newOption : option;
                }
                );
                return { ...item, options: JSON.stringify(updatedOptions), answer: updatedans };
            } else {
                return item;
            }
        });
        setQuestions(newQuestions);
    };

    //await Quiz.findByIdAndUpdate(quizId, { $set: { fieldToUpdate: newValue } });

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const isEmptyQuestion = questions.some(question => question.question.trim() === "");
        if (isEmptyQuestion) {
            alert("Please fill in all questions");
            return;
        }

        // Check if any option is empty
        const isEmptyOption = questions.some(question => {
            const optionsArr = JSON.parse(question.options);
            return optionsArr.some((option: string) => option.trim() === "");
        });
        if (isEmptyOption) {
            alert("Please fill in all options");
            return;
        }

        const response = await axios.post('/api/quiz/savequiz', {
            quizObj: quiz,
            questionArr: questions
        })

        if (response.status == 200) {
            const quizId = response.data.quizId;
            router.push(`/take-quiz/mcq/${quizId}`)
        }


    }

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <>
                    <Card className="bg-gray-900 p-4 md:p-7 lg:p-7 m-20 rounded-3xl">
                        <div className=" justify-center">
                            <div className="text-white text-2xl justify-center text-center">
                                Create Quiz
                            </div>
                            <hr className="text-white" />
                            <br />

                            {questions.map((question, questionIndex) => (
                                <>
                                    <div className=" text-white">Question:{questionIndex + 1}</div>
                                    <textarea required
                                        className="w-full rounded-md p-2 m-3"
                                        defaultValue={question.question}
                                        onChange={(e) => handleQuestion(questionIndex, e.target.value)}
                                    />
                                    <br />

                                    <div className="text-center justify-self-auto w-full">
                                        {JSON.parse(question.options).map(
                                            (option: string, index: number) => (
                                                <>
                                                    <input required
                                                        key={index}
                                                        className={`rounded-md p-2 m-3 ${option.trim() === question.answer.trim() ? "bg-green-500" : ""}
                                                        ${option.trim() == "" ? "bg-red-500" : ""}`
                                                        }
                                                        defaultValue={option}
                                                        onChange={(e) => {
                                                            handleOptions(
                                                                questionIndex,
                                                                index,
                                                                e.target.value
                                                            )
                                                        }
                                                        }
                                                    />
                                                </>
                                            )
                                        )}
                                    </div>
                                    <br />
                                </>
                            ))}

                            {/* add the button here */}
                            <div className="flex justify-center items-center mt-4 ">
                                <Link href="/" className="text-center">
                                    <button
                                        className="mt-1 mx-2 block px-2 py-3 text-white font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 sm:ml-2 dm:mt-5 text-center"
                                        onClick={(e) => { handleSubmit(e) }}
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </>
            )}

            {questions.map((item) => { return (item.options) })}
            {questions.map((item) => { return (item.answer) })}
        </>
    )
}

export default CreateMCQ;