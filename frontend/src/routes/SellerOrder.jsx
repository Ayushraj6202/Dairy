import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingComp from "../images/Loading.jsx";
import Cookies from 'js-cookie';

export default function SellerOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/all`;
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false); // Confirmation state
  const [deleteOrderId, setDeleteOrderId] = useState(null); // Track order to delete
  const role = useSelector((state) => state.auth.role);
  const [handleUpdateId, sethandleUdateId] = useState(null);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          setOrders(result);
          setSuccess(result.msg);
        } else {
          setError(result.msg || 'Failed to fetch orders');
        }
      } catch (error) {
        setError('An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = async () => {
    const id = handleUpdateId;
    try {
      const url_update = `${URL_BASIC}/orders/complete/${id}`;
      const response = await fetch(url_update, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (response.ok) {
        setOrders(orders.map(order => order._id === id ? { ...order, status: 'completed' } : order));
        setConfirmUpdate(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSubmitCancel = async () => {
    try {
      const url_del = `${URL_BASIC}/orders/deleteSeller/${deleteOrderId}`;
      const response = await fetch(url_del, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== deleteOrderId));
        setConfirmDelete(false); // Close the confirmation modal
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleCancel = () => {
    setConfirmDelete(false);
    setDeleteOrderId(null);
  };
  const [showDetails, setShowDetails] = useState({});
  const handleCancelUpdate = () => {
    sethandleUdateId(null);
    setConfirmUpdate(false);
  }
  const toggleDetails = (orderId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  if (loading) {
    return <LoadingComp />;
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

      {/* Confirmation delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-center">Confirm Delete</h2>
            <p className="text-center mb-4">Are you sure you want to delete this order?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleSubmitCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full max-w-[120px] mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full max-w-[120px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation Update Status Modal */}
      {confirmUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-center">Confirm Update</h2>
            <p className="text-center mb-4">Are you sure you want to Mark Completed?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full max-w-[120px] mr-2"
              >
                Yes, Complete
              </button>
              <button
                onClick={handleCancelUpdate}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 w-full max-w-[120px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.slice().reverse().map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-xl p-4 flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{ maxHeight: '75vh' }}
          >
            <img
              src={order.image || 'default-image.jpg'}
              alt={order.name}
              className="w-full h-40 object-cover rounded-lg mb-4 shadow-lg"
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

              <button
                className="text-blue-500 underline mb-2"
                onClick={() => toggleDetails(order._id)}
              >
                {showDetails[order._id] ? 'Hide Details' : 'Show Details'}
              </button>

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
                  onClick={() => {
                    setDeleteOrderId(order._id); // Set the order ID to delete
                    setConfirmDelete(true); // Show confirmation modal
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setConfirmUpdate(true);
                    sethandleUdateId(order._id);
                  }}
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
