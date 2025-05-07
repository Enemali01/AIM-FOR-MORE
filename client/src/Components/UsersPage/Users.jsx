import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const apiUrl = 'http://localhost:5000'

function Users() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/admin/add`, formData, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success.message){
        toast(response.data.message)
        navigate('/dashbaord/users-list')
      }
    } catch (error) {
      toast(error.response.data.message)
    }
  }


  return (
    <>
      <section>
        <div className='mt-2 py-2 px-3'>
          <NavLink to='/dashboard/users-list' className='w-20 block flex items-center block bg-emerald-700  hover:bg-teal-600 space-x-1 text-white rounded py-2 px-3 text-decoration-none'><FaArrowLeft />Back</NavLink> </div>
        <div className=' mx-auto w-lg p-3 bg-white px-3 rounded-md shadow-md w-98 max-w-4xl'>
          <h4 className='text-2xl font-bold text-center'>Add Admin information</h4>
          <form onSubmit={handleSubmit} className='grif grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
            <label className='block text-sm font-medium text-gray-700'>Firstame</label>
              <input
                type='text'
                name='firstname'
                placeholder='Insert Firstname'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
            <label className='block text-sm font-medium text-gray-700'>Lastname</label>
              <input
                type='text'
                name='lastname'
                placeholder='Insert lastname'
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label className='block text-sm font-medium text-gray-700'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='example@mail.com'
                className='mt-1 p-2 border w-full border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
              <input
                type='phone'
                name='phone'
                placeholder='Phone Number'
                className='mt-1 p-2 border w-full border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='***********'
                className='mt-1 p-2 border w-full border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label className='block text-sm font-medium text-gray-700'>Confirm Password</label>
              <input
                type='password'
                name='password'
                placeholder='***********'
                className='mt-1 p-2 block w-full border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label className='block text-sm font-medium text-gray-700'>Select Gender</label>
              <select 
              name='gender'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
              onChange={handleChange}
              >
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
              </select>
              </div>
              <div>
              <label className='block text-sm font-medium text-gray-700'>Role</label>
              <select 
              name='role'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
              onChange={handleChange}
              >
              <option value='role'>Select Role</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
              </select>
              </div>
              <div className='p-3'>
                <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Create an Admin</button>
                </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Users