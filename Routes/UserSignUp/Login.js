import express from 'express';
import { Login } from '../../Controller/User/Login.js';

const router = express.Router();

router.post('/', Login);

export default router;
