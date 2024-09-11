import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";

export default function SellerOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/all`;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const token = localStorage.getItem('x-auth-token');
  const role = useSelector((state) => state.auth.role);
  // console.log(loading);
  
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`${URL_BASIC}/orders/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const result = await response.json();
        if (response.ok) {
          setLoading(false);
          setSuccess(result.msg);
          setOrders(result);
        } else {
          setLoading(false);
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
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        setOrders(orders.map(order => order._id === id ? { ...order, status: 'completed' } : order));
      }
    } catch (error) {
      console.error('Error updating status');
    }
  };

  const handleSubmitCancel = async (id) => {
    try {
      const url_del = `${URL_BASIC}/orders/deleteSeller/${id}`;
      const response = await fetch(url_del, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (error) {
      console.error('Error deleting order');
    }
  };

  if (loading) {
    return <LoadingComp/>
  }

  if (orders.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No Customer has ordered yet.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 bg-blue-400">Customer Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
            {/* {console.log(order)} */}
            <img
              src={order.image || 'default-image.jpg'}
              alt={order.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{order.name}</h2>
              <p className="text-gray-700">Quantity: {order.quantity}</p>
              <p className="text-gray-700 font-semibold">Order Value: ₹{order.quantity * order.price}</p>
              <p className="text-gray-700 font-semibold">Phone: {order.phone}</p>
              <div className="text-gray-600">
                Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className={`text-sm font-semibold mt-2 px-2 py-1 rounded ${order.status === 'pending' ? 'bg-red-300' : 'bg-green-300'}`}>
                {order.status}
              </div>
            </div>
            {role === 'seller' && (
              <div className="mt-4 flex  justify-between">

                

                {/* {(new Date() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24)  <100 ? ( */}
                  <button
                    onClick={() => handleSubmitCancel(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                <button
                  onClick={() => handleUpdate(order._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
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
