import jwt from 'jsonwebtoken';

export const checkAuth = (res, req, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;

            next();
        } catch (error) {
            res.json({
                message: `No access, error is ${error}`
            })
        }
    } else {
        res.json({
            message: "No access"
        })
    }
}