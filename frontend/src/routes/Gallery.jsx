import React from "react";
import useScrollToTop from "../images/ScrollTop";

// Sample gallery items with descriptions
const galleryItems = [
    {
        image: 'https://res.cloudinary.com/dldfc2cgl/image/upload/v1730793466/ypyg7delgtayjxn8yzj6.jpg',
        description: "गाय का दूध",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/wxlhlfcntmnojw4t0kss.jpg",
        description: "कंपनी की मशीनरी",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/enekderbccbet4v6n9bm.jpg",
        description: "कंपनी की मशीनरी",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/refh9jhwxejb49goptpv.jpg",
        description: "कंपनी की मशीनरी",
    },
    // {
    //     image: "https://images.unsplash.com/photo-1728360107161-f1004abda274?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFpcnklMjBmYXJtfGVufDB8fDB8fHww",
    //     description: "भैंस का दूध",
    // },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/g7ax6wkbjkesr9q4hakw.jpg",
        description: "दही",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1730562307/dfaiolv5lpis9z0djs1w.jpg",
        description: "पनीर",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1729699181/yf6xzc7edkdwwtukago7.png",
        description: "हमारा स्थान",
    },
];

export default function Gallery() {
    useScrollToTop();
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-white bg-blue-600 py-2 rounded-md shadow-lg">
                गैलरी
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl border-2 border-orange-300"
                    >
                        <img
                            src={item.image}
                            alt={item.description}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800 text-center">{item.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
