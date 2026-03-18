import express, { json } from 'express';
import cors from "cors"
import dotenv from 'dotenv'
import gamesRoutes from './routes/gamesRoutes';

dotenv.config()
const app = express(); 
const PORT = 5000 

app.use(express.json())
app.use(cors())
app.use(gamesRoutes)
app.listen(PORT, () => {
    console.log("server started")
})
