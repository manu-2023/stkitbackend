// routes/otpRoutes.js
import express from 'express';
import { generateOTPController, verifyOTPController } from '../Controller/otpController.js';

const router = express.Router();

// Route for generating OTP
router.post('/generate-otp', generateOTPController);

// Route for verifying OTP
router.post('/verify-otp', verifyOTPController);

export default router;
