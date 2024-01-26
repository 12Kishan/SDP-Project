import { connect } from "@/app/database/mongo.config";
import { Quiz } from "@/app/model/quiz";
import { NextResponse } from "next/server";


connect()
export async function GET(req:any, { params }: { params: { userId: string } }){

    try{
        console.log(params);
        const {userId} = params;
        const quizes = await Quiz.find({userId:userId})
        return NextResponse.json(quizes, {
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