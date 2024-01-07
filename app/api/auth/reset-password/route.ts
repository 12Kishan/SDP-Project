
import { User } from "@/app/model/user";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr"
import Env from "@/config/Env";
import bcrypt from "bcryptjs"
import { connect } from "@/app/database/mongo.config";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter"
import { resetSchema } from "@/validator/authSchema";
// Establish a database connection (assuming the 'connect()' function does that)
connect();

// Define an asynchronous function to handle POST requests
export async function POST(request: NextRequest) {

    try {
        // Parse JSON payload from the incoming request
        const payload: ResetPassword = await request.json()

        // Validate the payload against a predefined schema using 'vine' library
        const validator = vine.compile(resetSchema)
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(payload)

        // Decrypt the email using a secret key
        const crypter = new Cryptr(Env.SECRET_KEY);
        const email = crypter.decrypt(payload.email);

        // Find a user with the decrypted email and matching password reset signature
        const user = await User.findOne({
            email: email,
            password_reset: payload.signature,
        });

        // Check if a user is found; if not, return an error response
        if (user == null || user == undefined) {
            return NextResponse.json({
                status: 400,
                message: "Reset URL is not correct. Please double-check it.",
            });
        }

        // Generate a new salt and update the user's password with a hashed version
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(payload.password, salt);
        user.password_reset = null;
        await user.save();

        // Return a success response after updating the password
        return NextResponse.json({
            status: 200,
            message: "Password changed successfully. Please login with the new password.",
        });
    } catch (err) {
        // Handle validation errors and return a JSON response with the error details
        if (err instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, errors: err.messages }, { status: 200 })
        }
    }
}
