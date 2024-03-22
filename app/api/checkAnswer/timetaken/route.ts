import { NextRequest, NextResponse } from "next/server";
import { answerSchema } from "@/validator/quizSchema";
import { ZodError } from "zod";
import { QuizUsers } from "@/app/model/quiz_user";


// /api/checkAnswer
export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const body = await req.json();
        const {
            quizId,
            userId,
            timeTaken,
          } = body;

          console.log(body);
          const quizUser = await QuizUsers.findOne({ quizId: quizId, userId: userId})

          if(quizUser)
          {
              await QuizUsers.findOneAndUpdate(
                  { quizId: quizId, userId: userId },
                  { timeTaken: timeTaken }
                  );
                  return NextResponse.json(
                    {
                        message: "time updated",status:200
                      },
                    { status: 200 }
                  )
        }
        else{
            throw new Error("you can not eccess this")
        }
    }
    catch (err) {
        console.log(err)
        if (err instanceof ZodError) {
          return NextResponse.json({ error: err.issues }, { status: 400 });
        }
        return NextResponse.json({ err }, { status: 400 });
      }

}