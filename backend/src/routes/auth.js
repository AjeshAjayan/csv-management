import express from 'express';
import { loginController } from '../controllers/loginController.js'
import { signUpController } from '../controllers/signUpController.js';

const authRouter = express.Router();

authRouter.post('/login', loginController);
authRouter.post('/signup', signUpController);

export default authRouter;
