import React, { useEffect, useState } from 'react';
import SummaryCard from '../../Components/Summary/SummaryCard'
import { FaBlog, FaCheckCircle, FaJediOrder, FaUser } from 'react-icons/fa'
import axios from 'axios';


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'

function AdminSummary() {

  const [totalPosts, setTotalPosts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalOrdersPending, setTotalOrdersPending] = useState(0);


  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/blog/total/count`);
      setTotalPosts(response.data.total);
      } catch (error) {
        console.error('Error fetching total posts:', error);
      }
    };

    fetchTotalPosts();
    fetchTotalOrders();
    fetchTotalOrdersPending();
  }, []);

  const fetchTotalOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/total/count`);
    setTotalOrders(response.data.total);
    } catch (error) {
      console.error('Error fetching total posts:', error);
    }
  };
  const fetchTotalOrdersPending = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/order/total/pending`);
      setTotalOrdersPending(response.data.total);
    } catch (error) {
      console.error('Error fetching total posts:', error);
    }
  };

  return (
    <>
    <section className='p-6'>
      <h5 className='text-2xl font-bold'>Dashbaord Overview</h5>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
            <SummaryCard icon={<FaUser/>} text="Total Users" number={13} color='bg-teal-600'/>
            <SummaryCard icon={<FaJediOrder/>} text="Total Orders" number={totalOrders} color='bg-yellow-600'/>
            <SummaryCard icon={<FaBlog/>} text="Total Blog Post" number={totalPosts} color='bg-gray-600'/>
           
        </div>

    <div className='mt-20'>
      <h5 className='text-center text-2xl font-bold'>Pending Orders</h5>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
      <SummaryCard icon={<FaJediOrder/>} text="Total Pending Orders" number={totalOrdersPending} color='bg-yellow-600'/>
      <SummaryCard icon={<FaCheckCircle/>} text="Total Orders Approved" number={23} color='bg-sky-800'/>
      </div>
    </div>
    </section>
    
    </>
  )
}

export default AdminSummary