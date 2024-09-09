import React, { useState } from "react";
import { Link ,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector,useDispatch } from "react-redux";
import {storelogin} from '../store/authslice.js';


export default function SignUp() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const url = 'http://localhost:5000/api/auth/signup'; // Ensure this matches your backend URL

    const signup = async (data) => {
        setError('');
        setSuccess('');
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the form data as JSON
            });

            const result = await response.json();

            if (response.ok) {
                // dispatch(storelogin(data));
                setSuccess("User registered successfully!");
                navigate('/login');
                // reset(); // Clear the form after successful registration
            } else {
                setError(result.msg || 'An error occurred');
            }
        } catch (error) {
            console.log('Failed to sign up. Please try again later.');
        }
    };

    return (
        <div className="my-10 flex items-center justify-center w-full bg-gray-50">
            <div className="mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="mb-6 flex justify-center">
                    <Link to="/" className="block">
                        <img
                            src="https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg"
                            alt="logo"
                            className="w-24 h-24 object-contain rounded-full"
                        />
                    </Link>
                </div>
                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">Sign up for an account</h2>
                <p className="text-center text-base text-gray-600 mb-6">
                    Already have an account?&nbsp;
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit(signup)} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
                        <input
                            id="name"
                            placeholder="Enter your name"
                            type="text"
                            {...register("name", {
                                required: 'Name is required',
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Email address must be valid',
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
