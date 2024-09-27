import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingComp from '../images/Loading.jsx'

export default function AddProduct() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/product/add`;

  const [error, setError] = useState('');
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, reset } = useForm();
  
  const addProduct = async (data) => {
    setloading(true);
    const formData = new FormData();
  
    // Append all form fields to FormData, including file
    for (const key in data) {
      if (key === 'image') {
        // If the key is the image file field, append the file
        if (data[key][0]) {
          formData.append(key, data[key][0]); // Append file
        }
      } else {
        // Append other fields as text data
        formData.append(key, data[key]);
      }
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // No need to set this, browser will set it correctly
        },
        body: formData,
        credentials: 'include', // Important: This allows cookies to be sent with the request
      });
  
      const result = await response.json();
      setloading(false);
      if (response.ok) {
        setSuccess(result.msg);
        setError('');
        reset();
      } else {
        setError(result.msg || 'Failed to add product');
      }
    } catch (error) {
      setloading(false);
      console.error("Error adding product:", error);
      setError('An error occurred while adding the product');
    }
  };
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-gray-300"></div>
        <h2 className="text-center text-lg font-semibold text-gray-700 mt-4">
          Wait, your product is being added...
        </h2>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl bg-blue-400 py-1 my-2 px-1">Add a New Product</h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit(addProduct)} className="space-y-6">
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
            {...register("image", { required: 'Image is required' })}
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
    </div>
  );
}
