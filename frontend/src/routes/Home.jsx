import React from "react";
import { Link } from "react-router-dom";
import SlideShow from "../images/SlideShow.jsx";

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <meta name="google-site-verification" content="kUH9VIPvqsb79aLWZUNPd7FC8v0u9yYUuVPysacpQHg" />
            {/* Welcome Message */}
            <div className="text-center text-2xl md:text-3xl lg:text-4xl mt-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md">
            शिव आज भी गुरु है
            </div>

            {/* Slideshow */}
            <div className="my-6 shadow-lg border-4 border-orange-400 rounded-lg">
                <SlideShow />
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
        </div>
    );
}
