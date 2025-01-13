import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './src/utils/connectToDb.js';
import authRouter from './src/routes/auth.js';
import cors from 'cors';
import csvRouter from './src/routes/csv.js';
import productsRouter from './src/routes/products.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectToDatabase();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/csv', csvRouter);
app.use('/api/v1/products', productsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
