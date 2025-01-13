import express from 'express';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';
import { getProductsController } from '../controllers/getProductsController.js';
import { getProductsDashboardDataController } from '../controllers/getProductsDashboardDataController.js';
import { ProductMetrics } from '../models/ProductsMetrices.js';
import { generateResponseFormat } from '../utils/generateResponseFormat.js';

const productsRouter = express.Router();

productsRouter.get('/', verifyTokenMiddleware, getProductsController);

productsRouter.get('/dashboard', verifyTokenMiddleware, getProductsDashboardDataController);

productsRouter.get('/upload-status', verifyTokenMiddleware, async (req, res) => {
    const status = await ProductMetrics.find().limit(1);

    res.status(200).send(
        generateResponseFormat(
            'Status fetched successfully',
            200,
            'success',
            status[0] ?? {},
        )
    );
});

export default productsRouter;
