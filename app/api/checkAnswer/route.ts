import { NextRequest, NextResponse } from "next/server";
import { answerSchema } from "@/validator/quizSchema";
import { ZodError } from "zod";
import { Question } from "@/app/model/question";
import { compareTwoStrings } from 'string-similarity'
import { Quiz } from "@/app/model/quiz";

// /api/checkAnswer
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json()
        console.log(body)

        const { questionId, index, len, timeTaken, userAnswer } = answerSchema.parse(body)
        
        const question = await Question.findOne({ _id: questionId })

        if (!question) {
            return NextResponse.json(
                { error: 'question not found', },
                { status: 404 }
            )
        }

        if (index == len - 1) {
            console.log('change here')
            await Quiz.findOneAndUpdate(
                { _id: question.quizId },
                { timeTaken: timeTaken }
            )
        }

        await Question.findOneAndUpdate(
            { _id: questionId },
            { userAnswer: userAnswer }
        )

        if (question.questionType === 'mcq') {
            const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
            await Question.findOneAndUpdate(
                { _id: questionId },
                { isCorrect: isCorrect }
            )

            return NextResponse.json({
                isCorrect
            }, { status: 200 })
        } else if (question.questionType === 'blanks') {
            const percent = Math.round(compareTwoStrings(userAnswer.toLowerCase().trim(), question.answer.toLowerCase().trim()) * 100)
            await Question.findOneAndUpdate(
                { _id: questionId },
                { percentageCorrect: percent, isCorrect: percent >= 70 ? true : false }
            )
            return NextResponse.json({
                percent
            }, { status: 200 })
        }
        return NextResponse.json({
            error: 'nothing'
        }, { status: 200 })
    } catch (err) {
        console.log(err)
        if (err instanceof ZodError) {
            console.log('zod: ', err.issues)
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
    }
}