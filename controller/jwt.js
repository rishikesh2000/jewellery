const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secret_key;

exports.generateToken = (userId) => {
    const payload = {
        userId: userId
        // Add other user-related data if needed
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
    // Token expires in 1 hour
};

exports.verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (error) {
        return null; // Token verification failed
    }
};
