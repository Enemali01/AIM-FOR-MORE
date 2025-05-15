import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'

function AddCategory() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState({
    category: '',
    description: ''
  })
  

  const handleChange = (e) => {
    const {name, value} = e.target;
     setCategories({...categories, [name] : value})
  }

  const handleCategory = async (e) => {
   e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/category/add`,categories, {
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      if(response.data.message){
        navigate('/dashboard/category')
        toast.success(response.data.message)
      }
    } catch (error) {
        toast.error(error.response.data.message)
     
    }
    
  }

  return (
    <>
      <section>
        <div className='max-w-3xl mx-auto mt-10 bg-white rounded-md shadow-lg w-98 p-6'>
          <h3 className='text-2xl font-bold mt-6'>Add New Category</h3>
          <form onSubmit={handleCategory}>
            <div className='mt-3'>
              <label
                
                className='text-sm font-medium text-gray-700'
              >Category Name
              </label>
              <input
                type='text'
                name='category'
                placeholder='Enter Name of Category'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                onChange={handleChange}
                required
              />
            </div>
            <div className='mt-3'>
              <label
                
                className='text-sm font-medium text-gray-700 rounded'
              >Description
              </label>
              <textarea
                name="description"
                placeholder='Description'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                rows='4'
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full mt-5 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2'
            >Add Category</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default AddCategory