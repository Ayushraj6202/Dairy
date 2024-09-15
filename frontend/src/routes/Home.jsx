import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SlideShow from "../images/SlideShow.jsx";

export default function Home() {
    const [visitorCount, setVisitorCount] = useState(0);
    const url_basic = import.meta.env.VITE_URL_BASIC;

    useEffect(() => {
        const fetchVisitorCount = async () => {
            try {
                const response = await fetch(`${url_basic}/visitors/visitor-count`);
                const data = await response.json();
                // console.log(data,response);
                
                setVisitorCount(data.count);
            } catch (error) {
                console.error('Error fetching visitor count:', error);
            }
        };

        const incrementVisit = async () => {
            // Check if the visitor has already been counted in this session
            const hasVisited = localStorage.getItem('hasVisited');
            // console.log(hasVisited);
            
            if (!hasVisited) {
                try {
                    // Increment visit only if the visitor hasn't been counted
                    await fetch(`${url_basic}/visitors/increment-visit`, { method: 'POST' });
                    localStorage.setItem('hasVisited', 'true');  // Mark the visitor as counted
                    fetchVisitorCount();  // Update the visitor count
                } catch (error) {
                    console.error('Error incrementing visitor count:', error);
                }
            }else{
                fetchVisitorCount()
            }
        };

        incrementVisit();  // Call the incrementVisit function on component mount
    }, []);

    return (
        <div className="container mx-auto px-4">
            {/* Welcome Message */}
            <div className="text-center text-2xl md:text-3xl lg:text-4xl mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md">
                शिव आज भी गुरु है
            </div>

            {/* Slideshow */}
            <div className="my-6 shadow-lg border-4 border-orange-400 rounded-lg">
                <SlideShow />
            </div>

            {/* Vishwakarma Puja Wish */}
            <div className="my-6 bg-yellow-400 text-black text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-red-500">
                <h2>विश्वकर्मा पूजा पर विशेष आमंत्रण!</h2>
                <p>आप सभी सादर आमंत्रित हैं। कृपया हमारे यहां पधारें और प्रसाद ग्रहण करें।</p>

                {/* Vishwakarma Puja Image */}
                <div className="mt-4">
                    <img
                        src="https://i.ndtvimg.com/i/2017-09/vishwakarma-puja_650x400_41505554028.jpg"
                        alt="Vishwakarma Puja"
                        className="w-full md:w-2/3 lg:w-1/2 mx-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Special Offer Section */}
            <div className="my-6 bg-red-500 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">
                <h2>विशेष ऑफर!</h2>
                <p>अभी खरीदें और 10% छूट पाएं! ताजे उत्पादों पर सीमित समय के लिए।</p>
            </div>

            {/* Product Description */}
            <div className="text-base md:text-lg lg:text-xl bg-orange-300 p-4 rounded-lg text-center text-gray-800 shadow-sm">
                हमारे सभी उत्पाद ताजे दूध से बने होते हैं। यदि आप ऑर्डर करना चाहते हैं, तो कृपया <Link to="/login" className="text-red-600 font-bold hover:underline">लॉगिन</Link> करें। इसके बाद, आपको कई प्रकार के उत्पाद मिलेंगे जो हम बेचते हैं।
            </div>

            {/* Additional Information */}
            <div className="mt-6 text-sm md:text-base lg:text-lg text-center text-gray-700 my-1">
                <p className="my-6 bg-green-500 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">सभी उत्पाद स्वच्छता और गुणवत्ता के साथ तैयार किए गए हैं। हम आपके भरोसे का मान रखते हैं।</p>
                <p className="text-base md:text-lg lg:text-xl bg-orange-300 p-4 rounded-lg text-center text-gray-800 shadow-sm">आपके आराम के लिए हमारी ऑनलाइन सेवा उपलब्ध है, और ऑर्डर किए गए उत्पाद आपके दरवाजे तक पहुंचाए जाएंगे।</p>
            </div>

            {/* Beautified Visitor Count */}
            <div className="my-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-lg md:text-xl lg:text-2xl font-bold p-6 rounded-lg text-center shadow-lg border border-yellow-300">
                <p className="mt-2">अब तक की विज़िटर संख्या:</p>
                <p className="text-4xl mt-4 animate-bounce">{visitorCount}</p>
            </div>
        </div>
    );
}
