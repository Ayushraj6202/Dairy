import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";
import Cookies from 'js-cookie'
export default function SellerOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/all`;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  // const token = localStorage.getItem('x-auth-token');
  const role = Cookies.get('role')
  // console.log(loading);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`${URL_BASIC}/orders/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Ensure cookies are sent
        });
        
        const result = await response.json();
        
        if (response.ok) {
          setOrders(result); // Assuming result is an array of orders
          setSuccess(result.msg); // If your API returns a message in the result
        } else {
          setError(result.msg || 'Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    
    fetchOrders();
  }, []);
  
  const handleUpdate = async (id) => {
    try {
      const url_update = `${URL_BASIC}/orders/complete/${id}`;
      const response = await fetch(url_update, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include" // Ensure cookies are sent
      });
      
      if (response.ok) {
        setOrders(orders.map(order => order._id === id ? { ...order, status: 'completed' } : order));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSubmitCancel = async (id) => {
    try {
      const url_del = `${URL_BASIC}/orders/deleteSeller/${id}`;
      const response = await fetch(url_del, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Ensure cookies are sent
      });
      
      if (response.ok) {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const [showDetails, setShowDetails] = useState({}); // State to track toggle for each order

  const toggleDetails = (orderId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  if (loading) {
    return <LoadingComp />
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center mt-10 mb-20">
        <div className="bg-red-300 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
          <strong className="font-bold">No Orders </strong>
          <span className="block sm:inline">No customer has ordered </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 bg-blue-400 p-2 text-white rounded-lg shadow-lg">Customer Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.slice().reverse().map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{ maxHeight: '75vh' }} // Fixed height for the card to fit 2 cards within 50% of screen height
          >
            <img
              src={order.image || 'default-image.jpg'}
              alt={order.name}
              className="w-full h-32 object-cover rounded-lg mb-4 shadow-lg" // Adjusted image height
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">{order.name}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-bold text-blue-500">Ordered By:</span> {order.userName}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-bold text-green-500">Quantity:</span> {order.quantity}
              </p>
              <p className="text-gray-700 font-semibold mb-1">
                <span className="text-purple-500 font-bold">Phone:</span> {order.phone}
              </p>


              {/* Toggle for more details */}
              <button
                className="text-blue-500 underline mb-2"
                onClick={() => toggleDetails(order._id)}
              >
                {showDetails[order._id] ? 'Hide Details' : 'Show Details'}
              </button>

              {/* Additional details toggle */}
              {showDetails[order._id] && (
                <>
                  <p className="text-gray-700 font-semibold mb-1">
                    <span className="text-orange-500 font-bold">Order Value:</span> ₹{order.quantity * order.price}
                  </p>
                  <div className="text-gray-600 mb-2">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </>
              )}

              <div className={`text-sm font-semibold mt-2 px-2 py-1 rounded shadow-md ${order.status === 'pending' ? 'bg-red-300' : 'bg-green-300'}`}>
                {order.status}
              </div>
            </div>

            {role === 'seller' && (
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleSubmitCancel(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(order._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded shadow-md hover:bg-green-600 transition"
                >
                  Mark as Complete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
