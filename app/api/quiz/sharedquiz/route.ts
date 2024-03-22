import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { quizSchema } from "@/validator/quizSchema";
import axios from "axios";
import { QuizType } from "@/app/model/question";
import { QuizDifficulty } from "@/app/model/quiz";
import { ZodError } from "zod";

export async function POST(req: NextRequest, res: NextResponse){
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({
                error: 'You must be logged in.'
            }, { status: 401 })
        }

        // console.log('session checked')


        const body = await req.json()
    
        const { amount, topic, type, difficulty } = quizSchema.parse(body)

        const generatedQuestions = await axios.post(`${process.env.APP_URL}/api/questions`, {
            amount, topic, type, difficulty
        })

        const quizObj = {
            // userId:session?.user.id,
            type: type || QuizType.MCQ,
            topic: topic,
            difficulty: difficulty || QuizDifficulty.Easy,
            shared: true
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
                return {
                    questionType: 'mcq',
                    question: question.question,
                    answer: question.answer,
                    options: JSON.stringify(options)
                }
            })
         
            return NextResponse.json({
                quizObj: quizObj,
                questionArr: mcqArray
            },{status:200})
            
        } else if (type === 'blanks') {
            type Blank = {
                question: string
                answer: string
            }
            let blankArray = generatedQuestions.data.questions.questions.map((question: Blank) => {
                return {
                    questionType: 'blanks',
                    question: question.question,
                    answer: question.answer
                }
            })
         
            return NextResponse.json({
                quizObj: quizObj,
                questionArr: blankArray
            }, { status: 200 })
        }
    } catch (err) {
        if (err instanceof ZodError) {
          
            return NextResponse.json(
                { error: err.issues, },
                { status: 400 }
            )
        }
        //exception in questions fetching
   
        return NextResponse.json({
            error: err
        }, { status: 500 })
    }
}