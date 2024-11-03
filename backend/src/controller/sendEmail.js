import { Router } from 'express';
import Product from "../models/product.models.js";
import sendEmail from "../utils/mailer.js"; 
import Order from '../models/order.models.js';
const to = process.env.RECEIVER_EMAIL;

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { productId, quantity, phone, userName } = req.body;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log('product by id ',product);
        
        // const sellerEmail = product.sellerEmail; // Assuming your Product model has a sellerEmail field
        const subject = 'New Order Placed';
        const text = `
            A new order has been placed!
            Product Name: ${product.name}
            Quantity: ${quantity}
            Total Value: ${product.price*quantity}
            Customer Name: ${userName}
            Contact Phone: ${phone}
        `;
        const html = `
            <p>A new order has been placed!</p>
            <p><strong>Product Name:</strong> ${product.name}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Total Value:</strong> ${product.price*quantity}</p>
            <p><strong>Customer Name:</strong> ${userName}</p>
            <p><strong>Contact Phone:</strong> ${phone}</p>
        `;
        console.log(text,html);
        
        await sendEmail(to, subject, text, html);
        return res.status(200).send('Order placed and email sent to seller.');
    } catch (error) {
        console.error('Error processing order or sending email:', error);
        return res.status(500).send('Failed to send email to seller.');
    }
});

router.post('/cancel', async (req, res) => {
    try {
        const { orderId} = req.body;
        
        // Find the product using the productId
        console.log("req body cancel order ",req.body,orderId);
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('order by id ', order);
        
        const subject = 'Order Canceled';
        const text = `
            An order has been canceled!
            Product Name: ${order.name}
            Quantity: ${order.quantity}
            Total Value: ${order.price * order.quantity}
            Customer Name: ${order.userName}
            Contact Phone: ${order.phone}
        `;
        const html = `
            <p>An order has been <strong>canceled</strong>!</p>
            <p><strong>Product Name:</strong> ${order.name}</p>
            <p><strong>Quantity:</strong> ${order.quantity}</p>
            <p><strong>Total Value:</strong> ${order.price * order.quantity}</p>
            <p><strong>Customer Name:</strong> ${order.userName}</p>
            <p><strong>Contact Phone:</strong> ${order.phone}</p>
        `;
        
        console.log(text, html);
        await sendEmail(to, subject, text, html);
        
        return res.status(200).json({ message: 'Order canceled and email sent to seller.' });
    } catch (error) {
        console.error('Error canceling order or sending email:', error);
        return res.status(500).json({ message: 'Failed to cancel order or send email to seller.' });
    }
});

export default router;
