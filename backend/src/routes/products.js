import express from 'express';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';
import { getProductsController } from '../controllers/getProductsController.js';
import { getProductsDashboardDataController } from '../controllers/getProductsDashboardDataController.js';

const productsRouter = express.Router();

productsRouter.get('/', verifyTokenMiddleware, getProductsController);

productsRouter.get('/dashboard', verifyTokenMiddleware, getProductsDashboardDataController);

export default productsRouter;
