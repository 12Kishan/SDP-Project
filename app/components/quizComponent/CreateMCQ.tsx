"use client";
import React, { useState, useEffect } from "react";

import Loader from "@/app/components/Loader";
import { Card } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
    quizObj: any;
    questionArr: any;
};

function CreateMCQ({ quizObj, questionArr }: Props) {
    const router = useRouter();
    const [QuizId, setQuizId] = useState("");
    const { data } = useSession();
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false)
    const [quiz, setQuiz] = useState({
        userId: "",
        type: "",
        topic: "",
        difficulty: "",
        description: "",
        shared: true,
    });
    const [questions, setQuestions] = useState([
        {
            id: 0,
            questionType: "",
            question: "",
            answer: "",
            options: "",
        },
    ]);

    useEffect(() => {
        if (QuizId !== "") {
            router.push(`/create-quiz/share/${QuizId}`);
        }
    }, [QuizId]);

    useEffect(() => {
        setQuestions(questionArr);
        setQuiz({ ...quizObj, shared: true, userId: data?.user.id });
        setQuestions((prev) =>
            prev.map((item, index) => {
                return { ...item, id: index };
            })
        );
        setLoading(false);
    }, []);

    const handleQuestion = (id: number, question: string) => {
        setQuestions((prev) =>
            prev.map((item, index) =>
                index === id ? { ...item, question: question } : item
            )
        );
    };

    const handleOptions = (
        indexOfQuestion: number,
        indexOfOption: number,
        newOption: string
    ) => {
        const newQuestions = questions.map((item, inIndex) => {
            if (inIndex === indexOfQuestion) {
                let updatedans;
                indexOfOption === 0
                    ? (updatedans = newOption)
                    : (updatedans = item.answer);

                const updatedOptions = JSON.parse(item.options).map(
                    (option: string, inOptionIndex: number) => {
                        return inOptionIndex === indexOfOption ? newOption : option;
                    }
                );
                return {
                    ...item,
                    options: JSON.stringify(updatedOptions),
                    answer: updatedans,
                };
            } else {
                return item;
            }
        });
        setQuestions(newQuestions);
    };

    const handleDelete = (indexOfQuestion: number) => {
        const newQuestions = questions.filter(
            (item, index) => index !== indexOfQuestion
        );
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const isEmptyQuestion = questions.some(
            (question) => question.question.trim() === ""
        );
        if (isEmptyQuestion) {
            alert("Please fill in all questions");
            return;
        }

        const isEmptyOption = questions.some((question) => {
            const optionsArr = JSON.parse(question.options);
            return optionsArr.some((option: string) => option.trim() === "");
        });
        if (isEmptyOption) {
            alert("Please fill in all options");
            return;
        }
        try {
            const response = await axios.post("/api/quiz/savequiz", {
                quizObj: quiz,
                questionArr: questions,
            });

            if (response.status === 200) {
                const quizId = response.data.quizId;
                setQuizId(quizId);
            }
        } catch (err) {
            alert("Error");
        } finally {
            setSubmitLoading(false)
        }
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <>
                    <Card className="bg-gray-700 p-2 md:p-4 lg:p-5 m-7 rounded-3xl ">
                        <div className="text-white text-3xl font-bold justify-center p-3 ">
                            Create Quiz
                        </div>
                        <div className=" justify-center bg-gray-900 p-3 rounded-3xl ">
                            <div className="text-white text-xs md:text-base lg:text-lg p-3 ">
                                <div className="font-semibold mb-3">Instructions</div>
                                <div>
                                    <li>
                                        Write only one correct answer, highlighted in green for
                                        clarity.
                                    </li>
                                    <li>
                                        Input the correct answer in the first box; our system will
                                        shuffle options.
                                    </li>
                                    <li>
                                        Ensure all fields, including questions and answers, are
                                        filled; no blanks allowed.
                                    </li>
                                    <li>
                                        Duplicate correct answers are accepted; both will be
                                        considered correct.
                                    </li>
                                    <li>
                                        Use the remove button to delete questions entirely if
                                        necessary.
                                    </li>
                                </div>
                            </div>

                            <br />
                            <div className="flex flex-col gap-y-4">
                                <div className="rounded-lg text-white bg-gray-700 p-3">
                                    <div className="flex flex-col gap-y-2">
                                        <div>
                                            <span>Description: </span>
                                            <span className="text-gray-400">(optional)</span>
                                        </div>
                                        <textarea
                                            required
                                            className="w-full text-black rounded-md p-2 text-wrap"
                                            defaultValue={quiz.description}
                                            onChange={(e) => { 
                                                setQuiz({ ...quiz, description: e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="rounded-lg bg-gray-700 p-3">
                                    {questions?.map((question, questionIndex) => (
                                        <div key={question.id} className=" p-3">
                                            <div className="text-white flex justify-between mb-3">
                                                <div className=" text-white font-semibold">
                                                    Question : {questionIndex + 1}
                                                </div>

                                                <button
                                                    key={question.question}
                                                    className="hover:text-red-500"
                                                    onClick={(e) => handleDelete(questionIndex)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <textarea
                                                required
                                                className="w-full rounded-md p-2 text-wrap"
                                                defaultValue={question.question}
                                                onChange={(e) =>
                                                    handleQuestion(questionIndex, e.target.value)
                                                }
                                            />
                                            <br />
                                            <div className="text-center flex-col-reverse mt-3">
                                                {JSON.parse(question.options).map(
                                                    (option: string, index: number) => (
                                                        <div
                                                            key={index}
                                                            className={`flex items-center justify-around ${index === 0 ? "gap-2" : "gap-1"
                                                                }`}
                                                        >
                                                            <p className="hidden sm:block lg:block md:block text-white">
                                                                {index === 0 ? (
                                                                    <div className="justify-end">Answer </div>
                                                                ) : (
                                                                    <div className="flex gap-1">
                                                                        <div>Option </div> <div>{index}</div>
                                                                    </div>
                                                                )}
                                                            </p>
                                                            <input
                                                                required
                                                                key={index}
                                                                className={`rounded-md m-2 w-full p-2 mx-3 ${option.trim() === question.answer.trim()
                                                                    ? "bg-green-500"
                                                                    : ""
                                                                    }
                            ${option.trim() === ""
                                                                        ? "bg-red-500"
                                                                        : ""
                                                                    }`}
                                                                defaultValue={option}
                                                                onChange={(e) => {
                                                                    handleOptions(
                                                                        questionIndex,
                                                                        index,
                                                                        e.target.value
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <br />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center items-center mt-4">
                                <button
                                    className="bg-gray-700 px-18 md:px-25 lg:px-32 p-3 text-white gap-x-2 flex users-center justify-center rounded-xl hover:bg-gray-800 disabled:bg-gray-800"
                                    disabled = {submitLoading}
                                    onClick={(e) => {
                                        setSubmitLoading(true)
                                        handleSubmit(e);
                                    }}
                                >
                                    {submitLoading ? 'Saving Quiz...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </Card>
                </>
            )}
        </>
    );
}

export default CreateMCQ;