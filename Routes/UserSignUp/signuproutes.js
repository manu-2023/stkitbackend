import express from 'express';
import { UserSignUp } from '../../Controller/User/usersignup.js';

const router = express.Router();

router.post('/', UserSignUp);

export default router;
