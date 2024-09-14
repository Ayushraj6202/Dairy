import { Router } from 'express';
import mongoose from 'mongoose';
const router = Router();
// Define the visitor schema and model directly here
const visitorSchema = new mongoose.Schema({
    count: {
        type: Number
    }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// Route to increment visitor count
router.post('/increment-visit', async (req, res) => {
    try {
        let visitor = await Visitor.findOne();
        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count += 1;
        }
        await visitor.save({validateBeforeSave:false});
        res.status(200).json({ count: visitor.count });
    } catch (error) {
        res.status(500).json({ message: 'Error updating visitor count' });
    }
});

// Route to get visitor count
router.get('/visitor-count', async (req, res) => {
    try {
        const visitor = await Visitor.findOne();
        res.status(200).json({ count: visitor ? visitor.count : 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visitor count' });
    }
});


export default router;