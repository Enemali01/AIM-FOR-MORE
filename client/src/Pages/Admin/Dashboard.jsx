import React, { useState } from 'react'
import { useAuth } from '../../Components/Hook/authContext.jsx'
import { Container,Button, Form } from 'react-bootstrap';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router'
import * as Falcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import * as FaIcon from 'react-icons/fa6';
import AdminSidbar from './AdminSidbar.jsx';
import Navbar from './Navbar.jsx';



const Dashboard = () => {
 const {user} = useAuth()
   return (
  <>
  <section className='flex'>
    <AdminSidbar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        <Navbar />
        <Outlet />
    </div>
    </section>
  </>
  )
}

export default Dashboard