import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";


export default function SellerOrders() {
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/all`;
  // const url = 'http://localhost:5000/api/orders/all';
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('x-auth-token');
  const role = useSelector((state) => state.auth.role);
  // console.log("token in order ",token);
  useEffect(() => {
    const AllOrders = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include token in the Authorization header
          },
        });
        // console.log("result ",response);

        const result = await response.json();
        // console.log("result ",result,response);
        if (response.ok) {

          setSuccess(result.msg);
          setOrders(result);
          // Optionally reset form fields after successful product addition
        } else {
          setError(result.msg || 'Failed to add product');
        }
      } catch (error) {
        // console.error("Error adding product:", error);
        setError('An error occurred while adding the product');
      }
    };
    AllOrders();
  }, [orders])
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
      console.log('response ', response);
      if (response.ok) {
        const result = await response.json();
        setOrders(orders)
      }
    } catch (error) {
      console.error('status not updated')
    }

  }
  const handleSubmitCancel = async (id) => {
    const url_del = `${URL_BASIC}/orders/deleteSeller/${id}`;
    try {
      const response = await fetch(url_del, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      // console.log(token);
      
      if (response.ok) {
        const result = await response.json();
        setOrders(orders.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  if (orders.length === 0) {
    return (
      <div>
        No Customer has ordered
      </div>
    )
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {orders.map((product) => (

          <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <h2 className="text-xl font-bold">Phone: {product.phone}</h2>
              <div className="text-gray-600">
                Ordered at {new Date(product.createdAt).toISOString().split('T')[0]} {new Date(product.createdAt).toTimeString().slice(0, 5)}
              </div>
              {
                (product.status === 'pending') ? (
                  <div className="text-gray-600 bg-red-300">
                    {product.status}
                  </div>
                ) : (
                  <div className="text-gray-600 bg-green-300">
                    {product.status}
                  </div>
                )
              }
              {role === 'seller' && (

                <button
                  onClick={() => handleUpdate(product._id)}
                  className="bg-green-400 px-1 mt-1 py-1"
                >
                  update
                </button>
              )}
              {
                // Calculate the difference in days
                (new Date() - new Date(product.createdAt)) / (1000 * 60 * 60 * 24) > 14
                  ? (
                    <button 
                    className="bg-red-400 px-1 mt-1 py-1 mx-1"
                    onClick={()=>handleSubmitCancel(product._id)}
                    >
                      Delete
                    </button>
                  ):('')
              }

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}