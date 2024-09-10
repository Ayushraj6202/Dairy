import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header.jsx'
import Footer from './Footer/Footer.jsx'
function App() {



  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App
