import { connect } from "@/app/database/mongo.config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { quizSchema } from "@/validator/quizSchema";
import { ZodError } from "zod";
import { Quiz, QuizDifficulty, QuizType } from "@/app/model/quiz";
import { Question } from "@/app/model/question";
import axios from "axios";
import mongoose from "mongoose";

connect()

// /api/quiz
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // protecting route
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({
                error: 'You must be logged in.'
            }, { status: 401 })
        }
        console.log('session checked')


        const body = await req.json()
        console.log('req. body: ', body)


        const { amount, topic, type, difficulty } = quizSchema.parse(body)

        console.log('before quiz')
        const quiz = await Quiz.create({
            type: type || QuizType.MCQ,
            userId: new mongoose.Types.ObjectId(session.user.id),
            topic: topic,
            difficulty: difficulty || QuizDifficulty.Easy,
            shared:false
        })
        console.log('quiz created')

        // fetching questions from our rest API
        const generatedQuestions = await axios.post(`${process.env.APP_URL}/api/questions`, {
            amount, topic, type, difficulty
        })
        if (generatedQuestions.status == 500) {
            return NextResponse.json({
                error: 'Internal server error'
            }, { status: 500 })
        }
        if (type === 'mcq') {
            type MCQ = {
                question: string
                answer: string
                option1: string
                option2: string
                option3: string
            }
            let mcqArray = generatedQuestions.data.questions.questions.map((question: MCQ) => {
                let options = [question.answer, question.option1, question.option2, question.option3]
                //shuffle options
                options = options.sort(() => Math.random() - 0.5)
                return {
                    // id: new mongoose.Types.ObjectId(),
                    questionType: 'mcq',
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options),
                    quizId: quiz._id
                }
            })
            let mcqIdArr = []
            console.log('MCQ array: ', mcqArray)
            // storing mcq
            for (let mcq of mcqArray) {
                let createdMCQ = await Question.create(mcq)
                mcqIdArr.push(createdMCQ._id)
            }
            await Quiz.findByIdAndUpdate(quiz._id, {$push:{questions: {$each: mcqIdArr}}}, {new: true})
            console.log('mcq created')
        } else if (type === 'blanks') {
            type Blank = {
                question: string
                answer: string
            }
            let blankArray = generatedQuestions.data.questions.questions.map((question: Blank) => {
                return {
                    questionType: 'blanks',
                    question: question.question,
                    answer: question.answer,
                    quizId: quiz._id
                }
            })
            let blankIdArr = []
            console.log('blank array: ', blankArray)
            // storing blanks
            for (let blank of blankArray) {
                let createdBlank = await Question.create(blank)
                blankIdArr.push(createdBlank._id)
            }
            await Quiz.findByIdAndUpdate(quiz._id, { $push: { questions: { $each: blankIdArr } } }, { new: true })
            console.log('blanks created')
        }
        console.log('response here')
        return NextResponse.json({
            quizId: quiz._id
        }, { status: 200 })
    } catch (err) {
        if (err instanceof ZodError) {
            console.log(err.issues)
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
        //exception in questions fetching
        console.log(err)
        return NextResponse.json({
            error: err
        }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({user:23456},{status: 200})
} 