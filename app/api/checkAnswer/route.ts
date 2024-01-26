import { NextRequest, NextResponse } from "next/server";
import { answerSchema } from "@/validator/quizSchema";
import { ZodError } from "zod";
import { Question } from "@/app/model/question";

// /api/checkAnswer
export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const body = await req.json()

        const { questionId, userAnswer } = answerSchema.parse(body)

        const question = await Question.findOne({ _id: questionId })

        if (!question) {
            return NextResponse.json(
                { error: 'question not found', },
                { status: 404 }
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
        }
        return NextResponse.json({
            error: 'nothing'
        },{status: 101
    })
    } catch (err) {
        if (err instanceof ZodError) {
            console.log(err.issues)
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
    }
}