import express, { json } from 'express';
import cors from "cors"

const app = express(); 
const PORT = 5000 
app.use(express.json())
app.use(cors())
app.post('/games', (req, res) => {
    console.log('Запрос пришёл')
    console.log(req.body)
    res.send('Всё круто')
})
app.listen(PORT, () => {
    console.log("server started")
})