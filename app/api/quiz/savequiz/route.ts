import { Question } from "@/app/model/question";
import { Quiz } from "@/app/model/quiz";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const { quizObj, questionArr } = body


    let questionIdArr = []
    try {
        const createdQuiz: any = await Quiz.create({
            ...quizObj,
            date:new Date()
        })
        
        if (quizObj.type === 'mcq') {
            for (let question of questionArr) {
                let options = JSON.parse(question.options) as String[]
                options = options.sort(() => Math.random() - 0.5)
                question.options = JSON.stringify(options)
                question.quizId = createdQuiz._id
           
                // console.log(question);
                let createdQuestion = await Question.create({ ...question })
                questionIdArr.push(createdQuestion._id)
            }
        } else if (quizObj.type === 'blanks') {
            for (let question of questionArr) {
                question.quizId = createdQuiz._id
                let createdQuestion = await Question.create({ ...question })
                questionIdArr.push(createdQuestion._id)
            }
        }

        await Quiz.findByIdAndUpdate(createdQuiz._id, { $push: { questions: { $each: questionIdArr } } }, { new: true })

      
        return NextResponse.json({ quizId: createdQuiz._id })
        // return NextResponse.json({ questionArr })
    } catch (err) {
        return NextResponse.json({
            err
        }, {status: 500})
    }
}