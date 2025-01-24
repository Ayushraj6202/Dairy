import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const products = [
        {
            name: "Standardised Milk",
            image: "http://res.cloudinary.com/dldfc2cgl/image/upload/v1730793466/ypyg7delgtayjxn8yzj6.jpg",
            description: "ताजा और शुद्ध दूध, 1 लीटर पैक में उपलब्ध।",
        },
        {
            name: "Baccha Milk",
            image: "http://res.cloudinary.com/dldfc2cgl/image/upload/v1730989714/xjbihdrsfthjdr5eq1dk.jpg",
            description: "समृद्ध और क्रीमी दूध, 1 लीटर पैक में उपलब्ध।",
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
            <div className="my-8 bg-gradient-to-r from-green-100 via-white to-green-100 flower-garland-border flex flex-col lg:flex-row justify-center items-center gap-2">
                <div className="flex-2 w-full lg:w-[55%]">
                    <SlideShow />
                </div>
                <div className="welcome-card flex-1 text-center bg-white shadow-lg rounded-lg p-6 lg:w-[35%]">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">हमारे पेज पर आपका स्वागत है</h2>
                    <p className="text-gray-600 mb-6">
                        हमें यह जानकर खुशी हो रही है कि आप यहाँ हैं। हमारे उत्पादों का अन्वेषण करें और हमारी सेवाओं का आनंद लें, जो प्रेम और देखभाल से तैयार की गई हैं।
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition transform duration-300 hover:scale-105 hover:shadow-lg"
                    >
                        Products
                    </button>
                </div>
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
            <div className="my-10 bg-gradient-to-r from-green-100 via-white to-green-100 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-green-200">
                {/* <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">हमारे उत्पाद</h2> */}
                <div className="text-center mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-lg">
                    {1 && (
                        <Link
                            to="/products"
                            className="text-lg md:text-xl font-bold text-white hover:underline rounded-lg bg-orange-500 px-4 py-2 transition duration-300 transform hover:scale-105 shadow-md"
                        >
                            हमारे उत्पाद
                        </Link>
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
                {/* <div className="text-center mt-6 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-4 rounded-lg shadow-lg">
                    <Link
                        to="/gallery"
                        className="text-lg md:text-xl font-bold text-white hover:underline rounded-lg bg-orange-500 px-4 py-2 transition duration-300 transform hover:scale-105 shadow-md"
                    >
                        और तस्वीरें देखें
                    </Link>
                </div> */}
            </div>

            {/* What We Do and Our Aim Section */}
            <div className="my-10 bg-gradient-to-r from-green-100 via-white to-green-100 p-10 rounded-lg shadow-lg border-2 border-green-300">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-wide">हम क्या करते हैं और हमारा उद्देश्य</h2>

                {/* First Section: Image Left, Text Right */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <img
                        src="https://res.cloudinary.com/dldfc2cgl/image/upload/v1729699181/yf6xzc7edkdwwtukago7.png"
                        alt="Fresh Milk"
                        className="w-full md:w-1/2 h-[300px] md:h-[300px] object-cover rounded-lg border-4 border-green-400 shadow-lg transform transition-transform duration-500 hover:scale-105"
                    />
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed md:w-1/2 bg-white p-6 rounded-lg shadow-md border-l-4 border-green-400">
                        <strong className="text-green-600">हम क्या करते हैं:</strong>
                        हमारी डेयरी कंपनी शुद्ध और ताजे दूध से बने उच्च गुणवत्ता वाले डेयरी उत्पादों को प्रदान करती है।
                        हम ताजा दूध, दही, घी, और अन्य उत्पाद बेचते हैं जो आपकी सेहत के लिए बेहतरीन हैं।
                    </p>
                </div>

                {/* Second Section: Text Left, Image Right */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <img
                        src="https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975112/g8xzsbkovtg9qvcj5qqy.jpg"
                        alt="Dairy Products"
                        className="w-full md:w-1/2 h-[300px] md:h-[300px] object-cover rounded-lg border-4 border-green-400 shadow-lg transform transition-transform duration-500 hover:scale-105"
                    />
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed md:w-1/2 bg-white p-6 rounded-lg shadow-md border-r-4 border-green-400">
                        <strong className="text-green-600">हमारा उद्देश्य:</strong>
                        हमारा लक्ष्य बिहार के हर घर तक पहुंचना और गुणवत्तापूर्ण डेयरी उत्पाद उपलब्ध कराना है।
                        हम आपके परिवार को स्वस्थ और संतुलित आहार देने के लिए प्रतिबद्ध हैं।
                    </p>
                </div>
            </div>


            {/* Contact Section */}
            <div className="my-8 bg-green-100  p-6 rounded-lg text-center transform transition duration-500 hover:scale-105">
                <h2 className="text-2xl mb-4">हमसे संपर्क करें</h2>
                <p>आपकी संतुष्टि हमारी प्राथमिकता है। किसी भी पूछताछ या सुझाव के लिए, कृपया हमें कॉल करें या ईमेल भेजें।</p>
                <div className="mt-4">
                    <p>Phone: <strong>9546641100, 6203859070</strong></p>
                    <p>Email: <strong>khetalpuradiary@gmail.com</strong></p>
                </div>
            </div>
            {/* Owner Section */}
            {/* <div className="my-10 bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-blue-200">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">मालिक से मिलें</h2>
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <img
                        // src="https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/ij8rbsbbmskyh5dcuutb.jpg"
                        
                        alt="अमन कुमार"
                        className="w-48 h-72 object-cover rounded-lg border-4 border-blue-400 shadow-lg transform transition duration-500 hover:scale-105"
                    />
                </div>
                <p className="text-center text-lg md:text-xl text-gray-600 leading-relaxed">
                    हमारे समर्पित मालिक, <strong>अनंत कुमार जी</strong>, सुनिश्चित करते हैं कि प्रत्येक उत्पाद उच्चतम गुणवत्ता मानकों को पूरा करता है। किसी भी पूछताछ या फीडबैक के लिए संपर्क करने के लिए स्वतंत्र महसूस करें।
                </p>
            </div> */}

        </div>
    );
}
