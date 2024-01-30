import { NextResponse } from "next/server"
import { quizSchema } from "@/validator/quizSchema"
import { ZodError } from "zod"
import { generate_mcq, generate_blanks } from "@/app/lib/myGpt"


// /api/question
export async function POST(req: Request, res: Response) {
    try {

        const body = await req.json()

        // destructure and validate request body
        const { amount, topic, type, difficulty } = quizSchema.parse(body)
        console.log(amount + " " + difficulty + " " + topic + " " + type)
        // if no exception validation succeed
        let questions: any

        // generating blank questions.
        if (type === "blanks") {
            questions = await generate_blanks(
                `strictly provide random fill the blanks questions on topic:${topic}, no. of questions: ${amount}, difficulty: ${difficulty}`
            )
        } else if (type === 'mcq') { // generating mcq questions
            questions = await generate_mcq(
                `Strictly adhere to the specified difficulty level when generating questions. Provide random MCQs on topic: ${topic}, number of MCQs: ${amount}, difficulty: ${difficulty}.  Ensure unique options and that the correct answer is not repeated among the options`
            )
        }
        try {
            questions = JSON.parse(questions)
        } catch (err) {
            console.log('parse error')
            return NextResponse.json({
                message: 'server error'
            }, { status: 500 })
        }
        // console.log(questions)
        return NextResponse.json({
            questions
        }, { status: 200 })
    } catch (err) {
        if (err instanceof ZodError) {
            console.log(err.issues)
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
        return NextResponse.json({ err }, { status: 500 })
    }
}