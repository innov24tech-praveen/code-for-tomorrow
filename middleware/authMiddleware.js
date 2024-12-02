// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const userauthMiddleware = (req, res, next) => {
   try {
      // Get token from request headers
      const token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded token to request for future use
      req.userData = { userId: decodedToken.userId };

      next(); // Proceed to the next middleware
   } catch (error) {
      console.error('Error in userauthMiddleware:', error);
      return res.status(401).json({ error: 'Authentication failed' });
   }
};