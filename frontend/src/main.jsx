import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route,RouterProvider,createBrowserRouter } from 'react-router-dom'

//routes
import Home from './routes/Home.jsx'
import Login from './routes/Login.jsx'
import SignUp from './routes/SignUp.jsx'
import Orders from './routes/Orders.jsx'
import Products from './routes/Products.jsx'


const router =  createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:"",
          element:<Home/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<SignUp/>
        },
        {
          path:'products',
          element:<Products/>
        },
        {
          path:'orders',
          element:<Orders/>
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
