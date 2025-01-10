import { User } from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const loginController = (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const user = User.findOne({ email });
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

        const hashedPassword = bcrypt.hashSync(password, 10);
        if (hashedPassword !== user.password) {
            return res.status(400).json(
                generateResponseFormat(
                    'Invalid credentials',
                    400,
                    'bad-request',
                    null,
                )
            );
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
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
