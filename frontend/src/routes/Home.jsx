import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../images/SlideShow.jsx";
import { useSelector } from "react-redux";

export default function Home() {
    const [visitorCount, setVisitorCount] = useState(0);
    const url_basic = import.meta.env.VITE_URL_BASIC;
    const role = useSelector((state) => state.auth.role);
    const status = useSelector((state) => state.auth.status);  // Check user status (logged in or not)
    // console.log("home ", role);

    const products = [
        {
            name: "Cow Milk",
            image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/cow_milk.jpg",
            description: "ताजा और शुद्ध गाय का दूध, 1 लीटर पैक में उपलब्ध।",
        },
        {
            name: "Buffalo Milk",
            image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/buffalo_milk.jpg",
            description: "समृद्ध और क्रीमी भैंस का दूध, 1 लीटर पैक में उपलब्ध।",
        },
        {
            name: "Curd",
            image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/g7ax6wkbjkesr9q4hakw.jpg",
            description: "घर में बने दही, ताजे और स्वादिष्ट।",
        },
        {
            name: "Paneer",
            image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/paneer.jpg",
            description: "मुलायम और ताजे पनीर, 500 ग्राम पैक में।",
        }
    ];

    return (
        <div className="container mx-auto px-4 bg-gradient-to-br from-white to-gray-100 min-h-screen">
            {/* Welcome Message */}
            <div className="text-center text-3xl md:text-4xl lg:text-5xl mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8 px-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                शिव आज भी गुरु है
            </div>

            {/* Slideshow */}
            <div className="my-8 shadow-lg border-4 border-orange-400 rounded-lg overflow-hidden">
                <SlideShow />
            </div>

            {/* Products List Section */}
            <div className="my-10 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-green-200">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">हमारे उत्पाद</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="w-64 bg-white p-4 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{product.name}</h3>
                            <p className="text-gray-600 text-center">{product.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-6">
                    {status ? (
                        <Link to="/products" className="text-lg md:text-xl text-green-600 font-bold hover:underline">
                            हमारे सभी उत्पादों को देखने के लिए यहां जाएं।
                        </Link>
                    ) : (
                        <p className="text-lg md:text-xl text-gray-700 font-semibold">
                            हमारे सभी उत्पादों को देखने और ऑर्डर करने के लिए <Link to="/login" className="text-blue-600 hover:underline font-bold">लॉगिन</Link> करें।
                        </p>
                    )}
                </div>
            </div>

            {/* Owner Section */}
            <div className="my-10 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-blue-200">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">मालिक से मिलें</h2>
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <img
                        src="https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/ij8rbsbbmskyh5dcuutb.jpg"
                        alt="अमन कुमार"
                        className="w-48 h-72 object-cover rounded-lg border-4 border-blue-400 shadow-lg transform transition duration-500 hover:scale-105"
                    />
                </div>
                <p className="text-center text-lg md:text-xl text-gray-600 leading-relaxed">
                    हमारे समर्पित मालिक, <strong>अमन कुमार</strong>, सुनिश्चित करते हैं कि प्रत्येक उत्पाद उच्चतम गुणवत्ता मानकों को पूरा करता है। किसी भी पूछताछ या फीडबैक के लिए संपर्क करने के लिए स्वतंत्र महसूस करें।
                </p>
            </div>

        </div>
    );
}
