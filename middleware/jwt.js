const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.secret_key;

module.exports = (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization;
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    // Extract token without the "Bearer" prefix
    const tokenValue = token.split(' ')[1];
  
    
       // Verify token
       jwt.verify(tokenValue, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        // Token is valid, save decoded data to request object
        req.username = decoded.userId; // Assuming your JWT payload contains userId
        next();
    });
    
};