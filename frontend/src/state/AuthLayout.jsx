import React, { useEffect } from "react";
import { useSelector } from 'react-redux';


export default function AuthLayout({ children, userRole = false, sellerRole = false }) {
    const user = useSelector(state => state.auth.user) || {}; // Access user from auth slice
    useEffect(() => {

    }, [user])
    const selleremail = import.meta.env.VITE_SELLER_EMAIL;
    // console.log(sellerEmail);
    const isLoggedIn = Object.keys(user).length > 0;
    let role = 'user';
    if (user.email === selleremail) {
        role = 'seller';
    }
    if (isLoggedIn === true && userRole === true && sellerRole === true) {
        return (<>{children}</>)
    }
    if (isLoggedIn === true && sellerRole === true) {
        if (role === 'seller') {
            return (<>{children}</>)
        }
        return 'Access Denied';
    }

    if (isLoggedIn === true && userRole === true) {
        if (role == 'seller') {
            return (<>{children}</>)
        }
        return 'Access Denied';
    }
    if (isLoggedIn == false) {
        if (sellerRole === false) {
            return (<>{children}</>)
        }
        else {
            return 'Access Denied';
        }
    }

    // If none of the conditions are met, render children
    return <>Access Denied</>;
}

