// Controller/User/usersignup.js

import bcrypt from 'bcryptjs';
import AddUserSignUp from '../../Models/User/UserModel.js';

export const UserSignUp = async (req, res) => {
    try {
        const { user_name, user_dob, user_email, user_number, user_password } = req.body;
        console.log(user_name, user_dob, user_email, user_number, user_password);

        const existingemail = await AddUserSignUp.findOne({ user_email });
        const existingnumber = await AddUserSignUp.findOne({ user_number });

        if (existingemail) {
            console.log("found email");
            return res.status(400).json({ message: 'Email Already exists' });
        }

        if (existingnumber) {
            console.log("found number");
            return res.status(400).json({ message: 'Mobile number already exists' });
        } else {
            const normal_password = user_password;
            const hashedPassword = await bcrypt.hash(user_password, 10);
            console.log("password generated", hashedPassword);
            const newuser = new AddUserSignUp({
                user_name,
                user_dob,
                user_password: hashedPassword,
                user_email,
                user_number,
                user_type: 'Normal',
                normal_password,
                user_goal: '',
                count: 0,
            });

            console.log(newuser);
            await newuser.save();
            console.log("Account saved");
            return res.status(200).json({ message: 'Account Created Successfully' });
        }
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
};
