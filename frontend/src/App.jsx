import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import { storelogin, storelogout } from './store/authslice.js'; // Your actions

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url_basic = import.meta.env.VITE_URL_BASIC;
    // Check token validity and set authentication state
    // const checkAuth = async () => {
    //     const token = localStorage.getItem('x-auth-token');
    //     // console.log(token);
        
    //     if (token) {
    //         try {
    //             const response = await fetch(`${url_basic}/authToken`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'x-auth-token': token,
    //                 },
    //             });
    //             // console.log(response);
                
    //             if (response.ok) {
    //                 const result = await response.json();
    //                 dispatch(storelogin(result.user)); // Set user info in Redux store
    //             } else {
    //                 localStorage.removeItem('x-auth-token');
    //                 dispatch(storelogout()); // Clear user info and logout
    //                 navigate('/login'); // Redirect to login if token is invalid
    //             }
    //         } catch (error) {
    //             console.error('Token validation failed:', error);
    //             localStorage.removeItem('x-auth-token');
    //             dispatch(storelogout());
    //             navigate('/login'); // Redirect to login if there is an error
    //         }
    //     }
    // };

    // useEffect(() => {
    //     checkAuth();
    // }, [dispatch, navigate]);

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
