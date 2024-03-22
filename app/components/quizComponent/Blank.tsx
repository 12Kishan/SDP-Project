"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { PiClockClockwise } from "react-icons/pi";
import Counter from "./Counter";
import toast, { Toaster } from "react-hot-toast";
import { RiLineChartFill } from "react-icons/ri";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import ReactLoading from "react-loading";
import { formatTime } from "@/app/lib/utils";
import { useTimer } from "react-timer-hook";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
  quiz: any;
  questions: any;
  userId: string | undefined;
};

function Blank({ quiz, questions, userId }: Props) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  let [correct, setCorrect] = useState(0);
  let [wrong, setWrong] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    setUserAnswer("");
    const ele = document.getElementById(
      "user-input"
    ) as HTMLInputElement | null;
    if (ele) {
      ele.value = "";
    }
  }, [index]);

  const currQuestion = React.useMemo(() => {
    return questions[index];
  }, [index]);

  const handleNext = async () => {
    if (loading) return;
    try {
      const obj = {
        questionId: currQuestion._id,
        index: index,
        timeTaken: startTime
          ? formatTime(
              Math.floor(
                (expiryTimestamp.getTime() - startTime?.getTime()) / 1000
              )
            )
          : "",
        len: questions.length,
        userAnswer: userAnswer,
        quizId: quiz._id,
        userId: userId,
        shared: quiz.shared,
      };
      console.log(obj);

      setLoading(true);
      const response = await fetch("/api/checkAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status == 207) {
          toast.error(data.message, {
            style: {
              border: "2px solid #111827",
              padding: "16px",
              color: "#fff",
              background: "red",
            },
            iconTheme: {
              primary: "white",
              secondary: "red",
            },
          });
        } else {
          const isCorrect = data.percent >= 70 ? true : false;
          if (isCorrect) {
            setCorrect((prev) => prev + 1);
            toast.success(
              `Nice!\nYour answer is ${data.percent}% similar to correct answer`,
              {
                style: {
                  border: "2px solid #111827",
                  padding: "16px",
                  color: "#fff",
                  background: "green",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "green",
                },
              }
            );
          } else {
            setWrong((prev) => prev + 1);
            toast.error(
              `Oops!\nYour answer is ${data.percent}% similar to correct answer.`,
              {
                style: {
                  border: "2px solid #111827",
                  padding: "16px",
                  color: "#fff",
                  background: "red",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "red",
                },
              }
            );
          }
        }
      }
      if (index === quiz.questions.length - 1) {
        pause();
        expiryTimestamp = new Date();
        setTimeout(() => {
          setHasEnded(true);
        }, 1000);
        return;
      }

      setLoading(false);
      setIndex((prev) => prev + 1);
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong", {
        style: {
          border: "2px solid #111827",
          padding: "16px",
          color: "#fff",
          background: "red",
        },
        iconTheme: {
          primary: "white",
          secondary: "red",
        },
      });
    }
  };

  useEffect(() => {
    async function timestore() {
      try {
        const obj = {
          quizId: quiz._id,
          userId: userId,
          timeTaken: startTime
            ? formatTime(
                Math.floor(
                  (expiryTimestamp.getTime() - startTime?.getTime()) / 1000
                )
              )
            : "",
        };
        const response = await fetch("/api/checkAnswer/timetaken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        console.log(response);
        const data = await response.json();
        if (response.ok) {
          if (!(data.status == 200)) {
            throw new Error("");
          }
        }
      } catch (err) {
        toast.error("Something went wrong", {
          style: {
            border: "2px solid #111827",
            padding: "16px",
            color: "#fff",
            background: "red",
          },
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
        });
      }
    }
    if (hasEnded) {
      timestore();
    }
  }, [hasEnded]);

  function renderQuestionWithCodeSnippet(
    questionText: string
  ): React.ReactNode {
    const codeSnippetRegex = /```(?:\w+)?([\s\S]+?)```/;
    const match = codeSnippetRegex.exec(questionText);

    if (!match) return questionText;

    const beforeCodeSnippet = questionText.substring(0, match.index).trim();
    const codeSnippet = match[0];
    const afterCodeSnippet = questionText
      .substring(match.index + match[0].length)
      .trim();

    return (
      <>
        {beforeCodeSnippet && (
          <span>
            {beforeCodeSnippet}
            <br />
          </span>
        )}
        <SyntaxHighlighter language="javascript" style={ghcolors}>
          {match[1].trim()}
        </SyntaxHighlighter>
        {afterCodeSnippet && (
          <span>
            <br />
            {afterCodeSnippet}
          </span>
        )}
      </>
    );
  }

  let expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  useEffect(() => {
    if (startTime === null) {
      setStartTime(expiryTimestamp);
    }

    if (
      startTime &&
      Math.floor(expiryTimestamp.getTime() - startTime?.getTime()) == 0
    ) {
      pause();
      setHasEnded(true);
    }
  }, [expiryTimestamp]);

  const { seconds, hours, minutes, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setHasEnded((prev) => !prev);
      pause();
    },
  });

  return (
    <>
      <section>
        {hasEnded && (
          <div className="flex items-center text-center justify-center text-white pt-5" >
          <div className=" bg-gray-900 p-5 rounded-2xl shadow-2xl">
            <div className="">You completed in {!startTime ? "" : formatTime(Math.floor(((expiryTimestamp.getTime() - startTime?.getTime()) / 1000)))}</div>
            <div className="mt-4 flex gap-x-3 justify-center items-center">
              <Link href={'/dashboard'} className="bg-red-700 p-2 rounded-xl"><FaHome className='h-6 w-6' /></Link>
              <Link href='/statistics/[userId]/[quizId]' as={`/statistics/${userId}/${quiz._id}`} className='flex flex-row gap-x-3 p-2 justify-center items-center bg-green-700 rounded-xl'>
                <RiLineChartFill />
                <div>View statistics</div>
              </Link>
            </div>
          </div>
        </div>
        )}
        {!hasEnded && (
          <>
          <div className="flex p-1 items-center flex-col min-h-screen justify-center bg-gray-700">
          <div className="flex flex-col items-end">
              <Card className='bg-gray-900 max-w-3xl p-4 md:p-7 lg:p-7 rounded-3xl'>
                {/* Info here */}
                <div className='flex justify-between gap-x-3 md:gap-x-8 lg:gap-x-8 text-xs md:text-sm lg:text-sm font-medium'>
                <div className='flex gap-x-2 items-center'>
                    <p className="text-gray-500">Topic</p>
                    <span className="bg-gray-700 text-white text-center rounded-lg py-0.5 px-1">
                      {quiz.topic}
                    </span>
                  </div>
                  <div className="gap-x-1 flex items-center text-white">
                    <PiClockClockwise className="w-5 h-5" />
                    <span>{`${hours}h ${minutes}m ${seconds}s`}</span>
                  </div>
                  <Counter correct={correct} wrong={wrong} />
                </div>
                {/* Question here */}
                <CardHeader>
                  <div className="mt-4 gap-x-5 rounded-xl bg-white flex items-center p-5 min-w-100 md:min-w-sm lg:min-w-md max-w-80 md:max-w-sm lg:max-w-md">
                    <div className="font-extrabold text-xs flex gap-x-1">
                    <span>{index + 1}</span>
                    <span>of</span>
                    <span>{questions.length}</span>
                    </div>
                    <div className="font-bold">
                      {renderQuestionWithCodeSnippet(currQuestion.question)}
                    </div>
                  </div>
                </CardHeader>

                {/* Options here */}
                <CardBody>
                  <div className="flex flex-col text-sm items-center justify-center w-full mt-7">
                    <input
                      id="user-input"
                      className="flex h-10 w-full text-start rounded-xl border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Make sure you type correct spelling"
                      onChange={(e) => {
                        setUserAnswer(e.target.value.toString());
                      }}
                      type="text"
                      autoComplete="off"
                    ></input>
                  </div>
                </CardBody>
              </Card>
              <button className='m-3 px-10 bg-gray-900 p-3 rounded-lg hover:bg-gray-800 text-white disabled:bg-gray-800' onClick={handleNext} disabled={loading}>
              {loading ? <ReactLoading type='bubbles' color='#111827' height={25} width={25} /> : 'Next'}
            </button>
              </div>
              </div>
              </>)}
        <Toaster position="top-right" reverseOrder={false} />
      </section>
    </>
  );
}

export default Blank;
