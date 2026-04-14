import cors from "cors";
import express from "express";
import gameRouter from './routes/gamesRoutes.js';

const app = express();

app.use(cors());
app.use(gameRouter);