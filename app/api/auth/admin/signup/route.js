import { connect } from "@/app/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validator/authSchema";

import ErrorReporter from "@/validator/ErrorReporter"
import bcrypt from "bcryptjs"
import { User } from "@/app/model/user";

connect();


export async function POST(request) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync("Kishan@123", salt);
    await User.create({
        email: "c@c.com",
        password: password,
        name: "Admin",
        isAdmin: true,
    });

    return NextResponse.json({
        status: 200,
        message: "Admin created successfully",
    });
}