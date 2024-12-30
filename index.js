import express from 'express';
import mongo from 'mongoose';
import cors from 'cors';
import bodyparser from 'body-parser';
import otpRoutes from './Routes/otproutes.js';
import newuser from './Routes/UserSignUp/signuproutes.js';
import login from './Routes/UserSignUp/Login.js';
import addGoal from './Routes/Goal.js';
import { MongoClient, ServerApiVersion } from 'mongodb';


// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyparser.json());

// Use Routes
app.use('/api/otp', otpRoutes);
app.use('/addNewUser', newuser);
app.use('/student-login', login);
app.use('/add-goal', addGoal);

// MongoDB Connection (Local DB - Mongoose)
const mongoUriLocal = 'mongodb://127.0.0.1:27017/Stkit';

// MongoDB Connection (Atlas DB - MongoClient)
const mongoUriAtlas = "mongodb+srv://manu777:13091309ManuM@cluster0.u4k04.mongodb.net/myDatabase?retryWrites=true&w=majority";


// Mongoose connection (for local MongoDB)
// mongo.connect(mongoUriLocal)
//   .then(() => {
//     console.log('Connected to Local DB');
//     app.listen(PORT, () => {
//       console.log(`Server started at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Error connecting to Local DB:', err);
//   });

// MongoClient connection (for MongoDB Atlas)
const client = new MongoClient(mongoUriAtlas, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your MongoDB Atlas deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
