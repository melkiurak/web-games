import express, { json } from 'express';
import cors from "cors"
import gamesRoutes from "./routes/gamesRoutes.ts"
import reviewsRoutes from "./routes/reviewsRoutes.ts"

const app = express(); 
const PORT = 5000 
app.use(express.json())
app.use(cors())
app.use(gamesRoutes)
app.use(reviewsRoutes)
app.listen(PORT, () => {
    console.log("server started")
})