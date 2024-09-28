import React, { useEffect } from "react";
import UserOrders from "./UserOrder.jsx";
import { useDispatch, useSelector } from "react-redux";
import SellerOrders from "./SellerOrder.jsx";
import Cookies from 'js-cookie'

export default function Orders(){
    const user = useSelector((state) => state.auth.user);
    // const role = Cookies.get('role');
    const dispatch = useDispatch();
    const role = useSelector((state)=>state.auth.role)
    useEffect(()=>{

    },[dispatch])
    console.log("orders ",role,user);
    
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