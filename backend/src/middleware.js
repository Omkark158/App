const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// JWT auth
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Rate limiters
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
const apiLimiter  = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

module.exports = { protect, authLimiter, apiLimiter };