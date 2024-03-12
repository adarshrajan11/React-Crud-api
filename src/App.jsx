import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import AddProduct from './components/AddProduct'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/add-data' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
