import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Ensure credentials are provided
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Nodemailer configuration error: EMAIL_USER or EMAIL_PASS is missing.');
    // Optionally, throw an error to prevent silent failures
    // throw new Error('Missing email credentials');
}

export default transporter;