import React, {  useState } from "react";
import { Link,NavLink } from 'react-router-dom'


export default function Header() {

    const [authStatus,setAuthStatus] = useState(false);
    const NavItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "Products",
            slug: "/my-products",
            active: authStatus,
        },
        {
            name: "Orders",
            slug: "/orders",
            active: authStatus,
        },
    ]

    return (
        <>
            <header className="shadow py-4 bg-gray-500">
                <div className="mx-auto w-full px-4 max-w-7xl">
                    <nav className="flex">
                        <div className="mr-4">
                            <Link to='/'>
                                logo
                            </Link>
                        </div>
                        <ul className="flex ml-auto">
                            {NavItems.map((item) => (
                                (item.active) ? (<li key={item.slug}>
                                   <NavLink
                                            to={item.slug}
                                            className={({ isActive }) => 
                                                `inline-block px-6 py-2 duration-200 rounded-full ${isActive ? 'bg-slate-200' : ''}`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                </li>)
                                    : null
                            ))}
                            {
                                (authStatus&&(
                                    <li>
                                        logout
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Header */}
        </>
    )
}