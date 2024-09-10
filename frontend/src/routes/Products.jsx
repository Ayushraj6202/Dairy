import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
export default function Products() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/products`;
  // const url = 'http://localhost:5000/api/products';
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [done, setdone] = useState(false);
  const [namee, setnamee] = useState('');
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    // Fetch products from the API
    axios.get(url)
      .then((res) => {
        // console.log(res.data);

        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product fetch error", err);
        setLoading(false);
      });
  }, [url, products]);

  const token = localStorage.getItem('x-auth-token');

  const handleDelete = async (id) => {

    try {
      const response = await fetch(`${URL_BASIC}/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const result = await response.json();
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleBuyNow = (productId,name) => {
    setnamee(name)
    setSelectedProductId(productId); // Set selected product ID
    setShowForm(true); // Show the form to input quantity and phone
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
    }, 100); // Add a slight delay to ensure the form is visible before scrolling
  };

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch(`${URL_BASIC}/orders/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: selectedProductId,
          quantity,
          phone
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order placed successfully', result);
        setdone(true);
        setShowForm(false); // Hide form after successful submission
      } else {
        console.error('Failed to order product', response.status);
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  if (done) {
    setTimeout(() => {
      setdone(false);
    }, 2000);
    return (
      <>
        <div className="text-green-700 mx-auto mt-10 bg-gray-200 mb-20">Order placed successfully</div>
      </>
    );
  }

  return (
    
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8 bg-blue-400">All Products</h1>
      {showForm && (
        <div ref={formRef} className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
          <h3 className="text-lg font-bold mb-4">Place Order for {namee}</h3>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full border p-2 rounded"
              min="1"
              required
            />
          </label>
          <label className="block mb-2">
            Phone Number:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full border p-2 rounded"
              required
            />
          </label>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleSubmitOrder}
          >
            Submit Order
          </button>
          <button
            className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => setShowForm(false)} // Cancel order form
          >
            Cancel
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full">
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-2 flex-grow">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 mx-auto rounded hover:bg-blue-600 transition"
                onClick={() => handleBuyNow(product._id,product.name)}
              >
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
