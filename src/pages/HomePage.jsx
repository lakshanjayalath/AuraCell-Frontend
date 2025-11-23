import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import ProductOverview from './ProductOverview'

export default function () {
  return (
    <div className='w-full h-full bg-primary'>
        <Header />
        <Routes path='/'>
            <Route path='/' element={<h1>Welcome to Home Page</h1>}></Route>
            <Route path='/products' element={<ProductPage />}></Route>
            <Route path='/about' element={<h1>About Page</h1>}></Route>
            <Route path='/contact' element={<h1>Contact Page</h1>}></Route>
            <Route path='/overview/:id' element={ <ProductOverview /> } />
            <Route path='/*' element={<h1>404 Not Found</h1>}></Route>
        </Routes>
    </div>
  )
}
