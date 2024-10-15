import express from 'express';
import { own } from '../controllers/own.controller.js';
import { ownedBoats } from '../controllers/ownedBoats.controller.js';
const ownRouter = express.Router();

ownRouter.post("/own", own);

ownRouter.get('/ownBoats/:userId', ownedBoats);

export default ownRouter;