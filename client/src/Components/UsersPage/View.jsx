import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const apiUrl = 'http://localhost:5000'
function View() {

  const [user, setUser] = useState(null)
  const {id} = useParams()
  useEffect(()=>{
    const fetchUsers = async () =>{
    
      try {
        const response = await axios.get(`${apiUrl}/api/admin/${id}`,{
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if(response.data.message){
          setUser(response.data.user);
        }
      } catch (error) {
        toast.error(error)
      }
    }
    fetchUsers()
  },[])
  
  return (
    <>
    {user ? ( 
    <section>
      <div className='p-6 '>
              <Link to='/dashboard/users-list' className='px-4 py-2 bg-teal-500 text-white rounded text-decoration-none'>Back</Link>
          </div>
      <div className='max-w-2xl mx-auto mt-10 bg-white rounded-md shadow-lg w-50 p-6'>
        <div className='text-center text-2xl font-bold'> Admin Details</div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>Last Name</p>
          <p className='font-medium'>{user.userId.lastname}</p>
        </div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>First Name</p>
          <p className='font-medium'>{user.userId.firstname}</p>
        </div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>Email Address</p>
          <p className='font-medium'>{user.userId.email}</p>
        </div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>Role</p>
          <p className='font-medium'>{user.userId.role}</p>
        </div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>Phone number</p>
          <p className='font-medium'>{user.userId.phone}</p>
        </div>
        <div className='flex space-x-3'>
          <p className='text-lg font-bold'>Gender</p>
          <p className='font-medium'>{user.gender}</p>
        </div>
      </div>
    </section>
    ): <div>loading</div>}
    </>
  )
}

export default View