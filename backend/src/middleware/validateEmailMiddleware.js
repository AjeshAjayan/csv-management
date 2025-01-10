import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const validateEmailMiddleware = (req, res, next) => {
    // Validate the email address using regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(400).json(
            generateResponseFormat(
                'Invalid email address',
                400,
                'bad-request',
                null,
            )
        );
    }

    next();
}
