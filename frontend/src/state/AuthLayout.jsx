import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { storelogin } from '../store/authslice.js';

// Styled component for Access Denied
const AccessDeniedContainer = () => (
    <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg">You do not have permission to view this page.</p>
        </div>
    </div>
);

export default function AuthLayout({ children, always = false, userRole = false, sellerRole = false }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('user');
    const dispatch = useDispatch();
    const URL_BASIC = import.meta.env.VITE_URL_BASIC;
    const url = `${URL_BASIC}/auth/check`;

    const rolee = useSelector((state) => state.auth.role);
    const statuss = useSelector((state) => state.auth.status);
    // console.log("authlay ",rolee,statuss,role,isLoggedIn);
    
    // Function to check authentication status from API
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                setRole(result.role);
                dispatch(storelogin(result)); // Store role in Redux
            } else {
                setIsLoggedIn(false);
                setRole('');
            }
        } catch (error) {
            setIsLoggedIn(false);
            setRole('');
        }
    };

    // Effect to sync state with Redux store and fetch auth status if not present
    useEffect(() => {
        if (rolee && statuss) {
            // If role and status are already in the store, use them
            setIsLoggedIn(statuss);
            setRole(rolee);
        } else {
            // Otherwise, fetch the auth status from the API
            checkAuthStatus();
        }
    }, [dispatch, rolee, statuss]);

    // Always allow access if the `always` flag is true
    if (always) {
        return <>{children}</>;
    }

    // Logic for userRole and sellerRole access
    if (isLoggedIn && userRole && sellerRole) {
        return <>{children}</>;
    }

    if (isLoggedIn && sellerRole) {
        if (role === 'seller') {
            return <>{children}</>;
        }
        return <AccessDeniedContainer />;
    }

    if (isLoggedIn && userRole) {
        if (role === 'user') {
            return <>{children}</>;
        }
        return <AccessDeniedContainer />;
    }

    // If not logged in and sellerRole is not required, show content
    if (!isLoggedIn) {
        if (!sellerRole) {
            return <>{children}</>;
        }
        return <AccessDeniedContainer />;
    }

    // Default case: Access Denied
    return <AccessDeniedContainer />;
}
