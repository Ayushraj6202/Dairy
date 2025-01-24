import React, { useEffect, useState } from "react";

export default function SlideShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // State for loading
  const images = [
    "https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg",
    // "https://userpic.codeforces.org/2702363/title/82fa57c672a581b4.jpg",
    // "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/ij8rbsbbmskyh5dcuutb.jpg",
    "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/wxlhlfcntmnojw4t0kss.jpg",
    "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/g7ax6wkbjkesr9q4hakw.jpg",
    "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/enekderbccbet4v6n9bm.jpg",
    "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/refh9jhwxejb49goptpv.jpg",
    "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975112/g8xzsbkovtg9qvcj5qqy.jpg",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      // setLoading(true); // Set loading state on slide change
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false once the image is loaded
  };

  return (
    <div className="max-w-full h-full w-full py-1 px-1 flex flex-col items-center justify-center">
      <div className="relative w-70 h-64 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span>Loading...</span>
          </div>
        )}
        <img
          src={images[currentIndex]}
          alt="slideshow"
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  );
}

