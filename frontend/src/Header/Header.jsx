import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink ,useNavigate} from 'react-router-dom';
import { storelogout } from "../store/authslice"; // Adjust import according to your file structure

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);
    console.log("status ",authStatus);
    const navigate = useNavigate();
    useEffect(() => {
        
    }, [authStatus,loading]);

    const NavItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "Products",
            slug: "/products",
            active: authStatus
        },
        {
            name: "Add Products",
            slug: "/add-products",
            active: authStatus
        },
        {
            name: "Orders",
            slug: "/orders",
            active: authStatus
        },
    ];

    const HandleLogout = async () => {
        try {
            await fetch('http://localhost:5000/auth/logout', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('x-auth-token')}` // Include token if required
                }
            });
            localStorage.removeItem('x-auth-token');
            
            // Clear user state in Redux
            dispatch(storelogout()); 
            setloading(true);
            // Navigate to home page
            navigate('/');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    return (
        <>
            <header className="shadow py-4 bg-gray-500">
                <div className="mx-auto w-full px-4 max-w-7xl">
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to='/'>
                                logo
                            </Link>
                        </div>
                        <ul className="flex ml-auto">
                            {NavItems.map((item) =>
                                item.active ? (
                                    <li key={item.slug}>
                                        <NavLink
                                            to={item.slug}
                                            className={({ isActive }) =>
                                                `inline-block px-6 py-2 duration-200 rounded-full ${isActive ? 'bg-slate-200' : ''}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ) : null
                            )}
                            {authStatus && (
                                <button
                                    className="bg-blue-800 text-white px-4 py-2 rounded"
                                    onClick={HandleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
