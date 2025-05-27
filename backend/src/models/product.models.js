import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: String ,required:true},
  image:{type:String,required:true},
  stockStatus:{type:String,default:'available'}
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
