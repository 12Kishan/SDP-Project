import { NextResponse } from "next/server"
import { quizSchema } from "@/validator/quizSchema"
import { ZodError } from "zod"
import { strict_output } from "@/app/lib/gpt"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import { requestToBodyStream } from "next/dist/server/body-streams"

export async function POST(req: Request, res: Response) {
    try {
        // checking session on server side, to ensure no one is spamming
        // const session = await getServerSession(authOptions)
        // if (!session?.user) {
        //     return NextResponse.json({
        //         error: 'You uave to log in for creating quiz.'
        //     }, { status: 400 })
        // }
        // getting req body
        const body = await req.json()

        // destructure and validate request body
        const { amount, topic, type, difficulty } = quizSchema.parse(body)
        console.log(amount + " " + difficulty + " " + topic + " " + type)
        // if no exception validation succeed
        let questions: any

        // generating blank questions.
        if (type === "blanks") {
            questions = await strict_output(
                'You are a helpful AI that is able to generate a pair of questions and answers, the length of answer should not exceed 15 words, Store all the pairs of quations and answers in JSON array.',
                new Array(amount).fill(`You have to generate random ${difficulty} level open-ended question about ${topic}`),
                {
                    question: 'question',
                    answer: 'answer with max length of 15 words.'
                }
            )
        } else if (type === 'mcq') { // generating mcq questions
            questions = await strict_output(
                'You are a helpful AI that is able to generate MCQ questions its answer and options, the length of each option and answer should not exceed 15 words, Store all the pairs of quations, answers and options in JSON array.',
                new Array(amount).fill(`You have to generate random ${difficulty} level MCQ question about ${topic}`),
                {
                    question: 'question',
                    answer: 'answer with max length of 15 words.',
                    option1: '1st option with max length of 15 words',
                    option2: '2nd option with max length of 15 words',
                    option3: '3rd option with max length of 15 words'
                }
            )
        }
        console.log(questions)
        return NextResponse.json({
            questions
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        if (err instanceof ZodError) {
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
        return NextResponse.json({ err }, { status: 500 })
    }
}