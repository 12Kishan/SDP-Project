// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import ShareEmail from "@/email/ShareMail";
import { render } from "@react-email/components"
import { sendEmail } from "@/config/mail";
import { connect } from "@/app/database/mongo.config";
import { emailSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import { authOptions } from "../auth/[...nextauth]/options";


// Connect to the MongoDB database
connect();

// Define the asynchronous POST function for handling password reset requests
export async function POST(request: NextRequest) {

    const validator = async(email:String)=>{

        const validator = vine.compile(emailSchema);
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(email)

    }


    try {

        const session = await getServerSession(authOptions)
        console.log("this is session",session)
        // if (!session?.user) {
        //     return NextResponse.json({
        //         error: 'You must be logged in.'
        //     }, { status: 401 })
        // }
        console.log('session checked')
        const user = session?.user;


        // Parse the JSON payload from the incoming request
        const payload: { emails: string[], url: string} = await request.json();
       
        for(let email in payload.emails)
        {
            validator(email);
        }

        

        // Construct the reset password URL with the encrypted email and password reset signature
        
        const emailstring = payload.emails.join();

        // Render the HTML content for the password reset email using the provided template
        const html = render(ShareEmail({
            params: {
                name: user?.name || "Someone" ,
                url: payload.url
            }
        }))

        // Send the password reset email to the user
        await sendEmail(emailstring, "Reset Password", html)

        // Return a JSON response with a 200 status and a success message
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully. Check your email for further instructions."
        })
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return NextResponse.json({status:400, errors: error.messages }, { status: 200 })
        }
        // Log and return an error response if an exception occurs during email sending
        console.log("The error is ", error)
        return NextResponse.json({message: "Something went wrong while sending the email." },{ status: 500 })
    }
}
