import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import otpRoutes from './Routes/otproutes.js';
import newuser from './Routes/UserSignUp/signuproutes.js';
import login from './Routes/UserSignUp/Login.js';
import addGoal from './Routes/Goal.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyparser.json());

// Use Routes
app.use('/api/otp', otpRoutes);
app.use('/addNewUser',newuser);
app.use('/student-login',login);
app.use('/add-goal',addGoal);
// MongoDB Connection
const mongoUri = 'mongodb://127.0.0.1:27017/Stkit';

app.use(express.static(path.join(__dirname, '/frontend/dist'))); // Serve static files

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))); // Fallback to index.html

mongo.connect(mongoUri)
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to DB:', err);
    });
