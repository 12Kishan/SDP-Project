import { NextResponse } from "next/server";
import { Quiz } from "@/app/model/quiz";
import { getServerSession } from "next-auth";
import { Question } from "@/app/model/question";
import mongoose from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/options";

// type Props = {
//   params: {
//     quizId: string
//   }
// }

export async function GET(req, {params}) {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({
    //     error: 'You must be logged in.'
    //   }, { status: 401 })
    // }
    console.log('session checked')

    console.log(params)
    const { quizId } = params;
    console.log(quizId)



    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return NextResponse.json({}, { status: 400 });
    }

    const quiz = await Quiz.findOne({ _id: quizId });

    if (!quiz) {
      return NextResponse.json({}, { status: 400 });
    }

    const questions = await Question.find({ quizId: quizId });
    return NextResponse.json({ quiz, questions });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }

}
