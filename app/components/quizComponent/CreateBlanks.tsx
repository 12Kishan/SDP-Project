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
  const [QuizId, setQuizId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({
    type: "",
    topic: "",
    difficulty: "",
    description: "",
    shared: true
  });
  const [questions, setQuestions] = useState([
    {
      id: 0,
      questionType: "",
      question: "",
      answer: "",
    },
  ]);

  useEffect(() => {
    setQuestions(questionArr);
    setQuiz(quizObj);
    setQuestions((prev) =>
      prev.map((item, index) => {
        return { ...item, id: index };
      })
    );
    setLoading(false);
  }, []);

  const handleQuestion = (id: number, question: string) => {
    const new_data = questions.map((item) =>
      item.id === id ? { ...item, question: question } : item
    );
    setQuestions(new_data);
  };

  const handleanswer = (id: number, newAnswer: any) => {
    const new_data = questions.map((item) =>
      item.id === id ? { ...item, answer: newAnswer } : item
    );

    setQuestions(new_data);
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

    const isEmptyAnswer = questions.some(
      (question) => question.answer.trim() === ""
    );
    if (isEmptyAnswer) {
      alert("Please fill the all answer");
      return;
    }

    const response = await axios.post("/api/quiz/savequiz", {
      quizObj: quiz,
      questionArr: questions,
    });

    if (response.status == 200) {
      const quizId = response.data.quizId;
      setQuizId(quizId);
    }
  };

  useEffect(() => {
    if (QuizId !== "") {
      router.push(`/create-quiz/share/${QuizId}`);
    }
  }, [QuizId]);

  const handleDelete = (indexOfQuestion: number) => {
    const newQuestions = questions.filter(
      (item, index) => index !== indexOfQuestion
    );
    setQuestions(newQuestions);
  };

  const handleResize = (event: any) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Card className="bg-gray-700 p-2 md:p-4 lg:p-5 m-7 rounded-3xl ">
            <div className="text-white text-3xl font-bold justify-center p-3 ">
              Create Blanks
            </div>

            <div className=" justify-center bg-gray-900 p-3 rounded-3xl ">
              <div className="text-white text-xs md:text-base lg:text-lg p-3 ">
                <div className="font-semibold mb-3">Instructions</div>
                <div>
                  <li>
                    Write only the correct answer, highlighted in green for
                    clarity.
                  </li>

                  <li>
                    Ensure all fields, including questions and answer, are
                    filled; no blanks allowed.
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
                        setQuiz({ ...quiz, description: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-gray-700 p-3">
                  {questions.map((question, questionIndex) => (
                    <>
                      <div className="text-white flex justify-between mb-2 mt-3">
                        <div className=" text-white font-semibold">
                          Question : {questionIndex + 1}
                        </div>

                        <button
                          key={question.id}
                          className="hover:text-red-500"
                          onClick={(e) => handleDelete(question.id)}
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        required
                        value={question.question}
                        className="w-full text-black overflow-hidden resize-none rounded-md p-2 text-wrap"
                        defaultValue={question.question}
                        onChange={(e) =>
                          handleQuestion(question.id, e.target.value)
                        }
                        onInput={handleResize}
                      />
                      <br />

                      <div
                        key={question.id}
                        className={`flex items-center justify-around gap-1`}
                      >
                        <p className="hidden sm:block lg:block md:block text-white">
                          <div className="justify-end">Answer</div>
                        </p>

                        <input
                          key={questionIndex}
                          required
                          className={`rounded-md m-2 w-full p-2 mx-3 ${
                            question.answer.trim() === question.answer.trim()
                              ? "bg-green-500"
                              : ""
                          }
${question.answer.trim() === "" ? "bg-red-500" : ""}`}
                          defaultValue={question.answer}
                          onChange={(e) =>
                            handleanswer(question.id, e.target.value)
                          }
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
              {/* add the button here */}
              <div className="flex justify-center items-center mt-4 ">
                <button
                  className="bg-gray-700 px-18 md:px-25 lg:px-32 p-3 text-white gap-x-2 flex users-center justify-center rounded-xl hover:bg-gray-800 disabled:bg-gray-800"
                  disabled={submitLoading}
                  onClick={(e) => {
                    setSubmitLoading(true);
                    handleSubmit(e);
                  }}
                >
                  {submitLoading ? "Saving Quiz..." : "Submit"}
                </button>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
