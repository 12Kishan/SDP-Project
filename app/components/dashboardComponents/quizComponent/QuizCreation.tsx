'use client';

import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
} from '@chakra-ui/react'
import { BiSelectMultiple } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loader from '../../Loader';

// type Input = {
//     topic: string
//     type: 'mcq' | 'blanks'
//     amount: number
// }
type Props = {
    shared: boolean
}
function QuizCreation({ shared = false }: Props) {

    const router = useRouter()
    const [selectedType, setSelectedType] = useState<'mcq' | 'blanks'>('mcq');
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [isLoading, setLoading] = useState(false)

    const handleTypeSelect = (type: 'mcq' | 'blanks') => {
        setSelectedType(type);
    };

    const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
        setSelectedDifficulty(difficulty);
    };

    const [quizState, setQuizState] = useState({
        topic: '',
        type: 'mcq',
        difficulty: 'easy',
        amount: 1
    })

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set(name, value);
        return params.toString();
    };

    const submit = async () => {
        setLoading(true)
        if (shared) {
            if (quizState.type === 'mcq') {
                router.push("/create-quiz/mcq" + "?" + createQueryString("obj", JSON.stringify(quizState)));
            } else {
                
            }
        } else {
            try {
                const response = await fetch('/api/quiz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(quizState),
                });

                const data = await response.json();
                console.log(data)
                const quizId = data.quizId

                setLoading(false)

                if (response.ok) {
                    if (quizState.type === 'mcq') {
                        router.push(`/take-quiz/mcq/${quizId}`)
                    } else if (quizState.type === 'blanks') {
                        router.push(`/take-quiz/blanks/${quizId}`)
                    }
                } else {
                    console.log(data)
                }

            } catch (err) {
                toast.error('something went wrong', {
                    position: 'bottom-right'
                });
            }
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && (<div className="flex items-center justify-center px-4 sm:px-6 h-screen sm:py-16 lg:px-8 lg:py-24">
                <Card className='bg-gray-900 rounded-3xl px-7 py-7'>
                    <CardHeader>
                        <h2 className="text-center text-3xl font-bold leading-tight text-white">
                            Generate Quiz
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400 ">
                            Fill the form
                        </p>
                    </CardHeader>
                    <CardBody>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-base font-medium text-gray-300">
                                        {' '}Topic{' '}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type='text'
                                            placeholder="Enter topic name"
                                            onChange={(e) => {
                                                setQuizState({ ...quizState, topic: e.target.value })
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-base font-medium text-gray-300">
                                        {' '}Number of questions{' '}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            type='number'
                                            placeholder="Enter number of questions"
                                            onChange={(e) => {
                                                setQuizState({ ...quizState, amount: parseInt(e.target.value, 10) || 0 })
                                            }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center space-x-2">
                                    <button
                                        className={`flex align-center items-center px-4 py-2 rounded-md hover:bg-gray-700 ${selectedType === 'mcq' ? 'bg-gray-700' : ''}`}
                                        onClick={() => {
                                            setQuizState({ ...quizState, type: 'mcq' })
                                            handleTypeSelect('mcq')
                                        }}
                                        type='button'
                                    >
                                        <BiSelectMultiple className='text-white h-4 w-4' />
                                        <p className='text-white text-sm ml-2'>MCQ</p>
                                    </button>
                                    <button
                                        className={`flex align-center items-center px-4 py-2 rounded-md hover:bg-gray-700 ${selectedType === 'blanks' ? 'bg-gray-700' : ''}`}
                                        onClick={() => {
                                            setQuizState({ ...quizState, type: 'blanks' })
                                            handleTypeSelect('blanks')
                                        }}
                                        type='button'
                                    >
                                        <AiOutlineEdit className='text-white h-4 w-4' />
                                        <p className='text-white text-sm ml-2'>Fill in the Blanks</p>
                                    </button>
                                </div>

                                <div className="flex justify-between space-x-2">
                                    <button
                                        className={`flex align-center items-center px-4 py-2 rounded-md hover:bg-gray-700 ${selectedDifficulty === 'easy' ? 'bg-green-700' : ''}`}
                                        onClick={() => {
                                            setQuizState({ ...quizState, difficulty: 'easy' })
                                            handleDifficultySelect('easy')
                                        }}
                                        type='button'
                                    >
                                        <p className='text-white text-sm'>Easy</p>
                                    </button>
                                    <button
                                        className={`flex align-center items-center px-4 py-2 rounded-md hover:bg-gray-700 ${selectedDifficulty === 'medium' ? 'bg-yellow-700' : ''}`}
                                        onClick={() => {
                                            setQuizState({ ...quizState, difficulty: 'medium' })
                                            handleDifficultySelect('medium')
                                        }}
                                        type='button'
                                    >
                                        <p className='text-white text-sm'>Medium</p>
                                    </button>
                                    <button
                                        className={`flex align-center items-center px-4 py-2 rounded-md hover:bg-gray-700 ${selectedDifficulty === 'hard' ? 'bg-red-700' : ''}`}
                                        onClick={() => {
                                            setQuizState({ ...quizState, difficulty: 'hard' })
                                            handleDifficultySelect('hard')
                                        }}
                                        type='button'
                                    >
                                        <p className='text-white text-sm'>Hard</p>
                                    </button>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center text-white border-solid border-2 hover:bg-white hover:text-gray-900 rounded-full bg-transparent px-3.5 py-2.5 font-semibold leading-7`}
                                        onClick={submit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Please wait" : "Generate Quiz"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>)}
            <ToastContainer />
        </>
    )
}

export default QuizCreation

//take-quiz/mcq/65d23bc22eb0be0bf40d332e
/*
await axios.post('/api/questions', quizState)
            .then((res) => {
                const response = res.data
                if (response.status == 200) {
                    toast.success('questions generated', {
                        position: 'bottom-right'
                    })
                } else if(response.status == 400){
                    toast.warning('Enter valid input', {
                        position: 'bottom-right'
                    })
                } else if(response.status == 429){
                    toast.error('Error in AI model', {
                        position: 'bottom-right'
                    })
                }
            })
            .catch((err)=>{
                toast.error('something went wrong', {
                    position: 'bottom-right'
                })
            })
*/