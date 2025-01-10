import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/utils/connectToDb.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hello World!..')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
