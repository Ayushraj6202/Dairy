import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";

export default function Products() {
  const url = 'http://localhost:5000/api/products';
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  // console.log(user);
  useEffect(() => {
    // Fetch products from the API
    axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error", err);
        setLoading(false);
      });
  }, [url]);
  useEffect(()=>{

  },[products,setProducts])
  const token = localStorage.getItem('x-auth-token');
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const result = await response.json();
        // console.log("delete result:", result);
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Buy Now
              </button>
              {role === 'seller' && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
