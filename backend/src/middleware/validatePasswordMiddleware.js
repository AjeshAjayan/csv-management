import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const validatePasswordMiddleware = (req, res, next) => {
    /**
     * validate password using regex pattern
     * password must have a Capitalized character
     * must have a symbol character
     * length must be greater than 8 characters
     */
    const { password } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json(
            generateResponseFormat(
                'Week password',
                400,
                'bad-request',
                'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.',
            )
        );
    }

    next();
}
