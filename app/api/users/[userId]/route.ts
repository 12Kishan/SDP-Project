import { User } from "@/app/model/user";
import { NextResponse } from "next/server";

export async function DELETE(request:any,{ params }:any) {

    try {
        await User.deleteOne({ _id: params.userId });
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
        console.log(error)
        return NextResponse.json({
            message: "user not updated",
            statusText:"User is not found"
        }, { status: 400 })
    }
}