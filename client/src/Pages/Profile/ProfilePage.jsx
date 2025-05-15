import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useAuth } from '../../Components/Hook/authContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap'


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'
function Profile() {

  const { user } = useAuth()
  const navigate = useNavigate()
  

  return (
    <>
      <Navbar />
      <section>
        <div className='px-5'>
          <div className='max-w-3xl mx-auto mt-10 bg-white rounded-md shadow-lg p-6 card  '>
          <h6>User's Account Details</h6>
            <div>
             
              <input
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                name="firstname"
                id='firstname'
                disabled
                value={user.firstname}
              />
            </div>

            <div>
              <label htmlFor='Lastname'
                className='text-sm font-medium text-gray-700'
              >Lastname
              </label>
              <input
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                disabled
                name="lastname"
                id='lastname'
                value={user.lastname}
              />
            </div>
            <div>
              <label htmlFor='Phone number'
                className='text-sm font-medium text-gray-700'
              >Phone number
              </label>
              <input
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                id='phone'
                disabled
                name="phone"
                value={user.phone}
              />
            </div>

            <div>
              <label htmlFor='Email Address'
                className='text-sm font-medium text-gray-700'
              >Email Address
              </label>
              <input
                className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                id='email'
                disabled
                name="email"
                value={user.email}
              />
            </div>
            
            <Link to={`/profile/${user._id}`}>
            <button 
            className='bg-emerald-800 text-white rounded px-2 py-2'
            onClick={()=> 
              navigate(`/profile/${id}`)
        
            }
              
            >Edit Profile</button>
            
            </Link>
            
          </div>
        </div>
      </section>

    </>
  )
}

export default Profile