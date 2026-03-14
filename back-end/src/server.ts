import express, { json } from 'express';
import cors from "cors"
import dotenv from 'dotenv'
import gamesRoutes from './routes/gamesRoutes';
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

dotenv.config()
const app = express(); 
const PORT = 5000 
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
})
const prisma = new PrismaClient({adapter})
app.use(express.json())
app.use(cors())
app.use(gamesRoutes)
app.listen(PORT, () => {
    console.log("server started")
})
export {prisma}