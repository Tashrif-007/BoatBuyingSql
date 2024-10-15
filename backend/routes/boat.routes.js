import express from 'express';
import { getBoats } from '../controllers/boats.controller.js';

const boatRouter = express.Router();

boatRouter.get("/getBoats", getBoats);


export default boatRouter;