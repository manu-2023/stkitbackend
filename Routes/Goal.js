import express from 'express';
import { addGoal } from '../Controller/User/addGoal.js'
import {authenticateToken} from '../Middlewear/authenticateToken.js'; // Adjust path as needed

const router = express.Router();

// Apply authenticateToken middleware to the addGoal endpoint
router.post('/', authenticateToken, addGoal);

export default router;
