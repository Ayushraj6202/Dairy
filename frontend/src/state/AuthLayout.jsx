import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import sellerEmail from '../../inf.js';
export default function AuthLayout({ children, userRole = false, sellerRole = false }) {
    const user = useSelector(state => state.auth.user) || {}; // Access user from auth slice

    console.log("user ", user);
   useEffect(()=>{

   },[user])
    console.log(sellerEmail);
    
    const isLoggedIn = Object.keys(user).length>0;
    let role = 'user';
    if(user.email===sellerEmail){
        role='seller';
    }

    // Conditional rendering based on user role and props
    if(isLoggedIn===true&&userRole===true&&sellerRole===true){
        return (<>{children}</>)
    }
    if(isLoggedIn===true&&userRole===true){
        if(role=='user'){
            return (<>{children}</>)
        }
        return 'Access Denied';
    }

    if (isLoggedIn===true && sellerRole===true) {
        if(role=='seller'){
            return (<>{children}</>)
        }
        return 'Access Denied';
    }
    if(isLoggedIn==false&&sellerRole&&userRole){
        return (<>{children}</>)
    }

    // If none of the conditions are met, render children
    return <>Access Denied</>;
}

