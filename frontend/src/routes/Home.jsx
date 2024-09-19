import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../images/SlideShow.jsx";

export default function Home() {
    const [visitorCount, setVisitorCount] = useState(0);
    const url_basic = import.meta.env.VITE_URL_BASIC;

    // Uncomment to enable visitor tracking
    // useEffect(() => {
    //     const fetchVisitorCount = async () => {
    //         try {
    //             const response = await fetch(`${url_basic}/visitors/visitor-count`);
    //             const data = await response.json();
    //             setVisitorCount(data.count);
    //         } catch (error) {
    //             console.error('Error fetching visitor count:', error);
    //         }
    //     };

    //     const incrementVisit = async () => {
    //         const hasVisited = localStorage.getItem('hasVisited');
    //         if (!hasVisited) {
    //             try {
    //                 await fetch(`${url_basic}/visitors/increment-visit`, { method: 'POST' });
    //                 localStorage.setItem('hasVisited', 'true');
    //                 fetchVisitorCount();
    //             } catch (error) {
    //                 console.error('Error incrementing visitor count:', error);
    //             }
    //         } else {
    //             fetchVisitorCount();
    //         }
    //     };

    //     incrementVisit();
    // }, []);

    return (
        <div className="container mx-auto px-4 bg-gradient-to-br from-white to-gray-200 min-h-screen">
            {/* Welcome Message */}
            <div className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                शिव आज भी गुरु है
            </div>

            {/* Slideshow */}
            <div className="my-6 shadow-lg border-4 border-orange-400 rounded-lg overflow-hidden">
                <SlideShow />
            </div>

             {/* Additional Information */}
             <div className="mt-6 text-sm md:text-base lg:text-lg text-center text-gray-700 my-1">
                <p className="my-6 bg-gray-400 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">सभी उत्पाद स्वच्छता और गुणवत्ता के साथ तैयार किए गए हैं। हम आपके भरोसे का मान रखते हैं।</p>
                <p className="text-base md:text-lg lg:text-xl bg-orange-300 p-4 rounded-lg text-center text-gray-800 shadow-sm">आपके आराम के लिए हमारी ऑनलाइन सेवा उपलब्ध है, और ऑर्डर किए गए उत्पाद आपके दरवाजे तक पहुंचाए जाएंगे।</p>
            </div>

            {/* <div className="hero bg-cover bg-center h-64" style={{ backgroundImage: "url('https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/ij8rbsbbmskyh5dcuutb.jpg')" }}>
                <div className="hero-overlay bg-opacity-50 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold text-brown mb-4">Fresh Dairy, Pure Taste</h1>
                    <a href="/products" className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ">Explore Our Products</a>
                </div>
            </div> */}
            {/* Special Offer Section */}
            <div className="my-6 bg-gray-400 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">
                <h2>विशेष ऑफर!</h2>
                <p>अभी खरीदें और 10% छूट पाएं! ताजे उत्पादों पर सीमित समय के लिए।</p>
            </div>

            {/* Product Description */}
            <div className="text-base md:text-lg lg:text-xl bg-orange-300 p-4 rounded-lg text-center text-gray-800 shadow-sm">
                हमारे सभी उत्पाद ताजे दूध से बने होते हैं। यदि आप ऑर्डर करना चाहते हैं, तो कृपया <Link to="/login" className="text-red-600 font-bold hover:underline">लॉगिन</Link> करें। इसके बाद, आपको कई प्रकार के उत्पाद मिलेंगे जो हम बेचते हैं।
            </div>

           

            {/* Beautified Visitor Count */}
            {/* <div className="my-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">
                    <p className="mt-2">अब तक की विज़िटर संख्या:</p>
                    <p className="text-4xl mt-4 animate-bounce">{visitorCount}</p>
                    </div> */}
            {/* Owner Section */}
            <div className="my-6 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Meet the Owner</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <img
                        src="https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/ij8rbsbbmskyh5dcuutb.jpg"
                        alt="Owner"
                        className="w-40 h-60 object-cover rounded-full border-4 border-blue-300 shadow-lg"
                    />
                </div>
                <p className="text-center mt-4 text-gray-600">हमारे समर्पित मालिक सुनिश्चित करते हैं कि प्रत्येक उत्पाद उच्चतम गुणवत्ता मानकों को पूरा करता है। किसी भी पूछताछ या फीडबैक के लिए संपर्क करने के लिए स्वतंत्र महसूस करें।</p>
            </div>

        </div>
    );
}
