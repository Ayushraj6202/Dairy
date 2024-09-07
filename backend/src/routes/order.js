import express from 'express';
import Order from '../models/order.models.js';
import Product from '../models/product.models.js';
import { verifySeller, verifyUser } from '../middleware/auth.js'; // Import verifyUser

const router = express.Router();

// Place an order (user only)
router.post('/place', verifyUser, async (req, res) => {
  const { productId, quantity, phone } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const total = product.price * quantity;

    const order = new Order({
      user: req.userId, // Use userId from the verified token
      products: [{ product: productId, quantity }],
      total,
      phone, // Save user's phone number with the order
    });

    await order.save();
    res.status(201).json({ msg: 'Order placed', order });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get user orders (user only)
router.get('/user', verifyUser, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate('products.product');
    if (orders.length === 0) return res.status(404).json({ msg: 'No orders found' });

    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all orders (seller only)
router.get('/all', verifySeller, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product user');
    if (orders.length === 0) return res.status(404).json({ msg: 'No orders found' });

    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update order status (seller only)
router.put('/complete/:id', verifySeller, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = 'completed';
    await order.save();

    res.json({ msg: 'Order marked as completed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
