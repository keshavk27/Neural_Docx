import http from 'http'
import express from 'express'
import { connectDB } from './db/connection.db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import chatSessionrouter from './routes/chatSession.routes.js';
import userrouter from './routes/user.routes.js';
import messagerouter from './routes/message.routes.js';
import analyticsrouter from './routes/analytics.routes.js'

import { errorHandler } from './middleware/error.middleware.js';
import { ApiError } from './utils/apiError.js';


const app = express();
const server=http.createServer(app);


app.use(cors({
    origin: [process.env.CLIENT_URL,"http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api/v1/user',userrouter)
app.use('/api/v1/chatsessions',chatSessionrouter)
app.use('/api/v1/messages',messagerouter)
app.use('/api/v1/analytics',analyticsrouter)

//root
app.get('/', (req, res) => {
    res.send("hello world");
})

//Middleware
//404
app.use((req, res, next) => {
    next(new ApiError(404, "Route not found."));
});
app.use(errorHandler);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server is listening at ${PORT}`);
        });

    } 
    catch (error) {
        console.error("Database Connection Failed:",error);
        process.exit(1);
    }
};

startServer();