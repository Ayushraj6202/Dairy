import jwt, { decode } from 'jsonwebtoken';
import { tokenObj } from '../routes/auth.js';
import User from '../models/user.models.js';
// Middleware to verify seller
export const verifySeller = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log("verify seller ", token,tokenObj);
  
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    if (tokenObj['role'] !== 'seller') {
      return res.status(403).json({ msg: 'Access denied, not authorized as seller' });
    }
    next();
};
// Middleware to verify user
export const verifyUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  // console.log(token);
  
  try {
    const decoded = jwt.verify(token, 'secret');
    // console.log("decoded ", decoded);
    
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
}