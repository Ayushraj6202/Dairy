import React from "react";
import UserOrders from "./UserOrder.jsx";
import { useSelector } from "react-redux";
import SellerOrders from "./SellerOrder.jsx";
import Cookies from 'js-cookie'

export default function Orders(){
    const user = useSelector((state) => state.auth.user);
    // const role = Cookies.get('role');
    const role = useSelector((state)=>state.auth.role)
    if(role==='user'){
        return (
            <>
                <UserOrders/>
            </>
        )
    }
    else if(role=='seller'){
        return (
            <>
            <SellerOrders/>
            </>
        )
    }
    return (
        <>Loading ...</>
    )
}