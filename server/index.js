import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from './routes/auth.js'
import markersRoute from './routes/marker.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = DB_PASSWORD.DB_NAME;

const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: 'http://95.163.237.80',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

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