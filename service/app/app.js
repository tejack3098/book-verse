import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import initRoutes from './routers/index.js';
import dotenv from 'dotenv';
dotenv.config();



const init = (app) => {
    app.use(cors()); // Enable CORS
    app.use(express.json()); // Parse JSON request bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

    mongoose.connect(process.env.MONGO_CONNECTION); // Connect to MongoDB
    initRoutes(app); // Initialize routes
    

}

export default init;