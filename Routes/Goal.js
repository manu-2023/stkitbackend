// Router.js
import express from 'express';
<<<<<<< HEAD
import { addGoal } from '../Controller/User/addGoal.js'
=======
import {addGoal} from '../Controller/User/addGoal.js'; // Adjust path if needed

>>>>>>> 31fc36e5ace727f51770adba36895a692470099c
import {authenticateToken} from '../Middlewear/authenticateToken.js'; // Adjust path as needed

const router = express.Router();

// Apply authenticateToken middleware to the addGoal endpoint
router.post('/', authenticateToken, addGoal);

export default router;
