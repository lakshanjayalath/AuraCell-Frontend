import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import AdminProductPage from './admin/AdminProductPage';
import AdminAddNewProduct from './admin/AdminAddNewProduct';
import AdminUpdateProduct from './admin/AdminUpdateProduct';
import AdminOrdersPage from './admin/AdminOrdersPage';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

export default function AdminPage() {

  const navigate = useNavigate();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("Please login to access admin panel");
        navigate("/login");
        return;
      }
      axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.data.role !== "admin") {
          toast.error("You are not authorized to access admin panel");
          navigate("/");
          return;
        }
        setUserLoaded(true);
      }).catch(() => {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
    }, []
  )

  return (
    <div className='w-full h-full bg-primary flex p-2 text-secondary'>
      <div className='w-[300px] h-full flex flex-col items-center gap-[20px]'>
        <div className='flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-[20px]'>
          <img src="/logo.png" alt="logo" className='h-[100px]' />
          <span className='text-white text-xl ml-4'>Admin Panel</span>
        </div>
        <Link to='/admin' className='w-[90%] flex items-center gap-2 px-4 rounded-lg'>
          <MdDashboard />
          Dashboard
        </Link>
        <Link to='/admin/orders' className='w-[90%] flex items-center gap-2 px-4 rounded-lg'>
          <MdShoppingCart />
          Ordes
        </Link>
        <Link to='/admin/products' className='w-[90%] flex items-center gap-2 px-4 rounded-lg'>
          <FaBoxes />
          Products
        </Link>
        <Link to='/admin/users' className='w-[90%] flex items-center gap-2 px-4 rounded-lg'>
          <FaUsers />
          Users
        </Link>
      </div>
      <div className='w-[calc(100%-300px)] h-full border-[2px] border-accent rounded-[20px] overflow-hidden'>
        <div className='h-full w-full max-w-full max-h-full overflow-y-scroll'>
          {userLoaded ? <Routes path='/'>
            <Route path='/' element={<h1>Dashboard</h1>} />
            <Route path='/products' element={<AdminProductPage />} />
            <Route path='/orders' element={<AdminOrdersPage />} />
            <Route path='/add-product' element={<AdminAddNewProduct />} />
            <Route path='/update-product' element={<AdminUpdateProduct />} />
          </Routes> : <Loader />}
        </div>
      </div>
    </div>
  )
}
