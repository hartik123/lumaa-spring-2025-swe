import SignUpRoute from './routes/SignUpRoute.js';
import LoginRoute from './routes/LoginRoute.js';
import TaskRoute from './routes/TaskRoute.js';
import VerifyToken from './VerifyToken.js';

import express from 'express';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import userinfoModel from './models/signUpModel.js';
dotenv.config();

const app = express();
const PORT = 8000;

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get('/', (req, res) => {
    res.send("Hello Hartik");
});

// APIs
app.use('/api', SignUpRoute);
app.use('/api', LoginRoute);

app.use('/api/task/', VerifyToken, TaskRoute);


app.listen(process.env.PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);