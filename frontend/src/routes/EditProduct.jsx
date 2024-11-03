import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const URL_BASIC = import.meta.env.VITE_URL_BASIC;
    const location = useLocation();
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);
    const [success, setSuccess] = useState('');
    const { register, handleSubmit, setValue, getValues, control } = useForm();
    const { ProductData } = location.state || {};
    // console.log(ProductData);
    const navigate = useNavigate();
    useEffect(()=>{
        if(ProductData){
            setValue('name',ProductData.name);
            setValue('description',ProductData.description);
            setValue('price',ProductData.price);
            setValue('quantity',ProductData.quantity);
            setValue('stockStatus',ProductData.stockStatus);
        }
    },[ProductData,setValue])
    const EditProduct = async (data) => {
        setloading(true);
        const formData = new FormData();
        for (const key in data) {
            if (key === 'image') {
                if (data[key][0]) {
                    formData.append(key, data[key][0]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        // console.log("after Edit ",formData);
        const url = `${URL_BASIC}/product/edit/${ProductData._id}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();
            setloading(false);
            if (response.ok) {
                setSuccess(result.msg);
                setError('');
                navigate('/products');
            } else {
                setError(result.msg || 'Failed to Edit product');
            }
        } catch (error) {
            setloading(false);
            console.error("Error Editing product:", error);
            setError('An error occurred while editing the product');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-300"></div>
                <h2 className="text-center text-lg font-semibold text-gray-700 mt-4">
                    Wait, your product updating..
                </h2>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl bg-blue-400 py-1 my-2 px-1">Edit Product</h1>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {success && <p className="text-green-600 text-center mb-4">{success}</p>}

            <form onSubmit={handleSubmit(EditProduct)} className="space-y-6" encType="multipart/form-data">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                        Product Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter product name"
                        {...register("name", { required: 'Product name is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                        Description
                    </label>
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter description of the product"
                        {...register("description", { required: 'Description is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        placeholder="Enter price of the product"
                        {...register("price", { required: 'Price is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-1">
                        Quantity
                    </label>
                    <input
                        id="quantity"
                        type="text"
                        placeholder="eg 100ml or 1 kg"
                        {...register("quantity", { required: 'Quantity is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>
                <div>
                    <label htmlFor="stockStatus" className="block text-gray-700 font-semibold mb-1">
                        Stock Status
                    </label>
                    <select
                        id="stockStatus"
                        {...register("stockStatus", { required: 'Stock status is required' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    >
                        <option value="">Select stock status</option>
                        <option value="available">Available</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !ProductData })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}
