// controllers/otpController.js
import { generateOTP } from '../Services/Otpgen.js';
import { verifyOTP } from '../Services/VerifyOtpService.js';

// Controller to handle OTP generation
const generateOTPController = async (req, res) => {
    const { email } = req.body;
    console.log(email, "something")
    try {
        const result = await generateOTP(email);
        console.log(result, "Else no");
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Controller to handle OTP verification
const verifyOTPController = async (req, res) => {
    const { email, enterdOTP } = req.body;
    try {
        const result = await verifyOTP(email, enterdOTP);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export { generateOTPController, verifyOTPController };
