// Import the nodemailer library for sending emails
import nodemailer from 'nodemailer';

// Import the 'Env' module for accessing environment variables
import Env from './Env';

// Import the 'promises' module from 'dns' for handling promises
import { promises } from 'dns';

// Create a nodemailer transporter with the provided SMTP configuration
export const transporter = nodemailer.createTransport({
  host: Env.SMTP_HOST,
  port: Number(Env.SMTP_PORT),
  secure: false,  // Assuming you are using TLS, set to 'true' if using SSL
  auth: {
    user: Env.SMTP_USER,
    pass: Env.SMTP_PASSWORD,
  },
});

// Function to send an email using the configured transporter
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<string | null> => {
  // Send the email and wait for the result
  const info = await transporter.sendMail({
    from: Env.SMTP_FROM,
    to: to,
    subject: subject,
    html: html
  });

  // Return the message ID if available, otherwise, return null
  return info?.messageId;
};
