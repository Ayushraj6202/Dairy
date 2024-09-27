import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";

export default function UserOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/user`;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL_BASIC}/orders/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
          },
          credentials:'include'
        });

        const result = await response.json();
        setLoading(false)
        if (response.ok) {
          setOrders(result);
        } else {
          setError(result.msg || 'Failed to fetch orders');
        }
      } catch (error) {
        setLoading(false);
        setError('An error occurred while fetching orders');
      }
    };
    fetchUserOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    const urlDelete = `${URL_BASIC}/orders/delete/${id}`;
    try {
      const response = await fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`,
        },credentials:'include'
      });

      if (response.ok) {
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        console.error('Failed to delete order', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if(loading){
    return <LoadingComp/>
  }
  if (orders.length === 0) {
    return (
      <div className="flex justify-center mt-10 mb-20">
        <div className="bg-green-300 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
          <strong className="font-bold">No Orders </strong>
          <span className="block sm:inline">Order something to view here </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center bg-blue-400 text-white py-3 rounded-lg shadow-lg mb-6">
        Your Orders
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {orders.slice().reverse().map((order) => (
    <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 duration-300">
      <img
        src={order.image || 'default-image.jpg'}
        alt={order.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-800">{order.name}</h2>
        <p className="text-gray-700 mt-2">
          <span className="font-bold">Quantity:</span> {order.quantity}
        </p>
        <p className="text-gray-700 font-semibold mt-2">
          <span className="font-bold">Order Value:</span> ₹{order.quantity * order.price}
        </p>
        <div className="text-sm text-gray-600 mt-2">
          Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        {/* Status Indicator */}
        <div className={`text-center mt-4 px-3 py-1 rounded-full ${order.status === 'pending' ? 'bg-red-200' : 'bg-green-500'} text-white`}>
          {order.status}
        </div>

        {order.status === 'pending' && (
          <div className="flex justify-center mt-2">
            <button
              className="bg-red-500 text-white py-1 px-4 rounded-full shadow hover:bg-red-600 transition"
              onClick={() => handleCancelOrder(order._id)}
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


    </div>
  );
   
}
 