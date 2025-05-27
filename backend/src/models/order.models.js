import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  price:{type:Number,required:true},
  name:{type:String,required:true},
  userName:{type:String,required:true},
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  user: { type:String}, // Reference to User model
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
  quantity: { type: Number, required: true },
  phone: { type: String, required: true, match: [/^\d{10}$/, 'Phone number must be exactly 10 digits'], },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  image:{type:String,required:true}
},{timestamps:true});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
