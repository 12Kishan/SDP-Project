import { connect } from "@/app/database/mongo.config";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter"
import bcrypt from "bcryptjs"
import { User } from "@/app/model/user";
import { messages } from "@vinejs/vine/defaults";

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const validator = vine.compile(registerSchema)
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(body)

        //checking email if there is already exist or not
        const user = await User.findOne({ email: output.email })
        if (user) {
            return NextResponse.json({
                status: 400,
                errors: {
                    email: "Email is already exist"
                }
            }, { status: 200 })
        } else {
            //Encrypt password before storing into DB
            const salt = bcrypt.genSaltSync(10)
            output.password = bcrypt.hashSync(output.password, salt)

            // adding into database
            await User.create(output);

            return NextResponse.json({
                status: 200,
                message: "User created successfully. Please login..!"
            }, { status: 200 })
        }
    } catch (err) {
        if (err instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, errors: err.messages }, { status: 200 })
        }
    }
}