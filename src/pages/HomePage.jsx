import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'

export default function () {
  return (
    <div className='w-full h-full bg-primary'>
        <Header />
        <Routes path='/'>
            <Route path='/' element={<h1>Welcome to Home Page</h1>}></Route>
            <Route path='/products' element={<h1>Products List</h1>}></Route>
            <Route path='/about' element={<h1>About Page</h1>}></Route>
            <Route path='/contact' element={<h1>Contact Page</h1>}></Route>
            <Route path='/*' element={<h1>404 Not Found</h1>}></Route>
        </Routes>
    </div>
  )
}
