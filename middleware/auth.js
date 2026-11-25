import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Retrieve the JWT signing secret, failing fast if misconfigured.
 */
export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not configured');
  }
  return secret;
};

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Your account is deactivated' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth verification error:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const optionalProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, getJwtSecret());
      const user = await User.findById(decoded.id).select('-password');
      if (user && user.status === 'active') {
        req.user = user;
      }
    } catch {
      // Ignore invalid/expired token for optional auth routes
    }
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
