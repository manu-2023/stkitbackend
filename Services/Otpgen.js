import OTP from '../Models/OtpModel.js';
import { sendMail } from './mail.js';

// Generate OTP function
const generateOTP = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    console.log("Generated OTP:", otp); // Log the OTP for debugging

    // Get current time in UTC and adjust it for IST (UTC +5:30)
    const now = new Date();
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const ISTTime = new Date(now.getTime() + IST_OFFSET);

    // Set OTP expiration time (5 minutes from the current IST time)
    ISTTime.setMinutes(ISTTime.getMinutes() + 1); // Add 5 minutes

    console.log("OTP Expiration Time (IST):", ISTTime); // Log expiration time for debugging

    const otpData = new OTP({
        email,
        otp,
        expiresAt: ISTTime, // Save in IST
    });

    try {
        // Save OTP to the database
        console.log("Trying to save OTP to DB...");
        await otpData.save();
        console.log("OTP saved successfully");

        // Send OTP via email
        console.log("Sending OTP email...");
        await sendMail(email, "Your OTP is valid for only 5 minutes", otp.toString()); // Pass OTP as text
        console.log("OTP email sent successfully");
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw new Error('Error generating OTP');
    }
};

export { generateOTP };
