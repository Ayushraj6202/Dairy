import express from 'express';
import Product from '../models/product.models.js';
import { verifySeller, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Get all products
//add verifyUser here after testing
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/add',verifySeller, async (req, res) => {
  console.log('add prooducts');
  
  const { name, description, price, quantity } = req.body;
  try {
      const product = new Product({ name, description, price, quantity });
      await product.save();
      res.json({msg: 'Product added' });
  } catch (err) {
      console.error(err); // Log the full error
      res.status(500).send('Server error');
  }
});

// Edit a product (seller only)
router.put('/edit/:id', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    product = await Product.findByIdAndUpdate(req.params.id, {
      name, description, price, quantity
    }, { new: true });

    res.json(product);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a product (seller only)
router.delete('/delete/:id', verifySeller, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a product by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;
