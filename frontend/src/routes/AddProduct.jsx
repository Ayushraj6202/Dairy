import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProduct() {
    const URL_BASIC = import.meta.env.VITE_URL_BASIC;
    const url = `${URL_BASIC}/products/add`; 
    // const url = 'http://localhost:5000/api/products/add';
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, handleSubmit, reset } = useForm();

    // Fetch the token from localStorage
    const token = localStorage.getItem('x-auth-token');

    const addProduct = async (data) => {
        // console.log('add pr');
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in the Authorization header
                },
                body: JSON.stringify(data),
                
            });

            const result = await response.json();
            // console.log(response);
            
            if (response.ok) {
                setSuccess(result.msg);
                // Optionally reset form fields after successful product addition
                reset();
            } else {
                setError(result.msg || 'Failed to add product');
            }
        } catch (error) {
            console.error("Error adding product:", error);
            setError('An error occurred while adding the product');
        }
    };

    return (
        <>
            {error && <p className="text-red-600 text-center mt-2 mb-4">{error}</p>}
            {success && <p className="text-green-600 text-center mt-2 mb-4">{success}</p>}

            <form onSubmit={handleSubmit(addProduct)} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        placeholder="Enter product name"
                        type="text"
                        {...register("name", {
                            required: 'Product name is required',
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter Description of product"
                        {...register("description", {
                            required: 'Description is required',
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="Number"
                        placeholder="Enter Price of product"
                        {...register("price", {
                            required: 'Price is required',
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="quantity">Quantity</label>
                    <input
                        id="quantity"
                        type="Number"
                        placeholder="Enter quantity of product"
                        {...register("quantity", {
                            required: 'Quantity is required',
                        })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="file"
                        placeholder="Choose Image"
                        {...register("Image", {
                            required: 'Image is required',
                        })}
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                    Add Product
                </button>
            </form>
        </>
    );
}
