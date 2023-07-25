import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
//middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/api', apiRoutes);

app.get('/', async(req, res) => {
    res.send('Hello There!!');
})


// to run the app
const startServer = async() => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
}
catch(error){
    console.log(error)
}
}
startServer();