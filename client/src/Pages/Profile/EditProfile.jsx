import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


const apiUrl = 'http://localhost:5000'

function Editprofile() {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    password: '',
  })


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${apiUrl}/api/users/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getUser();

  }, [])

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/users/${id}`, user,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.message){
          toast.success(response.data.message)
          navigate('/profile')
        }
    } catch (error) {
     toast.error(response.error.message)
    }

  }


  return (
    <>
      <Navbar />
      <div>

        <>
          {loading ? <div>Loading...</div> :
            <div className='max-w-2xl mx-auto mt-10 bg-white rounded-md shadow-lg px-7 py-1'>
              <div>
              <Link to='/profile'>
            <button 
            className='bg-emerald-800 text-white rounded px-4 py-1'
            >Back</button>
            </Link>
              </div>
              <form onSubmit={handleEdit}>
                <div>
                  <label
                    className='text-sm font-medium text-gray-700 pt-4'
                  >Firstname</label>

                  <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    onChange={inputHandler}
                    value={user.firstname}
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastname'
                    className='text-sm font-medium text-gray-700'
                  >lastname</label>
                  <input
                    type='text'
                    name='lastname'
                    className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    onChange={inputHandler}
                    value={user.lastname}
                  />
                </div>
                <div>
                  <label
                    htmlFor='phone'
                    className='text-sm font-medium text-gray-700'
                  >Phone Number</label>
                  <input
                    type='text'
                    name='phone'
                    className='mt-1 w-full p-2 mb-3 border border-gray-300 rounded-md'
                    onChange={inputHandler}
                    value={user.phone}
                  />
                </div>
                
                <div>
                  <button type='submit' className='bg-emerald-700 text-white px-3 py-2 w-full'>Update</button>
                </div>
              </form>

            </div>
          }
        </>

      </div>
    </>
  )
}

export default Editprofile