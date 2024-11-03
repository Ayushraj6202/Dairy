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
  // console.log("signup");
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

const options = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  // path:'/'
}
// Login user or seller
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log('loign user', sellerEmail, sellerPassword, email, password);
  try {
    // Check if it's the seller
    if (email === sellerEmail) {
      // console.log('seller loging ');

      const isMatch = password === sellerPassword; // In practice, hash and compare
      if (!isMatch) return res.status(400).json({ msg: 'Invalid seller credentials' });

      const token = jwt.sign({ role: 'seller' }, 'secret', { expiresIn: '200h' });

      tokenObj['token'] = token;
      tokenObj['role'] = 'seller';
      console.log('seeller', token);

      // return res.json({token:token})
      return res
        .cookie('token', token, options)
        .cookie('role', 'seller', options)
        .json({ role: 'seller' });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id, role: 'user' }; // Create the payload
    const token = jwt.sign(payload, 'secret', { expiresIn: '100h' }); // Generate the token
    user.accessToken = token;
    user.role = 'user';
    user.save({ validateBeforeSave: false });
    // console.log("user after loging",token);
    console.log("user ", token);

    // return res.json({token:token})
    return res
      .cookie('token', token, options)
      .cookie('role', 'user', options)
      .json({ role: 'user' });

  } catch (err) {
    res.status(500).send('Server error');
  }
});
// Logout route
router.post('/logout', (req, res) => {
  // Clear the cookie by the name you used when setting it
  res.clearCookie('token', options); // Replace 'token' with your actual cookie name if different
  res.clearCookie('role', options);
  return res.status(200).send({ message: 'Logged out successfully' });
});

router.get('/check', (req, res) => {
  const token = req.cookies.token;
  const user = req.cookies.role // Access the token from cookies
  console.log('at check', req.cookies, token, user);

  if (!token) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    // console.log('check token ', token, decoded);

    if (err) {
      return res.status(403).json({ msg: 'Unauthorized' });
    }
    // Send back the role or any other information needed
    res.json({ role: user }); // Assuming the role is stored in the token
  });
});

export default router;
export { tokenObj };
