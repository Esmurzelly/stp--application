import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
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
const DB_NAME = process.env.DB_NAME;

const corsOptions = {
  origin: 'http://localhost:3000',
  // origin: 'https://besafeapp.ru',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};


app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('static'));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use('/api/auth', authRoute);
app.use('/api/markers', markersRoute);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u8hbaei.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();