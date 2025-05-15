import React from 'react'
import { FaBolt, FaBook, FaFacebookMessenger, FaFirstOrderAlt, FaTachometerAlt, FaTelegramPlane, FaUser } from 'react-icons/fa'
import { FaProductHunt } from 'react-icons/fa6'
import { MdCategory } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'

function AdminSidbar() {
  return (
    <>
    <section className='bg-emerald-700 text-white h-screen fixed left-0 top-0 buttom-0 space-y-4 w-64'>
      <div className='bg-teal-500 h-12 items-center justify-center'>
        <h4 className='text-3xl p-2 text-center font-pacific'>AIM GLOBAL</h4>
      </div>
      <div className='px-5'>
        <NavLink to="/dashboard" 
         className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-2 block py-1 px-2 rounded text-white text-decoration-none`} end>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/users-list" 
          className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-2 block py-1 px-2 rounded text-decoration-none text-white`}>
          <FaUser />
          <span>Users</span>
          </NavLink>
          <NavLink to="/dashboard/product" 
          className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-2 block py-1 px-2 rounded text-decoration-none text-white`}>
          <FaProductHunt />
          <span>Product</span>
        </NavLink>
        <NavLink to="/dashboard/admin/order-list"
           className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-2 block py-1 px-2 rounded text-decoration-none text-white`}>
        <FaFirstOrderAlt />
          <span>Order</span>
        </NavLink>
        <NavLink to="/dashboard/blog" 
           className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-2 block py-2 px-2 rounded text-decoration-none text-white`}>
          <FaBook />
          <span>Blog</span>
        </NavLink>
        <NavLink to="/dashboard/category" 
           className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-1 block py-2 px-2 rounded text-decoration-none text-white`}>
          <MdCategory />
          <span>Category</span>
        </NavLink>
        <NavLink to="/dashboard/message" 
           className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-1 block py-2 px-2 rounded text-decoration-none text-white`}>
          <FaTelegramPlane />
          <span>Message</span>
        </NavLink>
        <NavLink to="/dashboard/popular" 
           className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-1 block py-2 px-2 rounded text-decoration-none text-white`}>
          <FaTelegramPlane />
          <span>Popular Products</span>
        </NavLink>
        <NavLink to="/setting" 
          className={({isActive}) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-1 block py-2 px-1 rounded text-decoration-none text-white`}>
          <FaBolt />
          <span>Settings</span>
        </NavLink>
        
      </div>
    </section>
    
    </>
  )
}

export default AdminSidbar