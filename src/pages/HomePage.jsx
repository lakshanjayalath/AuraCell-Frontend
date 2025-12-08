import React from 'react'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import ProductOverview from './ProductOverview'
import Cart from './Cart'
import Checkout from './Checkout'

export default function () {
  return (
    <div className='w-full h-full bg-primary'>
        <Header />
        <Routes path='/'>
            <Route path='/' element={<h1>Welcome to Home Page</h1>} />
            <Route path='/products' element={<ProductPage />} />
            <Route path='/about' element={<h1>About Page</h1>} />
            <Route path='/contact' element={<h1>Contact Page</h1>} />
            <Route path='/overview/:id' element={ <ProductOverview /> } />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
    </div>
  )
}
