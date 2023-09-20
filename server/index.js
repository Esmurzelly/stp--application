import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import bcrypt from 'bcryptjs';

import UserModel from './models/User.js';

import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = DB_PASSWORD.DB_NAME;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u8hbaei.mongodb.net/stp?retryWrites=true&w=majority`
    );

    // app.get('/auth/register', (req, res) => {
    //   res.send('register - hello adam');
    // });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();