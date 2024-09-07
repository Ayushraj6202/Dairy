import React from "react";
import axios from 'axios'

export default function Products(){
    const url = 'http://localhost:5000/api/products';
    fetch(url)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log("product fetch error ",err);
    })
    return (
        <div className="text-4xl bg-red-700">
            Products
        </div>
    )
}