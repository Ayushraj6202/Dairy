import express from 'express';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import { verifySeller, verifyUser } from '../middleware/auth.js'; // Import verifyUser

const router = express.Router();

// Place an order (user only)
router.post('/place', verifyUser, async (req, res) => {
  const { productId, quantity, phone,userName } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(405).json({ msg: 'Product not found' });

    const total = product.price * quantity;

    const order = new Order({
      userName:userName,
      price:product.price,
      image:product.image,
      name:product.name,
      user: req.user._id, // Use userId from the verified token
      productId,
      quantity,
      phone, // Save user's phone number with the order
    });
    // console.log('user id in order ',req.user);
    
    await order.save({validateBeforeSave:false});
    res.status(201).json({ msg: 'Order placed', order });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user orders (user only)
router.get('/user', verifyUser, async (req, res) => {
  // console.log("user order");
  
  try {
    const orders = await Order.find({ user: req.user._id }).populate('productId.product user');
    if (orders.length === 0) return res.status(404).json({ msg: 'No orders found' });
    // console.log("at get ",orders);
    
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all orders (seller only)
router.get('/all', verifySeller, async (req, res) => {
  // console.log("seller all order");
  
  try {
    const orders = await Order.find().populate('productId.product user');
    // console.log('all orders ',orders);
    
    if (orders.length === 0) return res.status(404).json({ msg: 'No orders found' });

    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//Delete order (user only)
router.delete('/delete/:id',verifyUser,async(req,res)=>{
  // console.log('order is deleted here',req.params.id);
  try {
    // console.log('check');
    const p =  await Order.findByIdAndDelete(req.params.id);
    // console.log(p);
    return res.json({ msg: 'Order Cancled' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
})

router.delete('/deleteSeller/:id',verifySeller,async(req,res)=>{
  // console.log('order is deleted here',req.params.id);
  try {
    // console.log('check');
    const p =  await Order.findByIdAndDelete(req.params.id);
    // console.log(p);
    return res.json({ msg: 'Order Deleted BY sellers' });
  } catch (err) {
    return res.status(500).send('Server error');
  }
})

// Update order status (seller only)
router.put('/complete/:id', verifySeller, async (req, res) => {
  // console.log("update staus");
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = 'completed';
    await order.save({validateBeforeSave:false});

    res.json({ msg: 'Order marked as completed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
