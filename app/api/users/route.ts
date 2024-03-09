import { User } from "@/app/model/user";
import { NextResponse } from "next/server";
import { connect } from "@/app/database/mongo.config";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

connect();

export async function GET(req:any){
    const session = await getServerSession(authOptions)
        if (!session?.user.isAdmin) {
          return NextResponse.json({
            error: 'You must be logged as admin.'
          }, { status: 401 })
        }

    let users = [];
    try {
        users = await User.find();
        return NextResponse.json({users,status:200});
    } catch (error) {
        return NextResponse.json({
            message : "error occured while fetching data" , 
            status:500
        });
    }
    
}