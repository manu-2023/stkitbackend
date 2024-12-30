import Student from '../../Models/User/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Login = async (req, res) => {
    const { user_email, user_password } = req.body;
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded Token Details:', decoded); // Log the complete decoded token details
            return res.status(200).json({
                message: 'User already logged in',
                user: decoded,
                user_data: {
                    name: decoded.name,
                    email: decoded.email,
                    goal: decoded.goal
                },
            });
        } catch (err) {
            return res.status(400).json('Token has expired, please log in again');
        }
    }

    try {
        const existingUser = await Student.findOne({ user_email });
        if (!existingUser) {
            return res.status(400).send('User Not registered Yet !! Please Sign Up');
        } else {
            if (user_password !== existingUser.normal_password) {
                return res.status(400).send('Incorrect Password !!');
            } else {
                const token = jwt.sign(
                    { 
                        id: existingUser._id, 
                        email: existingUser.user_email, 
                        name: existingUser.user_name, 
                        goal: existingUser.user_goal,
                        usertype: existingUser.user_type 
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '5d' }
                );

                return res.status(200).json({
                    message: 'Login Successful',
                    token,
                    user_data: {
                        usertype: existingUser.user_type,
                        email: existingUser.user_email,
                        name: existingUser.user_name,
                        goal: existingUser.user_goal
                    }
                });
            }
        }
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(400).send('Error While Login');
    }
};

export { Login };
