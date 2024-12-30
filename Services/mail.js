import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Access the email from the environment variable
        pass: process.env.EMAIL_PASS, // Access the app password from the environment variable
    },
});

const sendMail = async (email, subject, text) => {
    // Log the loaded environment variables
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Not loaded");

    console.log("Mail step entered");

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to: email,                    // Recipient's email address
        subject: subject,             // Dynamic subject for the email
        text: `Hello there!\n\nYour OTP is: ${text}. It is valid for only 3 minutes, so please use it quickly to complete your process.\n\nStay safe and secure!`, // Plain text fallback
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Namaskara Devruu!</h2>
                <p>Hello there,</p>
                <p>Your OTP is: <strong style="color: #FF5722;">${text}</strong>. It is valid for only 3 minutes, so please use it quickly to complete your process.</p>
                <p>We appreciate your trust in us. Stay safe and secure!</p>
                <p>Thanking You....</p>
            </div>
        `
    };

    try {
        console.log("Mail is sending....");
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export { sendMail };
