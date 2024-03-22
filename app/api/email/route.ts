// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import ShareEmail from "@/email/ShareMail";
import { render } from "@react-email/components"
import { sendEmail } from "@/config/mail";
import { emailSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import { connect } from "@/app/database/mongo.config";

connect()
export async function POST(request: NextRequest) {
    try {
        // Parse the JSON payload from the incoming request
        const payload: { emails: string[], url: string, username: string } = await request.json();

        for (let email of payload.emails) {
            const validator = vine.compile(emailSchema);
        
            await validator.validate({ email })
        }
        const emailstring = payload.emails.join();

        // Render the HTML content for the password reset email using the provided template
        const html = render(ShareEmail({
            params: {
                name: payload.username || "Someone",
                url: payload.url
            }
        }))

        await sendEmail(emailstring, "You are invited to attempt quiz..!", html)

        // Return a JSON response with a 200 status and a success message
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully."
        })
    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
           
            return NextResponse.json({ status:400, errors: "Invalid URL" }, { status: 200 })
        }
        // Log and return an error response if an exception occurs during email sending
        
        return NextResponse.json({ message: "Something went wrong while sending the email." }, { status: 500 })
    }
}