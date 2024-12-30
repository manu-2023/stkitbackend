import OTP from '../Models/OtpModel.js';

// Verify OTP function
const verifyOTP = async (email, enteredOTP) => {
    try {
        const otpDocument = await OTP.findOne({ email })
                                    .sort({ createdAt: -1 })
                                    .limit(1);
        console.log(otpDocument);
        console.log(enteredOTP);

        if (!otpDocument) {
            throw new Error('No OTP found for this email');
        }

        // Check if OTP has expired
        if (Date.now() > otpDocument.expiresAt) {
            await OTP.deleteOne({ email }); // Delete expired OTP
            throw new Error('OTP has expired');
        }
        console.log(otpDocument.otp.toString(), enteredOTP);

        // Check if entered OTP matches the stored OTP
        if (enteredOTP === otpDocument.otp.toString()) {
            await OTP.deleteOne({ email }); // Delete OTP after successful verification
            return { success: true, message: 'OTP verified successfully' };
        }

        throw new Error('Invalid OTP');
    } catch (error) {
        throw error;
    }
};

export { verifyOTP };
