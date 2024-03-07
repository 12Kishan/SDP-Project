"use client";
import React from "react";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { Card } from "@chakra-ui/react";
import { Quiz } from "@/app/model/quiz";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  quizObj: any;
  questionArr: any;
};

export default function CreateBlanks({ quizObj, questionArr }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({
    type: "",
    topic: "",
    difficulty: "",
    shared: true,
  });
  const [questions, setQuestions] = useState([
    {
      questionType: "",
      question: "",
      answer: "",
    },
  ]);

  useEffect(() => {
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

  const handleanswer = (id: number, newAnswer: any) => {
    const new_data = questions.map((item, index) =>
      index === id ? { ...item, answer: newAnswer } : item
    );

    setQuestions(new_data);
  };

  const handleSubmit = async (e:any)=>{

    e.preventDefault()
        const isEmptyQuestion = questions.some(question => question.question.trim() === "");
        if (isEmptyQuestion) {
            alert("Please fill in all questions");
            return;
        }

        
        const isEmptyAnswer = questions.some(question => question.answer.trim() === "");
        if (isEmptyQuestion) {
            alert("Please fill the all answer");
            return;
        }

        const response = await axios.post('/api/quiz/savequiz',{
            quizObj:quiz,
            questionArr:questions
        })

        if(response.status==200)
        {
            const quizId=response.data.quizId;
            router.push(`/take-quiz/mcq/${quizId}`)
        }

  }

  return (
    <>
      {loading && <Loader />}
      {!loading && <>
      
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
                                        onChange={(e) =>handleQuestion(questionIndex, e.target.value)}
                                    />
                                    <br />
                                    <input
                                    key={questionIndex}
                                    required
                                    
                                    className="rounded-md p-2 m-3"
                                    defaultValue={question.answer}
                                    onChange={(e) =>handleanswer(questionIndex, e.target.value)}
                                    />
                                    <br />
                                </>
                            ))}

                            {/* add the button here */}
                            <div className="flex justify-center items-center mt-4 ">
                                <Link href="/" className="text-center">
                                    <button
                                        className="mt-1 mx-2 block px-2 py-3 text-white font-bold bg-gray-900 rounded-full border-solid border-2 hover:bg-white hover:text-gray-900 sm:ml-2 dm:mt-5 text-center"
                                        onClick={(e)=>{handleSubmit(e)}}
                                    >
                                        Submit
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </Card>
      </>}
      
    </>
  );
}
