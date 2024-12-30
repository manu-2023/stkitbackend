import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const AuthenticateToken = (req, res, next) => {
    // Log all headers and cookies for debugging
    console.log('Headers:', req.headers);
    console.log('Cookies:', req.cookies);

    // Attempt to extract the token from cookies or headers
    const cookieToken = req.cookies ? req.cookies.token : null;
    const headerToken = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;

    // Log the raw values of tokens for further debugging
    console.log('Cookie token:', cookieToken);
    console.log('Header token:', headerToken);

    // Use headerToken if available, otherwise fall back to cookieToken
    const token = headerToken || cookieToken;
    console.log('Retrieved token:', token); // Debug log

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    });
};

