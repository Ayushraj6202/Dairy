import Product from "../models/product.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addProduct = async (req, res) => {
    // console.log('add products');

    const { name, description, price, quantity } = await req.body;
    const img = await req.files;
    // console.log(img);
    
    const localPath = img.image[0].path;
    // console.log(localPath);
    const url_image = await uploadOnCloudinary(localPath);
    
    try {
        const product = new Product({ name, description, price, quantity, image: url_image.url });
        await product.save({ validateBeforeSave: false });
        res.json({ msg: 'Product added' });
    } catch (err) {
        console.error(err); // Log the full error
        res.status(500).send('Server error');
    }
}

export { addProduct };