import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();

// Define the visitor schema and model directly here
const visitorSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 1 // Set default value for count
    }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// Route to increment visitor count
router.post('/increment-visit', async (req, res) => {
    try {
        const visitor = await Visitor.findOneAndUpdate(
            {}, // Empty filter ensures we are selecting the first document
            { $inc: { count: 1 } }, // Increment the count by 1
            { new: true, upsert: true } // Upsert: Create if it doesn't exist
        );
        console.log('Visitor count incremented:', visitor.count);
        res.status(200).json({ count: visitor.count });
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        res.status(500).json({ message: 'Error updating visitor count' });
    }
});
router.post('/decrement-visit', async (req, res) => {
    try {
        const visitor = await Visitor.findOneAndUpdate(
            {}, // Empty filter ensures we are selecting the first document
            { $inc: { count: -2 } }, // Increment the count by 1
            { new: true, upsert: true } // Upsert: Create if it doesn't exist
        );
        // console.log('Visitor count incremented:', visitor.count);
        res.status(200).json({ count: visitor.count });
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        res.status(500).json({ message: 'Error updating visitor count' });
    }
});


// Route to get visitor count
router.get('/visitor-count', async (req, res) => {
    try {
        const visitor = await Visitor.findOne(); // Always fetches the first document
        console.log('Visitor count retrieved:', visitor ? visitor.count : 0);
        res.status(200).json({ count: visitor ? visitor.count : 0 });
    } catch (error) {
        console.error('Error retrieving visitor count:', error);
        res.status(500).json({ message: 'Error retrieving visitor count' });
    }
});


export default router;
