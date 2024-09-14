import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";

export default function Products() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/products`;
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
  const [userName, setuserName] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
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

  const token = localStorage.getItem('x-auth-token');
  useEffect(() => {

  }, [token])
  console.log(token);

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
        setProducts(products.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleBuyNow = (productId, name) => {
    setnamee(name);
    setSelectedProductId(productId);
    setShowForm(true);
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmitOrder = async () => {
    if(phone.length!==10)return;
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
          phone,
          userName
        })
      });

      if (response.ok) {
        setdone(true);
        setShowForm(false);
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
    }, 4000);

    return (
      <div className="flex justify-center mt-10 mb-20">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your order has been placed successfully.</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingComp />
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-8 bg-blue-400">All Products</h1>
      {showForm && (
        <div ref={formRef} className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
          <h3 className="text-lg font-bold mb-4">Place Order for {namee}</h3>
          <label className="block mb-2">
            Your Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="block w-full border p-2 rounded"
              placeholder="Enter your name"
              required
            />
          </label>
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
              placeholder="Enter 10-digit Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`block w-full border p-2 rounded ${phone.length !== 10 && phone.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {phone.length !== 10 && phone.length > 0 && (
              <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits.</p>
            )}
          </label>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleSubmitOrder}
          >
            Submit Order
          </button>
          <button
            className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-all hover:shadow-2xl hover:scale-105 duration-300"
          >
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-grow text-center">
              <h2 className="text-xl font-bold text-white mb-2 bg-blue-500 rounded-lg py-2">
                {product.name}
              </h2>
              <p className="text-lg font-semibold text-white mb-2 bg-green-500 rounded-lg py-2">
                Price: ₹{product.price}
              </p>
              <div className="flex flex-wrap justify-center gap-1">
                <p className="text-lg font-semibold text-white mb-2 bg-green-500 rounded-lg py-2 px-1">
                  Stock: {product.stockStatus}
                </p>
                <p className="text-lg font-semibold text-white mb-2 bg-green-500 rounded-lg py-2 px-1">
                  Quantity: {product.quantity}
                </p>

              </div>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
            </div>
            <div className="mt-4 flex justify-center space-x-4 items-center">
              {role === 'user' && (
                <button
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 hover:shadow-md transition"
                  onClick={() => handleBuyNow(product._id, product.name)}
                >
                  Buy Now
                </button>
              )}
              {role === 'seller' && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-500 hover:to-red-700 hover:shadow-md transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between h-full transition-all hover:shadow-2xl hover:scale-105 duration-300"
          >
            {/* Product Image */}
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            {/* Product Details */}
            <div className="p-4 flex-grow text-center">
              {/* Product Name */}
              <h2 className="text-xl font-bold text-white mb-2 bg-blue-500 rounded-lg py-2 shadow">
                {product.name}
              </h2>

              {/* Price */}
              <p className="text-lg font-semibold text-white mb-2 bg-green-500 rounded-lg py-2 shadow">
                Price: ₹{product.price}
              </p>

              {/* Stock Status */}
              <div className="flex flex-wrap justify-center gap-1">
                <p
                  className={`text-lg font-semibold text-white mb-2 py-2 px-4 rounded-lg shadow ${product.stockStatus === "available"
                    ? "bg-green-500"
                    : "bg-red-500"
                    }`}
                >
                  {product.stockStatus === "available" ? "Available   " : "Out of Stock"}
                </p>

                {/* Quantity */}
                {/* <p className="text-lg font-semibold text-white mb-2 bg-yellow-500 rounded-lg py-2 px-4 shadow">
                  Quantity: {product.quantity}
                </p> */}
              </div>
              <div className="flex flex-wrap justify-center gap-1">
                {/* <p
                  className={`text-lg font-semibold text-white mb-2 py-2 px-4 rounded-lg shadow ${product.stockStatus === "available"
                      ? "bg-green-500"
                      : "bg-red-500"
                    }`}
                >
                  {product.stockStatus === "available" ? "Available   " : "Out of Stock"}
                </p> */}

                {/* Quantity */}
                <p className="text-lg font-semibold text-white mb-2 bg-yellow-500 rounded-lg py-2 px-4 shadow">
                  Quantity: {product.quantity}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4 italic">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-center space-x-4 items-center">
              {role === "user" && (
                <button
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 hover:shadow-md transition"
                  onClick={() => handleBuyNow(product._id, product.name)}
                >
                  Buy Now
                </button>
              )}
              {role === "seller" && (
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-500 hover:to-red-700 hover:shadow-md transition"
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
