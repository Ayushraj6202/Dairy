import express from 'express';
import connectDB from './config/db.js';
import multer from 'multer';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';

import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
// Connect to database
connectDB();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const upload = multer();
app.use(upload.none());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
