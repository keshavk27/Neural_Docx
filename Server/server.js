
import http from 'http'
import express from 'express'
import userrouter from './routes/user.routes.js';
import { connectDB } from './db/connection.db.js';
import cors from 'cors';


const app = express();
const server=http.createServer(app);


connectDB()
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

//routes
app.use('/api/v1/user',userrouter)

//middleware


app.get('/', (req, res) => {
    res.send("hello world");
})


server.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
})