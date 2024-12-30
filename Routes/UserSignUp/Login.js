import express from 'express';
import { Login } from '../../Controller/User/LoginController.js';

const router = express.Router();

router.post('/', Login);

export default router;
