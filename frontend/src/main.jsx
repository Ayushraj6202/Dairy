import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'

//routes
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/SignUp.jsx'
import Orders from './routes/Orders.jsx'
import Products from './routes/Products.jsx'
import AddProduct from './routes/AddProduct.jsx'
import EditProduct from './routes/EditProducts.jsx'
import AuthLayout from './state/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: 'login',

          element:
            (
              <AuthLayout userRole={true} sellerRole={true} >
                <Login />
              </AuthLayout>
            )
        },
        {
          path: 'signup',
          element: (
            <AuthLayout userRole={true} sellerRole={true}>
              <SignUp />
            </AuthLayout>)
        },
        {
          path: 'products',
          element: (
            <AuthLayout userRole={true} sellerRole={true}>
              <Products />
            </AuthLayout>
          )
        },
        {
          path: 'orders',
          element: (
            <AuthLayout userRole={true} sellerRole={true}>
              <Orders />
            </AuthLayout>
          )
        },
        {
          path: 'add-products',
          element:
            (
              <AuthLayout sellerRole={true}>
                <AddProduct />
              </AuthLayout>
            )
        },
        {
          path: 'delete/:id',
          element: (
            <AuthLayout sellerRole={true}>
              <EditProduct />
            </AuthLayout>
          )
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
