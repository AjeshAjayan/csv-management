export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json(
            generateResponseFormat(
                'No token provided',
                401,
                'unauthorized',
                null,
            )
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json(
            generateResponseFormat(
                'Invalid token',
                401,
                'unauthorized',
                null,
            )
        );
    }
}
