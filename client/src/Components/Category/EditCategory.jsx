import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import * as FaIcon from 'react-icons/fa'
import { Alert } from 'react-bootstrap'


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'

function EditCategory() {
  const category = {
    category: '',
    description: '',
  }

  const { id } = useParams();
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState(category)

  const inputHandler = (e) => {
    const {value, name} = e.target;
    setCategories({...categories, [name]: value });
  };

  
  
  useEffect(() => {
    const response = axios.get(`${apiUrl}/api/category/category/${id}`)
      .then((response) => {
        setCategories(response.data)
      }).catch((error) => {
        setError(error.response.data.message)
      })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/category/update/${id}`, categories,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
      if (response.data.message) {
        toast.success(response.data.message)
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <>
      <section>
        <div className='mt-2 py-2 px-3'>
          <NavLink to='/dashboard/category' className='w-20 block flex items-center block bg-emerald-700  hover:bg-teal-600 space-x-1 text-white rounded py-2 px-3 text-decoration-none'><FaIcon.FaArrowLeft />Back</NavLink>

        </div>
        <div className='max-w-3xl mx-auto mt-10 bg-white rounded-md shadow-lg w-98 p-6'>
          <h3 className='text-2xl font-bold text-center'> Edit Category</h3>
          {error && <Alert variant='danger'>{error}</Alert>}
          <form onSumbit={handleSubmit}>
            <div>
              <label
                htmlFor='category'
                className='text-sm py-2 px-2 font-medium text-gray-700'>Category</label>
              <input
                type="text"
                name='category'
                id='category'
                className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                value={categories.category}
                onChange={inputHandler}
              />
  
              <label
                htmlFor='description'
                className='text-sm py-2 px-2 font-medium text-gray-700'>Description</label>
              <textarea
                type="text"
                name='description'
                id='description'
                className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                value={categories.description}
                onChange={inputHandler}
                row='5'
              ></textarea>
            </div>
            <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Update</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default EditCategory