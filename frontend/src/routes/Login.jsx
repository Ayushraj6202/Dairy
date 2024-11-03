import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { storelogin } from "../store/authslice";
import LoadingComp from "../images/Loading";
import useScrollToTop from "../images/ScrollTop";

export default function Login() {
    useScrollToTop();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setloading] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const URL_BASIC = import.meta.env.VITE_URL_BASIC;
    const url = `${URL_BASIC}/auth/login`; 
    // console.log(url);

 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data) => {
        setloading(true);
        setError('');
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies in the request
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            setloading(false);
            console.log("login ",result,data);
            
            if (response.ok) {
                dispatch(storelogin(data));
                // if(data.email==='ammanrajkumar96082@gmail.com'){
                //     Cookies.set('role','seller')
                // }else{
                //     Cookies.set('role','user')
                // }
                // Cookies.set('token',result.token);
                setSuccess("User Logged In");
                navigate('/');
                // window.location.reload();
            } else {
                setError(result.msg || 'An error occurred while logging you in');
            }
        } catch (error) {
            setError(error.message);
            setloading(false);
        }
    };
    if(loading){
        return (
            <><LoadingComp/></>
        )
    }
    return (
        <div className="my-10 flex items-center justify-center w-full bg-gray-50">
            <div className="mx-auto w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                    <Link to="/" className="block">
                        <img
                            src="https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg"
                            alt="logo"
                            className="w-24 h-24 object-contain rounded-full"
                        />
                    </Link>
                </div>

                <h2 className="text-center text-3xl font-bold leading-tight text-gray-800 mb-2">Sign in to your account</h2>
                <p className="text-center text-base text-gray-600 mb-6">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}

                <form onSubmit={handleSubmit(login)} className="space-y-5">
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
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: 'Password is required',
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                        Sign in
                    </button>
                </form>
                <div className="flex justify-end mt-2">
                    <Link
                     to="/forgot-password"
                     className="text-blue-400 px-2 py-1 rounded-lg"
                    >
                        Forgot Password ?
                    </Link>
                </div>
            </div>
        </div>
    );
}
