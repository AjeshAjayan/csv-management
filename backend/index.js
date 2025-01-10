import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/utils/connectToDb.js';
import authRouter from './src/routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectToDatabase();

app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
