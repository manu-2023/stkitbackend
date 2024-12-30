import express from 'express';
import { addGoal } from '../Controller/User/addGoal.js'
import {AuthenticateToken} from '../Middlewear/AuthenticateToken.js'
const router = express.Router();

// Apply authenticateToken middleware to the addGoal endpoint
router.post('/', AuthenticateToken, addGoal);

export default router;
