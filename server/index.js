import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.js'
import markersRoute from './routes/marker.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = DB_PASSWORD.DB_NAME;

const corsOptions = {
  origin: 'http://localhost:3000', // Замените на адрес вашего клиентского приложения
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Если вы используете сессии или куки
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRoute);
app.use('/api/markers', markersRoute);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u8hbaei.mongodb.net/stp?retryWrites=true&w=majority`
    );

    // app.get('/auth/login', (req, res) => {
    //   res.send('register - hello adam');
    // });

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();