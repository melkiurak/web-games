import cors from "cors";
import express from "express";
import gameRouter from './routes/game.routes.js';

const app = express();

app.use(cors());
app.use('/api', gameRouter);
app.listen(3000, () => {
    console.log("Server started");
});

const server = require('http').createServer((req:any,res:any) => {
    const {method, url} = req
    if(method === 'GET' && url === '/hello') {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('Привет');
    } else {
        res.writeHead(400);
        res.end('Not Found');
    }
})