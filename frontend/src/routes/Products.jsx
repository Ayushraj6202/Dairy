import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import LoadingComp from "../images/ProdLoad.jsx";
import useScrollToTop from "../images/ScrollTop.jsx";
import { Link } from 'react-router-dom'

export default function Products() {
	useScrollToTop();
	const URL_BASIC = import.meta.env.VITE_URL_BASIC;
	const url = `${URL_BASIC}/products`;
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const user = useSelector((state) => state.auth.user);
	const islogged = useSelector((state) => state.auth.status);
	// const role = Cookies.get('role')
	// console.log(islogged);

	const role = useSelector((state) => state.auth.role)

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
	const [confirmDelete, setConfirmDelete] = useState(false);
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

	const handleDelete = async (id, name) => {
		setSelectedProductId(id); // Set the selected product ID
		setDeletedProductName(name); // Set the name of the product to delete
		setConfirmDelete(true); // Show confirmation modal
	};

	const confirmDeleteProduct = async () => {
		if (selectedProductId) {
			try {
				const response = await fetch(`${URL_BASIC}/products/delete/${selectedProductId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include', // Include cookies in the request
				});

				if (response.ok) {
					setProducts(products.filter((product) => product._id !== selectedProductId));
					setShowDeletePopup(true);
					setTimeout(() => {
						setShowDeletePopup(false);
					}, 3000);
				} else {
					console.error('Failed to delete product', response.status);
				}
			} catch (error) {
				console.error('Error deleting product:', error);
			} finally {
				setConfirmDelete(false); // Hide confirmation modal after deletion
				setSelectedProductId(null); // Clear the selected product ID
			}
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
				setsubmit(false);
				const emailResponse = await fetch(`${URL_BASIC}/sendEmail`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						productId: selectedProductId,
						quantity,
						phone,
						userName,
					}),
				});
				console.log("emailResponse order", emailResponse);

				if (emailResponse.ok) {
					console.log('Email sent to the seller successfully');
				} else {
					console.error('Failed to send email to seller', emailResponse.status);
				}

			} else {
				setsubmit(false);
				console.error('Failed to order product', response.status);
			}
		} catch (error) {
			setsubmit(false);
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
		<div className="p-4 relative">
			<h1 className="text-3xl font-bold text-center mb-8 bg-blue-400">All Products</h1>
			{showForm && (
				<div ref={formRef} className="mt-4 p-4 bg-gray-100 rounded shadow-lg">
					<h3 className="text-lg font-bold mb-4 shadow-lg bg-blue-200 p-4 rounded-md">
						Place Order for <span className="text-orange-600 font-semibold italic">{namee}</span>
					</h3>


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
			{/* Delete Confirmation Modal */}
			{confirmDelete && (
				<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-80">
						<h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
						<p>Are you sure you want to delete the product: <strong>{deletedProductName}</strong>?</p>
						<div className="flex justify-between mt-6">
							<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={confirmDeleteProduct}>
								Yes
							</button>
							<button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" onClick={() => setConfirmDelete(false)}>
								No
							</button>
						</div>
					</div>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<div
						key={product._id}
						className="bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between transition-all hover:shadow-2xl hover:scale-105 duration-300"
						style={{ minHeight: '70vh' }} // Adjusted for larger image
					>
						{/* Product Image */}
						<img
							src={product.image || 'default-image.jpg'}
							alt={product.name}
							className="w-full h-80 object-cover rounded-t-lg mb-2" // Height increased to h-80
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
								{!islogged ? (
									<Link
										to="/login"
										className="bg-red-500 py-2 px-4 w-full shadow-md rounded-lg text-white text-center font-medium hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
									>
										Login to buy
									</Link>
								) : (
									<>
										{role === 'user' && (
											<button
												className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 hover:shadow-md transition"
												onClick={() => handleBuyNow(product._id, product.name)}
											>
												Buy Now
											</button>
										)}
										{role === 'seller' && (
											<div className="flex flex-wrap justify-center gap-3">
												<Link
													to={`/edit/${product._id}`}
													state={{ ProductData: product }}
													className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-500 hover:to-blue-700 hover:shadow-md transition"
												>
													Edit
												</Link>
												<button
													onClick={() => handleDelete(product._id, product.name)}
													className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow hover:from-red-500 hover:to-red-700 hover:shadow-md transition"
												>
													Delete
												</button>
											</div>
										)}
									</>
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
