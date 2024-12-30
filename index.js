// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import otpRoutes from './Routes/otproutes.js';
import newuser from './Routes/UserSignUp/signuproutes.js';
import login from './Routes/UserSignUp/Login.js';
import addGoal from './Routes/Goal.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express(); 

const port = process.env.PORT || 5000;
const mongoUriAtlas = process.env.MONGO_URI;

console.log('Mongo URI:', mongoUriAtlas); // Debugging log

// Middleware
app.use(cors());
app.use(bodyparser.json());

// Use Routes
app.use('/api/otp', otpRoutes);
app.use('/addNewUser', newuser);
app.use('/student-login', login);
app.use('/add-goal', addGoal);

// MongoDB Connection (Atlas DB)
mongoose.connect(mongoUriAtlas)
    .then(() => {
        console.log('Pinged your MongoDB Atlas deployment. You successfully connected to MongoDB!');
        
        // Start the server after successful MongoDB connection
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Example Route
app.get('/', (req, res) => {
    res.send('Hello World!');
})
