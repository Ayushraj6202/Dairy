import React, { useEffect, useState } from "react";

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for loading
  const images = [
    "https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg",
    "https://userpic.codeforces.org/2702363/title/82fa57c672a581b4.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setLoading(true); // Set loading state on slide change
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <div className="max-w-full h-full w-full py-4 px-4 flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span>Loading...</span>
          </div>
        )}
        <img
          src={images[currentIndex]}
          alt="slideshow"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad} // Call handleImageLoad when the image loads
        />
      </div>
    </div>
  );
}

