import { Quiz } from "@/app/model/quiz";
import { NextResponse } from "next/server";

export async function DELETE(request:any,{ params }:any) {

    try {
        await Quiz.deleteOne({ _id: params.quizId });
        return NextResponse.json({
            message: "quiz deleted",
            success: true
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "somthing went wrong in quiz deletion",
            success: false
        }, { status: 400 })
    }

}