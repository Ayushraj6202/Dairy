import React from "react";

// Sample gallery items with descriptions
const galleryItems = [
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/cow_milk.jpg",
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
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/buffalo_milk.jpg",
        description: "भैंस का दूध",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1725975110/g7ax6wkbjkesr9q4hakw.jpg",
        description: "दही",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/paneer.jpg",
        description: "पनीर",
    },
    {
        image: "https://res.cloudinary.com/dldfc2cgl/image/upload/v1726750630/location.jpg",
        description: "हमारा स्थान",
    },
];

export default function Gallery() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 bg-blue-500 py-1 text-white">गैलरी</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105"
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
