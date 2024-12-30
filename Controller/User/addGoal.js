import User from '../../Models/User/UserModel.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const addGoal = async (req, res) => {
    const { goal_data } = req.body;
    console.log('Request Body:', req.body);

    if (!goal_data || goal_data.length < 10) {
        return res.status(400).json({ message: 'Goal data must be at least 10 characters long' });
    }

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.user_goal = goal_data;
        await user.save();

        const updatedUser = await User.findById(userId);
        const newToken = jwt.sign(
            { id: updatedUser._id, email: updatedUser.user_email, goal: updatedUser.user_goal, name: updatedUser.user_name },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );

        return res.status(200).json({
            message: 'Goal added successfully',
            user_data: {
                name: updatedUser.user_name,
                goal: updatedUser.user_goal
            },
            token: newToken
        });
    } catch (error) {
        console.error('Error adding goal:', error);
        return res.status(500).json({ message: 'Error adding goal' });
    }
};

