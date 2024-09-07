import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const router = express.Router();
let tokenObj = {
  token: "1234",
  role: "dhg x"
};

// Predefined seller credentials (only one seller)
const sellerEmail = process.env.SELLER_EMAIL;
const sellerPassword = process.env.SELLER_PASSWORD;

// Register user (Users only, no sellers)
router.post('/signup', async (req, res) => {
  console.log("signup");
  const { name, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    user = new User({ name, email, password, role: 'user' }); // Ensure role is 'user'
    await user.save();

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(400).json({ msg: 'User not created' });
    }

    return res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).send("Error from signup backend " + err.message);
  }
});

// Login user or seller
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if it's the seller
    if (email === sellerEmail) {
      const isMatch = password === sellerPassword; // In practice, hash and compare
      if (!isMatch) return res.status(400).json({ msg: 'Invalid seller credentials' });

      const token = jwt.sign({ role: 'seller' }, 'secret', { expiresIn: '100h' });
      
      // Set the token in the response header
      // console.log(token);
      
      tokenObj['token'] = token;
      tokenObj['role'] = 'seller';
      return res.header('x-auth-token', token).json({ token, role: 'seller' });
    }

    // Check if it's a regular user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id, role: 'user' }; // Create the payload
    const token = jwt.sign(payload, 'secret', { expiresIn: '100h' }); // Generate the token
    user.accessToken = token;
    user.role = 'user';
    user.save({validateBeforeSave:false});
    // console.log((token===user.accessToken));
    
    console.log("user after loging",user);
    res.header('x-auth-token', token).json({ token, role: 'user' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// Logout route
router.post('/auth/logout', (req, res) => {
  const token = req.headers['authorization'];
  console.log("logging out user");
  
  if (!token) {
      return res.status(403).send({ message: 'No token provided!' });
  }

  res.status(200).send({ message: 'Logged out successfully' });
});
export default router;
export { tokenObj };
