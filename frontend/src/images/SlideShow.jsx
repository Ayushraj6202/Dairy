import React, { useEffect, useState } from "react";

export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg",
        "https://scontent-bom2-2.xx.fbcdn.net/v/t39.30808-1/329113807_5822275321142879_5736902509068591337_n.jpg?stp=dst-jpg_s100x100&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=uzHjf12tRlwQ7kNvgHmxIvf&_nc_ht=scontent-bom2-2.xx&oh=00_AYCTR0ebFJWRxBMwEKnOIbL4-EalTp5kMRoYWtpkZIUXXA&oe=66E3A223",
        "https://userpic.codeforces.org/2702363/title/82fa57c672a581b4.jpg",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="max-w-full h-full w-full py-4 px-4 flex items-center justify-center">
            <div className="relative w-64 h-64 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
                <img 
                    src={images[currentIndex]} 
                    alt="slideshow" 
                    className="w-full h-full object-cover" 
                />
            </div>
        </div>
    );
}
