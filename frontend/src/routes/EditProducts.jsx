import React, { useState, useEffect } from 'react';

const ProductList = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    useEffect(() => {
        // Fetch products from the server
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const result = await response.json();
                if (response.ok) {
                    setProducts(result);
                } else {
                    setError(result.msg || 'Failed to fetch products');
                }
            } catch (error) {
                setError('Failed to fetch products');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess(result.msg);
                setProducts(products.filter(product => product._id !== id));
            } else {
                setError(result.msg || 'Failed to delete product');
            }
        } catch (error) {
            setError('Failed to delete product');
        }
    };

    return (
        <div>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            {success && <p className="text-green-600 text-center mb-4">{success}</p>}

            <ul>
                {products.map(product => (
                    <li key={product._id} className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-lg">
                        <div>
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-gray-800">Price: ${product.price}</p>
                            <p className="text-gray-800">Quantity: {product.quantity}</p>
                        </div>
                        {user.role === 'seller' && (
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
                            >
                                Delete
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
