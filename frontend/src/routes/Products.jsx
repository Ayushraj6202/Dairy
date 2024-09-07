import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Products() {
  const url = 'http://localhost:5000/api/products';
  const [loading, setLoading] = useState(true); // Start as true since data is loading
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the API
    axios.get(url)
      .then((res) => {
        setProducts(res.data); // assuming the API response contains product data in `res.data`
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error", err);
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, [url]);

  // if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
