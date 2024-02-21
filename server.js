import dotenv from "dotenv";
// require("dotenv").config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import  './config/dbConnection.js';
import userRouter from './routes/userRoute.js';
import stackRouter from './routes/stackRoute.js';
import companyRouter from './routes/companyRoute.js';

// const express = require('express');
// const cors = require('cors');
// require('./config/dbConnection');

dotenv.config();
const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

app.use('/api', userRouter);
app.use('/api', companyRouter);
app.use('/api', stackRouter);
//error handling
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });

});

app.listen(3000, ()=> console.log('Server is running on port 3000'));
