import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
export default function UserOrders() {

  const URL_BASIC = import.meta.env.VITE_URL_BASIC;
  const url = `${URL_BASIC}/orders/user`; 
  // const url = `http://localhost:5000/api/orders/user`;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const role = useSelector((state) => state.auth.role);
  const token = localStorage.getItem('x-auth-token')
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

        const result = await response.json();
        // console.log("result ",result,response);
        if (response.ok) {

          setSuccess(result.msg);
          // console.log('user order');
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

  const handleSubmitCancel = async (id) => {
    const url_del = `${URL_BASIC}/orders/delete/${id}`;
    try {
      const response = await fetch(url_del, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
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
        You have not ordered anything
      </div>
    )
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg p-4">
            {/* {console.log(product)} */}

            <img
              src={product.image || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            <div className="p-2">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-600">Price: {product.price}</p>
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
            {
              product.status=='pending' &&
              (<button
                className="mt-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                onClick={() => handleSubmitCancel(product._id)}
              >
                Cancel Order
              </button>)
            }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}