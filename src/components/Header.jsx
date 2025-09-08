import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <header className='w-full bg-accent h-[100px] text-white px-[40px]'>
        <div className='w-full h-full flex relative'>
          <a href="/home"><img src="/logo.png" className='h-full w-[170px] left-0 object-cover absolute' /></a>
            <div className='h-full flex justify-center items-center w-full text-lg gap-[20px]'>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    </header>
  )
}
