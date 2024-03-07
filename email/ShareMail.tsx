// Import necessary React components from the @react-email library
import React from "react";
import { Button, Html } from "@react-email/components";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/components";


// Define the functional component for the ForgotPasswordEmail template
export default function ShareMail({ params, }: { params: { name: string, url: string } }) {
    // JSX structure for the email template
    return (
        
        <Html>
        <body className="bg-gray-100">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        
                    </div>
                    <div className="Text-8">
                        <Text className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">You&#39;re Invited to Take a Quiz Created by {params.name}</Text>
                        <Text className="mt-2 text-gray-500">This quiz is designed to be fun and engaging, and we believe you&#39;ll find it interesting.</Text>
        
                        <Heading className="font-bold text-lg mt-4">Step 1: Log In</Heading>
                        <Text className="mt-2 text-gray-600">First, you&#39;ll need to log in to the platform where the quiz is hosted. If you haven&#39;t already, please create an account or log in with your existing credentials.</Text>
        
                        <Heading className="font-bold text-lg mt-4">Step 2: Take the Quiz</Heading>
                        <Text className="mt-2 text-gray-600">Once you&#39;re logged in, you can take the quiz by clicking on the following link:</Text>
                        <Button href={params.url} 
                        style={{ background: "#0E0E0E", color: "#FFFFFF", padding: 10, margin: 5, borderRadius: 12 }}
                        >Take the Quiz Now</Button>
        
                        <Heading className="font-bold text-lg mt-4">Step 3: Attempt the Quiz</Heading>
                       
                        <Text className="mt-2 text-gray-600">We hope you enjoy the quiz! If you have any questions or need further assistance, feel free to reach out.</Text>
        
                        <Text className="mt-2 text-gray-600">Best regards,</Text>
                        <Text className="mt-2 text-gray-600">QuizBee</Text>
                    </div>
                </div>
            </div>
        </body>
        </Html>
        
    );
}
