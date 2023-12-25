import { connect } from "@/app/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter"
import bcrypt from "bcryptjs"
import { User } from "@/app/model/user";
import { messages } from "@vinejs/vine/defaults";
connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const validator = vine.compile(loginSchema)
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(body)

        // check in DB
        const user = await User.findOne({ email: output.email })
        if (user) {
            const checkPass = bcrypt.compareSync(output.password!, user.password)
            if (checkPass) {
                return NextResponse.json({
                    status: 200,
                    message: "User found"
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    status: 400,
                    errors: {
                        password: "Incorrect Password"
                    }
                }, { status: 200 })
            }
        } else {
            return NextResponse.json({
                status: 400,
                errors: {
                    email: "User not found"
                }
            }, { status: 200 })
        }

        return NextResponse.json(output);
    } catch (err) {
        if (err instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, errors: err.messages }, { status: 200 })
        }
    }
}