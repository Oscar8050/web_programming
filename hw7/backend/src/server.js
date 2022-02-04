import mongoose from 'mongoose';
import ScoreCard from './models/ScoreCard';
import connection from './mongo.js';
import express from "express";
import cors from 'cors';
import router from './routes/index';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use('/', router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is up in port ${port}.`)
});

connection();


