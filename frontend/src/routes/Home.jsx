import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../images/SlideShow.jsx";
import { useSelector } from "react-redux";
import useScrollToTop from "../images/ScrollTop.jsx";

export default function Home() {
    useScrollToTop();
    const [visitorCount, setVisitorCount] = useState(0);
    const url_basic = import.meta.env.VITE_URL_BASIC;
    const role = useSelector((state) => state.auth.role);
    const status = useSelector((state) => state.auth.status);  // Check user status (logged in or not)
    // console.log("home ", role);

    const products = [
        {
            name: "Cow Milk",
            image: "https://images.unsplash.com/photo-1672506633558-005a5b2fc3aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFpcnklMjBmYXJtfGVufDB8fDB8fHww",
            description: "ताजा और शुद्ध गाय का दूध, 1 लीटर पैक में उपलब्ध।",
        },
        {
            name: "Buffalo Milk",
            image: "https://images.unsplash.com/photo-1728360107161-f1004abda274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFpcnklMjBmYXJtfGVufDB8fDB8fHww",
            description: "समृद्ध और क्रीमी भैंस का दूध, 1 लीटर पैक में उपलब्ध।",
        },
        {
            name: "Curd",
            image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/g7ax6wkbjkesr9q4hakw.jpg",
            description: "घर में बने दही, ताजे और स्वादिष्ट।",
        },
        {
            name: "Paneer",
            image: "https://media.istockphoto.com/id/482306874/photo/closeup-of-paneer-cut.webp?a=1&b=1&s=612x612&w=0&k=20&c=whlxcBKnH4bKAplAwXLUvtFzwWnZzvXV94fLVGzMU5A=",
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
            <div className="my-8 p-4 flower-garland-border">
                <SlideShow />
            </div>

            <style>
                {`
        .flower-garland-border {
            padding: 10px;
            border: 6px solid;
            border-image: linear-gradient(45deg, #FFA500, #FF6347, #FFD700, #FF69B4) 1;
            border-radius: 20px;
            animation: garlandWave 7s ease-in-out infinite;
        }
        @keyframes garlandWave {
            0%, 100% { border-image-source: linear-gradient(45deg, #FFA500, #FF6347, #FFD700, #FF69B4); }
            50% { border-image-source: linear-gradient(45deg, #FF69B4, #FFD700, #FFA500, #FF6347); }
        }
          `}
            </style>
            {/* Products List Section */}
            <div className="my-10 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-green-200">
                {/* <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">हमारे उत्पाद</h2> */}
                <div className="text-center mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-lg">
                    {status ? (
                        <Link
                            to="/products"
                            className="text-lg md:text-xl font-bold text-white hover:underline rounded-lg bg-orange-500 px-4 py-2 transition duration-300 transform hover:scale-105 shadow-md"
                        >
                            हमारे सभी उत्पाद
                        </Link>
                    ) : (
                        <p className="text-lg md:text-xl text-white font-semibold">
                            हमारे सभी उत्पादों को देखने और ऑर्डर करने के लिए{' '}
                            <Link to="/login" className="text-blue-200 hover:underline font-bold transition duration-300">
                                लॉगिन
                            </Link>{' '}
                            करें।
                        </p>
                    )}
                </div>

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
                <div className="text-center mt-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-lg">
                    <Link
                        to="/gallery"
                        className="text-lg md:text-xl font-bold text-white hover:underline rounded-lg bg-orange-500 px-4 py-2 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        और तस्वीरें देखें
                    </Link>
                </div>


            </div>
            {/* Contact Section */}
            <div className="my-8 bg-green-100  p-6 rounded-lg text-center transform transition duration-500 hover:scale-105">
                <h2 className="text-2xl mb-4">हमसे संपर्क करें</h2>
                <p>आपकी संतुष्टि हमारी प्राथमिकता है। किसी भी पूछताछ या सुझाव के लिए, कृपया हमें कॉल करें या ईमेल भेजें।</p>
                <div className="mt-4">
                    <p>Phone: <strong>95466 41100</strong></p>
                    <p>Email: <strong>ammanraj@gmail.com</strong></p>
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
