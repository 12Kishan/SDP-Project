// Import necessary React components from the @react-email library
import React from "react";
import { Button, Html } from "@react-email/components";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/components";

// Define the functional component for the ForgotPasswordEmail template
export default function ForgotPasswordEmail({
  params,
}: {
  params: { name: string; url: string };
}) {
  // JSX structure for the email template
  return (
    <Html>
      <body className="bg-gray-100">
        <Heading as="h2"> Hello {params.name} </Heading>

        <Text>There was a request to change your password!</Text>
        <Text>If you did not make this request, please ignore this email.</Text>
        <Text>Click on the button below and enter the secret code above.</Text>
        <br></br>

        <Button
          href={params.url}
          style={{
            background: "#0E0E0E",
            color: "#FFFFFF",
            padding: 10,
            margin: 5,
            borderRadius: 12,
          }}
        >
          Reset Password
        </Button>

        <br></br>

        <Text>
          If you did not forget your password, you can ignore this email.
        </Text>

        <Heading as="h3">Regards</Heading>
        <Text>QuizBee</Text>
      </body>
    </Html>
  );
}
