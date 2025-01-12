import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const loginController = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json(
                generateResponseFormat(
                    'User not found',
                    404,
                    'not-found',
                    null,
                )
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json(generateResponseFormat(
                'Invalid credentials',
                403,
                'forbidden',
                null,
            ))
        } else {
            const token = jwt.sign({ user }, process.env.JWT_SECRET);
            
            res.status(200).json(
                generateResponseFormat(
                    'Logged in successfully',
                    200,
                    'success',
                    { token },
                )
            );
        }

    } catch (err) {
        console.error('Error while calling loginController', err);
        res.status(500).json(
            generateResponseFormat(
                'Something went wrong',
                500,
                'error',
                null,
            )
        );
    }
}
