import { QuestionUser } from "@/app/model/question_user";
import { Quiz } from "@/app/model/quiz";
import { QuizUsers } from "@/app/model/quiz_user";
import { User } from "@/app/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request:any,{ params }:any) {

    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.isAdmin) {
          return NextResponse.json({
            error: 'You must be logged as admin.'
          }, { status: 401 })
        }
        await User.deleteOne({ _id: params.userId });
        await QuizUsers.deleteMany({userId:params.userId});

        const quizuser =await QuizUsers.find({useId:params.userId});

        await Promise.all(quizuser.map(async(quizuser)=>{
            if(!quizuser.shared){
                await Quiz.deleteOne({_id:quizuser.quizId});
            }
            await Quiz.deleteOne({_id:quizuser._id});
        }))
        await QuestionUser.deleteMany({userId:params.userId});
        return NextResponse.json({
            message: "user deleted",
            success: true
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "somthing went wrong",
            success: false
        }, { status: 400 })
    }

}

export async function PUT(request:any, { params }:any) {

    try {
        const session = await getServerSession(authOptions)
        if (!session?.user.isAdmin) {
          return NextResponse.json({
            error: 'You must be logged as admin.'
          }, { status: 401 })
        }
        const { userId } = params;
        const { isAdmin } = await request.json();
        const user = await User.findById(userId);

        if (isAdmin == false || isAdmin == true) { user.isAdmin = true; }

        const updatedUser = await user.save();
        return NextResponse.json(updatedUser, {
            status: 200,
            statusText: "user updated successfully",
        })

    } catch (error) {
    
        return NextResponse.json({
            message: "user not updated",
            statusText:"User is not found"
        }, { status: 400 })
    }
}
// { params:{userId:string}}

export async function GET(req:any, { params }: { params: { userId: string } }){
    try {   
        
   
        const {userId} = params;
        const user = await User.findOne({_id:userId});
        return NextResponse.json(user , {
        status:200,
        statusText:"user found successfully"
    });
    } catch (error) {
        return NextResponse.json({
            message:"user not found",
            success:false
        })
    }
    
}