import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";
import Cookies from 'js-cookie'
export default function Products() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/products`;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  // const role = Cookies.get('role')
  const role = useSelector((state)=>state.auth.role)

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [done, setdone] = useState(false);
  const [namee, setnamee] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [userName, setuserName] = useState('');
  const formRef = useRef(null);
  const phonePattern = /^[6789]\d{9}$/;
  const isValidPhone = phonePattern.test(phone);
  const [visibleDescription, setVisibleDescription] = useState({});
  const [isSubmitting, setsubmit] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletedProductName, setDeletedProductName] = useState('');
  const [errorName, setErrorname] = useState(false);

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

  // const token = localStorage.getItem('x-auth-token');
  // useEffect(() => { }, [token]);
  const handleDelete = async (id, name) => {
    try {
      const response = await fetch(`${URL_BASIC}/products/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // No need for Authorization header since token is in cookies
        },
        credentials: 'include', // Include cookies in the request
      });
      // console.log("delete product ",response);
      
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        setDeletedProductName(name);
        setShowDeletePopup(true);
        setTimeout(() => {
          setShowDeletePopup(false);
        }, 3000);
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
    if (!userName.trim()) {
      setErrorname(true);
    } else {
      setErrorname(false);
    }
    if (phone.length !== 10 || !userName.trim()) return;
    if (phone[0] < '6') return;
    setsubmit(true);
    try {
      const response = await fetch(`${URL_BASIC}/orders/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // No need for Authorization header since token is in cookies
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({
          productId: selectedProductId,
          quantity,
          phone,
          userName,
        }),
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
  const handleNameChange = (e) => {
    const value = e.target.value;
    setuserName(value);
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
    return <LoadingComp />;
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-red-100">
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">No Products</h1>
          <p className="text-lg">Seller Doesn't have any Product to show</p>
        </div>
      </div>
    );
  }
  if (showDeletePopup) {
    return (
      <>
        <div className="flex justify-center mt-10 mb-20">
          <div className="bg-gradient-to-r from-red-400 to-red-600 border border-red-700 text-white px-6 py-4 rounded-lg relative shadow-xl w-3/4 sm:w-1/2 lg:w-1/3">
            <strong className="font-bold text-yellow-200 text-shadow-md">{deletedProductName} Deleted!</strong>
            {/* <span className="block sm:inline text-shadow-sm">  was successfully deleted.</span> */}
          </div>
        </div>
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
            Your Name:
            <input
              type="text"
              value={userName}
              onChange={handleNameChange}
              className={`block w-full border p-2 rounded ${errorName ? 'border-red-500' : ''}`}
              placeholder="Enter your name"
              required
            />
          </label>
          {errorName && (
            <p className="text-red-500 text-sm mt-1">Name is required.</p>
          )}
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
              className={`block w-full border p-2 rounded ${!isValidPhone && phone.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {!isValidPhone && phone.length > 0 && (
              <span className="text-red-500 text-sm mt-1 block">Phone number must be valid.</span>
            )}
          </label>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            onClick={handleSubmitOrder}
          >
            {isSubmitting ? 'Wait...' : 'Submit Order'}
          </button>
          <button
            className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all hover:shadow-2xl hover:scale-105 duration-300"
            style={{ minHeight: '40vh', maxHeight: 'auto' }} // Adjusts based on content
          >
            {/* Product Image */}
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-32 object-cover rounded-t-lg mb-4"
            />

            {/* Product Details */}
            <div className="p-2 flex-grow text-center space-y-2">
              {/* Product Name */}
              <h2 className="text-lg font-bold text-white bg-blue-500 rounded-lg py-1 shadow">
                {product.name}
              </h2>

              {/* Price and Quantity in a row */}
              <div className="flex justify-between items-center">
                <p className="text-md font-semibold text-white bg-green-500 rounded-lg py-1 px-3 shadow">
                  Price: ₹{product.price}
                </p>
                <p className="text-md font-semibold text-white bg-yellow-500 rounded-lg py-1 px-3 shadow">
                  Qty: {product.quantity}
                </p>
              </div>

              {/* Stock Status */}
              <p
                className={`text-md font-semibold text-white rounded-lg py-1 px-4 shadow ${product.stockStatus === 'available'
                  ? 'bg-green-500'
                  : 'bg-red-500'
                  }`}
              >
                {product.stockStatus === 'available' ? 'In Stock' : 'Out of Stock'}
              </p>

              {/* Action Buttons */}
              <div className="mt-2 flex justify-center space-x-4 items-center">
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
                    onClick={() => handleDelete(product._id, product.name)}
                    className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-500 hover:to-red-700 hover:shadow-md transition"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 italic mt-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
