import express from 'express';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';
import { csvUploadController } from '../controllers/csvUploadController.js';
import { Products } from '../models/Products.js';
import multer from 'multer';

const csvRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

csvRouter.post('/upload', verifyTokenMiddleware, upload.single('file'), csvUploadController)

csvRouter.get('/test', async (req, res) => {
    const products = await Products.find({});

    res.json({
        data: products,
    });
})

export default csvRouter;
