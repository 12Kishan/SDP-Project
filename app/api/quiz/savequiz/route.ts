import { Question } from "@/app/model/question";
import { Quiz } from "@/app/model/quiz";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const { quizObj, questionArr } = body


    console.log("here quiz: ", quizObj)
    console.log("here questions: ", questionArr)

    let questionIdArr = []
    try {
        for (let question of questionArr) {
            let options = JSON.parse(question.options) as String[]
            options = options.sort(() => Math.random() - 0.5)
            question.options = JSON.stringify(options)
            console.log('loop')
            // console.log(question);
            let createdQuestion = await Question.create({...question})
            questionIdArr.push(createdQuestion._id)
        }

        const cretedQuiz = await Quiz.create({
            ...quizObj,
            questions: questionIdArr
        })

        console.log("quiz: ", quizObj)
        console.log("questions: ", questionArr)

        return NextResponse.json({ quizId: cretedQuiz._id })
        // return NextResponse.json({ questionArr })
    } catch (err) {
        return NextResponse.json({
            err
        }, {status: 500})
    }
}