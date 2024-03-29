import { NextRequest, NextResponse } from "next/server";
import { answerSchema } from "@/validator/quizSchema";
import { ZodError } from "zod";
import { Question } from "@/app/model/question";
import { QuizUsers } from "@/app/model/quiz_user";
import { QuestionUser } from "@/app/model/question_user";
import { compareTwoStrings } from "string-similarity";
import { Quiz } from "@/app/model/quiz";

// /api/checkAnswer
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    console.log(body);
    const {
      quizId,
      userId,
      questionId,
      index,
      len,
      timeTaken,
      userAnswer,
      shared,
    } = answerSchema.parse(body);

    // const questionUser = await QuestionUser.findOne({
    //   questionId,
    //   userId,
    //   quizId,
    // });
    // if(questionUser){
    //     return NextResponse.json(
    //                 { error: 'This question is already attempted', },
    //                 { status: 204 }
    //             )
    // }
    // if (quizUser) {
    //     return NextResponse.json(
    //         { error: 'Quiz already given', },
    //         { status: 404 }
    //     )
    // }

    const question = await Question.findOne(
      { _id: questionId },
      { answer: 1, questionType: 1 }
    );

    if (!question) {
      return NextResponse.json(
        { error: "question not found" },
        { status: 404 }
      );
    }

    if (index == 0) {
        const quizUser = await QuizUsers.findOne({ quizId: quizId, userId: userId })
      if(!quizUser){
        await QuizUsers.create({
            quizId,
            userId,
            shared,
            timeStarted: new Date(),
            timeTaken:timeTaken
          });
      }
      
    } else  {
      await QuizUsers.findOneAndUpdate(
        { quizId: quizId, userId: userId },
        { timeTaken: timeTaken }
      );
    }

    // const createdObj = QuestionUser.create({
    //     questionId,
    //     userId,
    //     userAnswer
    // })

    // await Question.findOneAndUpdate(
    //     { _id: questionId },
    //     { userAnswer: userAnswer }
    // )

    if (question.questionType === "mcq") {
      const isCorrect = (question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim());

      const record = await QuestionUser.findOne({
        questionId: questionId,
        userId: userId,
      });
      if (!record) {
        await QuestionUser.create({
          questionId,
          userId,
          quizId,
          userAnswer,
          isCorrect,
        });
      } else {
        return NextResponse.json(
          {
            message: "question is already attempted",status:207
          },
          { status: 207 }
        );
      }
      return NextResponse.json(
        {
          isCorrect,
        },
        { status: 200 }
      );
    } else if (question.questionType === "blanks") {
      const percent = Math.round(
        compareTwoStrings(
          userAnswer.toLowerCase().trim(),
          question.answer.toLowerCase().trim()
        ) * 100
      );
      const record = await QuestionUser.findOne({
        questionId: questionId,
        userId: userId,
      });
      if (!record) {
        await QuestionUser.create({
          questionId,
          userId,
          quizId,
          userAnswer,
          isCorrect: percent >= 70 ? true : false,
        });
      } else {
        return NextResponse.json(
          {
            message: "question is already attempted",status:207
          },
          { status: 207 }
        );
      }
      return NextResponse.json(
        {
          percent,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        error: "nothing",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err)
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ err }, { status: 400 });
  }
}
