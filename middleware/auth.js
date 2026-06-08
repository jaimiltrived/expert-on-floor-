import jwt from 'jsonwebtoken';
import { User, Expert } from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth Header Received:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authorization header required (Bearer token)' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Token required' });

    console.log("Token to verify:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT Payload:", decoded);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      console.log("User not found for ID:", decoded.id);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Attach user to request
    req.user = user;
    console.log("Authenticated User ID:", user.id);

    // If expert, attach expertId for convenience
    if (user.role === 'expert') {
      const expert = await Expert.findOne({ where: { userId: user.id } });
      if (expert) {
        req.user.expertId = expert.id;
      }
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Access denied' });
    }
    next();
  };
};
