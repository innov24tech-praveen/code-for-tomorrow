import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    const secretKey = process.env.JWT_SECRET; // Ensure that JWT_SECRET is set in your environment variables
    if (!secretKey) {
        throw new Error('JWT_SECRET is not set');
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export { generateToken };