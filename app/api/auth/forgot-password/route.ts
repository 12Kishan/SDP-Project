// Import necessary modules and dependencies
import { User } from "@/app/model/user";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from 'crypto-random-string';
import Crypter from "cryptr"
import Env from "@/config/Env";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { render } from "@react-email/components"
import { sendEmail } from "@/config/mail";
import { connect } from "@/app/database/mongo.config";
import { fotgotSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter"

// Connect to the MongoDB database
connect();

// Define the asynchronous POST function for handling password reset requests
export async function POST(request: NextRequest) {
    try {
        // Parse the JSON payload from the incoming request
        const payload: ForgotPassword = await request.json()

        const validator = vine.compile(fotgotSchema)
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(payload)

        // Check if a user with the given email exists
        const user = await User.findOne({ email: payload.email })
        if (user == null) {
            // Return a JSON response with a 400 status and an error message if no user is found
            return NextResponse.json({
                status: 400, errors: {
                    email: "No user found with this email"
                }
            });
        }

        // Generate a random string for the password reset signature
        const randomStr = cryptoRandomString({
            length: 64,
            type: "alphanumeric"
        })

        // Set the generated random string as the password reset signature for the user
        user.password_reset = randomStr;
        await user.save()

        // Encrypt the user's email address
        const crypt = new Crypter(Env.SECRET_KEY)
        const encryptedEmail = crypt.encrypt(user.email)

        // Construct the reset password URL with the encrypted email and password reset signature
        const url = `${Env.APP_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`


        // Render the HTML content for the password reset email using the provided template
        const html = render(ForgotPasswordEmail({
            params: {
                name: user.name,
                url: url
            }
        }))

        // Send the password reset email to the user
        await sendEmail(payload.email, "Reset Password", html)

        // Return a JSON response with a 200 status and a success message
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully. Check your email for further instructions."
        })
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({ status: 400, errors: error.messages }, { status: 200 })
        }
        // Log and return an error response if an exception occurs during email sending
        console.log("The error is ", error)
        return NextResponse.json({ status: 500, message: "Something went wrong while sending the email." })
    }
}
