import jwt from 'jsonwebtoken';

// Middleware to verify seller
export const verifySeller = (req, res, next) => {
  
  const token = req.header('x-auth-token');
  console.log('Verifying seller token is ',token);
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret');
    if (decoded.role !== 'seller') {
      return res.status(403).json({ msg: 'Access denied, not authorized as seller' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
// Middleware to verify user
export const verifyUser = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('Verifying user token is ',token);
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret');
    if (decoded.role !== 'user' && decoded.role !== 'seller') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    req.userId = decoded.userId; // Attach user ID to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
export default {
  verifySeller,
  verifyUser,
}