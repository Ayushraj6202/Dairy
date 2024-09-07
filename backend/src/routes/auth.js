import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const router = express.Router();

// Predefined seller credentials (only one seller)
const sellerEmail = process.env.SELLER_EMAIL;
const sellerPassword = process.env.SELLER_PASSWORD; // You should hash this in practice
// Register user (Users only, no sellers)
router.post('/signup', async (req, res) => {
  console.log("signup ")
  const { name, email, password } = req.body;
  // console.log(name,email,password);
  
  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    user = new User({ name, email, password, role: 'user' }); // Ensure role is 'user'
    // user = await User.create(
    //   {
    //     name:name,
    //     email:email,
    //     password:password,
    //     role:"user",
    //   }
    // )
    console.log("user created ",user);
    await user.save();
    const createdUser =  User.findById(user._id).select(
      "-password"
    );
    // console.log(createdUser);
    if(!createdUser){
      return res.status(400).json({msg:"User not created"})
    }
    return res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login user or seller
router.post('/login', async (req, res) => {
  // console.log("login",req.body);
  //console.log(sellerEmail,sellerPassword);
  
  const { email, password } = req.body;
  console.log("login ",email,password);
  
  try {
    // Check if it's the seller
    if (email === sellerEmail) {
      const isMatch = password === sellerPassword; // In practice, hash and compare
      if (!isMatch) return res.status(400).json({ msg: 'Invalid seller credentials' });

      const token = jwt.sign({ role: 'seller' }, 'secret', { expiresIn: '100h' });
      return res.json({ token, role: 'seller' });
    }

    // Check if it's a regular user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user.id, role: 'user' };
    const token = jwt.sign(payload, 'secret', { expiresIn: '100h' });

    res.json({ token, role: 'user' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
