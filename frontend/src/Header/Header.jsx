import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { storelogout } from "../store/authslice";
import LoadingComp from "../images/Loading";
import Cookies from 'js-cookie';

export default function Header() {
  const dispatch = useDispatch();
  // const role = useSelector((state) => state.auth.role);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
  const [loading, setLoading] = useState(false); // Loading state for logout
  const navigate = useNavigate();
  const URL_BASIC = import.meta.env.VITE_URL_BASIC;

  // const token = Cookies.get('token');
  // const role = Cookies.get('role');
  
  const role = useSelector((state)=>state.auth.role);
  const authStatus = useSelector((state)=>state.auth.status);
  useEffect(()=>{

  },[authStatus,role,dispatch])
  console.log("header token ", authStatus,role);
  const NavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Products", slug: "/products", active: 1 },
    { name: "Gallery", slug: "/gallery", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Add Products", slug: "/add-products", active: (role === 'seller') },
    { name: "Orders", slug: "/orders", active: authStatus },
  ];

 const HandleLogout = async () => {
  setLoading(true);
  try {
    await fetch(`${URL_BASIC}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important: This allows cookies to be sent with the request
    });
    dispatch(storelogout());
    // Refresh the window
    navigate('/')
    window.location.reload();
  } catch (error) {
    console.error("Logout failed: ", error);
  } finally {
    setLoading(false); 
  }
};


  if (loading) {
    return <LoadingComp />;
  }

  return (
    <>
      <header className="shadow py-4 bg-gray-500">
        <div className="mx-auto px-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src="https://trademaklogos.s3.ap-south-1.amazonaws.com/6095525.jpeg"
                height={50}
                width={50}
                alt="logo"
              />
            </Link>
            <h1 className="text-white text-xl font-semibold">Khetalpura Dairy</h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="block lg:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6 items-center">
            {NavItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `inline-block px-6 py-2 duration-200 rounded-full ${
                          isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={HandleLogout}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            )}
          </ul>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <ul className="lg:hidden px-4 mt-4 flex flex-col space-y-2">
            {NavItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `block w-full text-center px-6 py-2 duration-200 rounded-full ${
                          isActive ? "bg-slate-200 text-gray-800" : "text-white"
                        }`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
            {authStatus && (
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded"
                onClick={() => {
                  HandleLogout();
                  setMenuOpen(false);
                }}
                disabled={loading} // Disable button when loading
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            )}
          </ul>
        )}
      </header>
    </>
  );
}
