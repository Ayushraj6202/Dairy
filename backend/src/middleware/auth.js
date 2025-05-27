import jwt from 'jsonwebtoken';
import { tokenObj } from '../routes/auth.js';
import User from '../models/user.models.js';

// Middleware to verify seller
export const verifySeller = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  console.log('verify seller ',token);
  
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  
  try {
    const decoded = jwt.verify(token, 'secret'); // Verify the token
    if (decoded.role !== 'seller') {
      return res.status(403).json({ msg: 'Access denied, not authorized as seller' });
    }
    
    req.user = decoded; // Attach decoded token to request for further use
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to verify user
export const verifyUser = async (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies
  console.log("verify user ",token);
  
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret'); // Verify the token
    // Retrieve user from database
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ msg: "Invalid AccessToken" });
    }
    
    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default {
  verifySeller,
  verifyUser,
};
