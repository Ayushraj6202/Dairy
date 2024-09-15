import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

// Styled component for Access Denied
const AccessDeniedContainer = () => (
    <div className="flex items-center justify-center h-screen bg-red-100">
        <div className="bg-red-500 text-white p-8 rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg">You do not have permission to view this page.</p>
        </div>
    </div>
);

export default function AuthLayout({ children, userRole = false, sellerRole = false }) {
    const user = useSelector(state => state.auth.user); // Access user from auth slice

    useEffect(() => {
        // Any side-effects or updates on user change can be handled here
    }, [user]);

    const sellerEmail = import.meta.env.VITE_SELLER_EMAIL;
    const isLoggedIn = Object.keys(user).length > 0;
    let role = 'user';

    if (user.email === sellerEmail) {
        role = 'seller';
    }

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
        if (role === 'seller') {
            return <>{children}</>;
        }
        return <AccessDeniedContainer />;
    }

    if (!isLoggedIn) {
        if (!sellerRole) {
            return <>{children}</>;
        }
        return <AccessDeniedContainer />;
    }

    // Default case: Access Denied
    return <AccessDeniedContainer />;
}
