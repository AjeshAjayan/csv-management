import express from 'express';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';
import { csvUploadController } from '../controllers/csvUploadController.js';
import { Products } from '../models/Products.js';

const csvRouter = express.Router();

csvRouter.post('/upload', verifyTokenMiddleware, csvUploadController)

csvRouter.get('/test', async (req, res) => {
    const products = await Products.find();

    res.json({
        data: products,
    });
})

export default csvRouter;
