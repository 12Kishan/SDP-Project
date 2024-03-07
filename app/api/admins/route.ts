import { User } from "@/app/model/user";
import { NextResponse } from "next/server";
import { connect } from "@/app/database/mongo.config";

connect();

export async function GET(req:any){
    let users = [];
    try {
        users = await User.find({isAdmin:true});
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({
            message : "error occured while fetching data" , 
            status:false
        });
    }
    
}