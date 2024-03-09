import { Quiz } from "@/app/model/quiz";
import { NextResponse } from "next/server";
import { Question } from "@/app/model/question";
import { QuestionUser } from "@/app/model/question_user";
import { QuizUsers } from "@/app/model/quiz_user";

export async function DELETE(request: any, { params }: any) {
    try {
      const quiz = await Quiz.findOne({ _id: params.quizId });
      const questionIds = quiz.questions;
      await Promise.all(
        questionIds.map(async (questionId: string) => {
          
          await Question.deleteOne({ _id: questionId });
          await QuestionUser.deleteOne({})
        })
      );

      await Quiz.deleteOne({ _id: params.quizId });
  
      return NextResponse.json(
        {
          message: "quiz deleted",
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        {
          message: "somthing went wrong in quiz deletion",
          success: false,
        },
        { status: 400 }
      );
    }
  }
  export async function GET(req:any, { params }: { params: { quizId : string } }){

    try{

      
        console.log(params);
        const {quizId} = params;
        // Find quiz objects in QuizUsers based on quizId
        const quizUsers = await QuizUsers.find({ userId :quizId });

        // Extract userIds from the found quiz objects
        const userIds = quizUsers.map((quizUser: any) => quizUser.quizId);
        
        // Find quizzes based on the extracted userIds
        const quizzes = await Quiz.find({ _id: { $in: userIds } });


        return NextResponse.json(quizzes, {
            status:200,
            statusText:"quiz found successfully"
        });
    }
    catch(error)
    {
        console.log(error)
        return NextResponse.json({
            message: "somthing went wrong",
            success: false
        }, { status: 400 })
    }
}
  