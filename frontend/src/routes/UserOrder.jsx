import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/user`;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('x-auth-token');
  
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setOrders(result);
        } else {
          setError(result.msg || 'Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      }
    };
    fetchUserOrders();
  }, [orders]);

  const handleCancelOrder = async (id) => {
    const urlDelete = `${URL_BASIC}/orders/delete/${id}`;
    try {
      const response = await fetch(urlDelete, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  if (orders.length === 0) {
    return <div>You have not ordered anything yet.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl bg-blue-300 my-1">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={order.image || 'default-image.jpg'}
              alt={order.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <h2 className="text-xl font-bold">{order.name}</h2>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-600 font-semibold">
                Order Value: ₹{order.quantity * order.price}
              </p>
              <div className="text-gray-600">
                Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className={`text-gray-600 px-2 py-1 mt-2 rounded ${order.status === 'pending' ? 'bg-red-300' : 'bg-green-300'}`}>
                {order.status}
              </div>
              {order.status === 'pending' && (
                <button
                  className="mt-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
