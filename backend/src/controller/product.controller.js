import Product from "../models/product.models.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const addProduct = async (req, res) => {
    // console.log('add products');

    const { name, description, price, quantity, stockStatus } = await req.body;
    const img = await req.files;
    console.log(img);

    const localPath = img.image[0].path;
    console.log(localPath);
    const url_image = await uploadOnCloudinary(localPath);

    try {
        const product = new Product({ name, description, price, quantity, image: url_image.url, stockStatus });
        await product.save({ validateBeforeSave: false });
        res.json({ msg: 'Product added' });
    } catch (err) {
        console.error(err); // Log the full error
        res.status(500).send('Server error');
    }
}
const editProduct = async (req, res) => {
    const Pr_id = req.params.id;
    console.log("Editing product with ID:", Pr_id);
    const { name, description, price, quantity, stockStatus } = req.body;
    const img = req.files;
    let url_image = null;
    if (img && img.image && img.image[0]?.path) {
        const localPath = img.image[0].path;
        // console.log("Local path of image:", localPath);
        
        try {
            url_image = await uploadOnCloudinary(localPath);
            // console.log("Uploaded Image URL:", url_image.url);
        } catch (error) {
            // console.error("Error uploading image:", error);
            return res.status(500).json({ msg: 'Image upload error' });
        }
    }
    try {
        let product = await Product.findById(Pr_id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        const updateFields = {
            name,
            description,
            price,
            quantity,
            stockStatus,
            ...(url_image && { image: url_image.url }) 
        };
        product = await Product.findByIdAndUpdate(Pr_id, updateFields, { new: true });
        res.json({ msg: "Product Updated", product });
    } catch (err) {
        console.error("Error updating product:", err); 
        res.status(500).json({ msg: 'Server error' });
    }
};

export { addProduct, editProduct };