import express from 'express';
import { loginController } from '../controllers/loginController.js'
import { signUpController } from '../controllers/signUpController.js';
import { validatePasswordMiddleware } from '../middleware/validatePasswordMiddleware.js';
import { validateEmailMiddleware } from '../middleware/validateEmailMiddleware.js';
import { User } from '../models/User.js';
import { verifyTokenMiddleware } from '../middleware/verifyTokenMiddleware.js';

const authRouter = express.Router();

authRouter.post(
    '/login', 
    validateEmailMiddleware,
    loginController
);

authRouter.post(
    '/signup', 
    validateEmailMiddleware,
    validatePasswordMiddleware, 
    signUpController
);

authRouter.get(
    '/test',
    verifyTokenMiddleware,
    async (req, res) => {
        const users = await User.find();

        res.json(users);
    }
);

export default authRouter;
