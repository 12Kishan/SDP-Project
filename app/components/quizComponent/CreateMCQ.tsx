"use client";
import React from "react";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { Card } from "@chakra-ui/react";
import { useState, useEffect } from "react";
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
  const [quiz, setQuiz] = useState({
    userId: "",
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
      options: "",
    },
  ]);

  useEffect(() => {
    if (QuizId != "") {
      router.push(`/create-quiz/share/${QuizId}`);
    }
  }, [QuizId]);
  useEffect(() => {
    setQuestions(questionArr);
    setQuiz({ ...quizObj, shared: true, userId: data?.user.id });
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
        indexOfOption == 0
          ? (updatedans = newOption)
          : (updatedans = item.answer);

        const updatedOptions = JSON.parse(item.options).map(
          (option: string, inOptionIndex: number) => {
            return inOptionIndex == indexOfOption ? newOption : option;
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

  //await Quiz.findByIdAndUpdate(quizId, { $set: { fieldToUpdate: newValue } });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isEmptyQuestion = questions.some(
      (question) => question.question.trim() === ""
    );
    if (isEmptyQuestion) {
      alert("Please fill in all questions");
      return;
    }

    // Check if any option is empty
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

      if (response.status == 200) {
        const quizId = response.data.quizId;
        setQuizId(quizId);
        // alert(`https://sdp-project-1.vercel.app/take-quiz/mcq/${quizId}`)
        // alert(`http://localhost:3000/take-quiz/mcq/${quizId}`)
        // alert(`https://sdp-project-1.netlify.app/take-quiz/mcq/${quizId}`)
      }
    } catch (err) {
      alert("Error");
    }
  };

  console.log("conaole print of question", questions);
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Card className="bg-gray-700 p-4 md:p-7 lg:p-7 m-5 rounded-3xl">
            <div className="text-white text-3xl font-bold justify-center p-3">
              Create Quiz
            </div>
            <div className=" justify-center bg-gray-900 p-3 rounded-lg">
              <div className="text-white text-xs md:text-base lg:text-lg p-3">
                <div className="font-semibold mb-3">Instructions</div>
                <div>
                  <li>
                    Write only one correct answer, highlighted in green for
                    clarity.
                  </li>
                  <li>
                    Input the correct answer in the first box; our system will
                    shuffle answers.
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
              <div className="rounded-lg bg-gray-700 p-3">
                {questions?.map((question, questionIndex) => {
                  console.log(question);
                  return (
                    <div key={question.question} className=" p-3">
                      {" "}
                      {/* Add unique key */}
                      <div className="text-white flex justify-between mb-3">
                        <div className=" text-white">
                          Question:{questionIndex + 1}
                        </div>

                        <button
                          className="hover:text-red-500"
                          onClick={(e) => handleDelete(questionIndex)}
                        >
                          Remove
                        </button>
                      </div>
                      <textarea
                        required
                        className="w-full rounded-md p-2"
                        defaultValue={question.question}
                        onChange={(e) =>
                          handleQuestion(questionIndex, e.target.value)
                        }
                      />
                      <br />
                      <div className="text-center justify-between w-full mt-3">
                        {JSON.parse(question.options).map(
                          (option: string, index: number) => (
                            <input
                              required
                              key={index}
                              className={`rounded-md m-2  p-2 mx-3${
                                option.trim() === question.answer.trim()
                                  ? "bg-green-500"
                                  : ""
                              }
                            ${option.trim() == "" ? "bg-red-500" : ""}`}
                              defaultValue={option}
                              onChange={(e) => {
                                handleOptions(
                                  questionIndex,
                                  index,
                                  e.target.value
                                );
                              }}
                            />
                          )
                        )}
                      </div>
                      <br />
                    </div>
                  );
                })}
              </div>

              {/* add the button here */}
              <div className="flex justify-center items-center mt-4">
                <button
                  className="bg-gray-700 px-32 p-3 text-white gap-x-2 flex users-center justify-center rounded-xl hover:bg-gray-800"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </Card>
        </>
      )}

      {/* {questions.map((item) => { return (item.options) })} */}
      {/* {questions.map((item) => { return (item.answer) })} */}
    </>
  );
}

export default CreateMCQ;
