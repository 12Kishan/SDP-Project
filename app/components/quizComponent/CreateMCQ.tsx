"use client";
import React from 'react';
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { Card } from "@chakra-ui/react";
import { Quiz } from "@/app/model/quiz";
import { useState, useEffect } from 'react';

type Props = {
    quizObj: any
    questionArr: any
}

function CreateMCQ({ quizObj, questionArr }: Props) {

    const [loading, setLoading] = useState(true);
    const [quiz, setQuiz] = useState({
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

    console.log('quiz ', quiz);
    console.log('que ', questions);
    useEffect(() => {
        console.log('quiz useeff', quiz);
        console.log('que useeff', questions);
        
        setQuestions(questionArr);
        setQuiz(quizObj);
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
                const updatedOptions = JSON.parse(item.options).map((option: string, inOptionIndex: number) => {
                    //answer change
                        return inOptionIndex == indexOfOption ? newOption : option;
                    }
                );
                return { ...item, options: JSON.stringify(updatedOptions) };
            } else {
                return item;
            }
        });
        setQuestions(newQuestions);
    };

    //await Quiz.findByIdAndUpdate(quizId, { $set: { fieldToUpdate: newValue } });

    // const submit = async () => {
    //     alert(JSON.stringify(questiona));
    //     await Quiz.findByIdAndUpdate(quizId, { $set: { question: questiona } });

    //     const response = await fetch(/api/auth / reset - quiz / ${ quizId }, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(questiona),
    //     });

    //     const data = await response.json();
    //     console.log(data);

    //     if (response.ok) {
    //         alert(JSON.stringify(data));
    //         //redirect to another page with string passed by me  "ABC"
    //     }
    // };

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
                                    <textarea
                                        className="w-full rounded-md p-2 m-3"
                                        defaultValue={question.question}
                                        onChange={(e) =>handleQuestion(questionIndex, e.target.value)}
                                    />
                                    <br />

                                    <div className="text-center justify-self-auto w-full">
                                        {JSON.parse(question.options).map(
                                            (option: string, index: number) => (
                                                <>
                                                    <input 
                                                        key={index}
                                                        className={`rounded-md p-2 m-3 ${option === question.answer ? "bg-green-500" : ""
                                                            }`}
                                                        defaultValue={option}
                                                        onChange={(e) =>
                                                            handleOptions(
                                                                questionIndex,
                                                                index,
                                                                e.target.value
                                                            )
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
                                        onClick={()=>{alert('submit')}}
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                </>
            )}
            {JSON.stringify(questionArr)}
        </>
    )
}

export default CreateMCQ;