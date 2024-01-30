'use client';
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
} from '@chakra-ui/react'
import { PiClockClockwise } from "react-icons/pi";
import Counter from './Counter';
import toast, { Toaster } from 'react-hot-toast'
import { RiLineChartFill } from "react-icons/ri";
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { differenceInSeconds } from 'date-fns'
import ReactLoading from 'react-loading';
import { formatTime } from '@/app/lib/utils';
import { useTimer } from 'react-timer-hook';


type Props = {
  quiz: any
  questions: any
}

function MCQ({ quiz, questions }: Props) {

  const [index, setIndex] = useState(0)
  const [choice, setChoice] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  let [correct, setCorrect] = useState(0)
  let [wrong, setWrong] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const optionArr = ['A', 'B', 'C', 'D']

  const currQuestion = React.useMemo(() => {
    return questions[index]
  }, [index])

  const options = React.useMemo(() => {
    if (!currQuestion || !currQuestion.options) {
      return []
    }
    return JSON.parse(currQuestion.options!) as string[]
  }, [currQuestion])

  const handleNext = async () => {
    if (loading)
      return
    if (choice == -1) {

    } else {
      try {
        const obj = {
          questionId: currQuestion._id,
          index: index,
          timeTaken: startTime ? formatTime(Math.floor(((expiryTimestamp.getTime() - startTime?.getTime()) / 1000))) : '',
          len: questions.length,
          userAnswer: options[choice]
        }
        setLoading(true)
        const response = await fetch('/api/checkAnswer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
          if (data.isCorrect) {
            setCorrect((prev) => prev + 1)
            toast.success('correct answer', {
              style: {
                border: '2px solid #111827',
                padding: '16px',
                color: '#fff',
                background: 'green'
              },
              iconTheme: {
                primary: 'white',
                secondary: 'green',
              },
            })
          } else {
            setWrong((prev) => prev + 1)
            toast.error("Wrong answer", {
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
          }
          if (index === quiz.questions.length - 1) {
            pause()
            expiryTimestamp = new Date()
            setTimeout(() => {
              setHasEnded(true)
              console.log('start : ', startTime)
              console.log('end: ', expiryTimestamp)
            }, 1000)
            return
          }
          setLoading(false)
          setChoice(-1)
          setIndex((prev) => prev + 1)
        } else {
          console.log('err:', data)
        }

      } catch (err) {
        console.log(err)
        toast.error("Something went wrong", {
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
      }
    }
  }
  let expiryTimestamp = (new Date());
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 600)

  useEffect(() => {
    if (startTime === null) {
      setStartTime(expiryTimestamp)
      console.log('start time set: ', startTime)
    }
    console.log('exp time: ', expiryTimestamp)
  }, [expiryTimestamp])

  const {
    seconds,
    hours,
    minutes,
    pause
  } = useTimer({
    expiryTimestamp, onExpire: () => {
      setHasEnded((prev) => !prev)
      pause()
      console.log('second: ', seconds)
      console.log('start : ', startTime)
    }
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
                <Link href='/statistics/[userId]/[quizId]' as={`/statistics/${quiz.userId}/${quiz._id}`} className='flex flex-row gap-x-3 p-2 justify-center items-center bg-green-700 rounded-xl'>
                  <RiLineChartFill />
                  <div>View statistics</div>
                </Link>
              </div>
            </div>
          </div>
        )}
        {!hasEnded && <div className="flex p-1 items-center flex-col justify-center h-screen">
          <div className="flex flex-col items-end">
            <Card className='bg-gray-900 max-w-3xl p-4 md:p-7 lg:p-7 rounded-3xl'>
              {/* Info here */}
              <div className='flex justify-between gap-x-3 md:gap-x-8 lg:gap-x-8 text-xs md:text-sm lg:text-sm font-medium'>
                <div className='flex gap-x-2 items-center'><p className='text-gray-500'>Topic</p><span className='bg-gray-700 text-white text-center rounded-lg py-0.5 px-1'>{quiz.topic}</span></div>
                <div className='gap-x-1 flex items-center text-white'><PiClockClockwise className='w-5 h-5' /><span>{`${hours}h ${minutes}m ${seconds}s`}</span></div>
                <Counter correct={correct} wrong={wrong} />
              </div>
              {/* Question here */}
              <CardHeader>
                <div className="mt-4 gap-x-5 rounded-xl bg-white flex items-center p-5">
                  <div className="font-extrabold text-sm">{index + 1} of {questions.length}</div>
                  <div className="font-bold">{currQuestion.question}</div>
                </div>
              </CardHeader>

              {/* Options here */}
              <CardBody>
                <div className="flex flex-col text-sm items-center justify-center w-full mt-4">
                  {options.map((opt, ind) => {
                    return (
                      <button type='button' key={ind} className={`rounded-xl w-full py-1 md:py-2 lg:py-3 item-center my-1 border-2 border-gray-700 justify-start  ${choice == ind ? 'bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => setChoice(ind)}>
                        <div className="flex item-center justify-start">
                          <div className={`px-3 py-6 md:py-4 lg:py-3 mx-5 font-xs font-extrabold text-gray-400 bg-gray-700 rounded-md ${choice == ind ? 'bg-gray-900' : 'bg-gray-700'}`}>{optionArr[ind]}</div>
                          <div className="text-white font-medium mr-6">{opt}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardBody>
            </Card>
            <button className='mt-1 w-fit block px-10 rounded-full py-3 text-white font-bold bg-gray-900 border-solid border-2 hover:bg-gray-300 hover:text-gray-900 mb-1 sm:ml-2 dm:mt-5 text-center disabled:bg-slate-400' onClick={handleNext} disabled={loading}>
              {loading ? <ReactLoading type='bubbles' color='#111827' height={25} width={25} /> : 'Next'}
            </button>
          </div>
        </div>}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </section>
    </>
  )
}

export default MCQ


// <div className = "flex items-center text-center justify-center text-white pt-5" >
//   <div className=" bg-gray-900 p-5 rounded-2xl shadow-2xl">
//     <div className="">You completed in {'00:00'}</div>
//     <div className="mt-4 flex gap-x-3 justify-center items-center">
//       <Link href={'/dashboard'} className="bg-red-700 p-2 rounded-xl"><FaHome className='h-6 w-6' /></Link>
//       <Link href={`/statistics/${quiz._id}`} className='flex flex-row gap-x-3 p-2 justify-center items-center bg-green-700 rounded-xl'>
//         <RiLineChartFill />
//         <div>View statistics</div>
//       </Link>
//     </div>
//   </div>
//     </div>  forward:  formatTime(Math.floor(((startTime.getTime() - new Date(quiz.timeStarted).getTime()) / 1000)))


// const [quizStartTime, setQuizStartTime] = useState(new Date());
// useEffect(() => {
//   setHasMounted(true)
//   setQuizStartTime(new Date());
// }, [])
// useEffect(() => {
//   if (hasMounted) {
//     const interval = setInterval(() => {
//       if (!hasEnded) {
//         setstartTime(new Date());
//       }
//     }, 1000)
//     return () => clearInterval(interval);
//   }
// }, [hasMounted, hasEnded])
