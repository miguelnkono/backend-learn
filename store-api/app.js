import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFound from './middleware/not-found.js';
import { connectDB } from './db/connect.js';
import route from './routes/products.js';


const app =  express();

//--------- routers -----------------
app.get('/', (req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products', route);

//--------- middlewares-------------
app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(notFound);

// stating of the server
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // connect to the db
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on http://localhost:${port}...`));
    } catch (error) {
        console.error(`Error trying to start the server`);
    }
};

start();
