import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/auth.routes.js';
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import boatRouter from './routes/boat.routes.js';
import ownRouter from './routes/own.routes.js';

const app = express();
const PORT = 3000;
const prisma = new PrismaClient(); // Initialize Prisma Client

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/auth", router);
app.use('/boats', boatRouter);
app.use("/buy", ownRouter);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const shutdown = async () => {
    console.log("Shutting down gracefully...");
    await prisma.$disconnect(); 
    server.close(() => {
        console.log("Closed out remaining connections.");
        process.exit(0);
    });
};

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown); 
