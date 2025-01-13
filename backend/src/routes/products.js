import express from 'express';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';
import { getProductsController } from '../controllers/getProductsController.js';

const productsRouter = express.Router();

productsRouter.get('/', verifyTokenMiddleware, getProductsController);

export default productsRouter;
