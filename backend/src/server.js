import express from 'express';
import connectDB from './config/db.js';
import multer from 'multer';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import orderRoutes from './routes/order.js';
import routeradd from './routes/Product.add.js';

import cors from 'cors'
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
// Connect to database
connectDB();

const allowedOrigins = process.env.CORS_ORIGINS.split(',');

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/product', routeradd)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
