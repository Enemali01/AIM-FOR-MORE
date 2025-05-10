import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Alert } from 'react-bootstrap'
import * as FaIcon from 'react-icons/fa'

const apiUrl = 'https://aim-for-more-server.onrender.com'

function EditPost() {
  const post = {
    title: '',
    category: '',
    description: '',
   
   }
    
   const { id } = useParams();
  const [error, setError] = useState(false)
  const  [posts, setPosts] = useState(post)

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setPosts({...posts, [name]: value });
    };
  

  useEffect(()=>{
       axios.get(`${apiUrl}/api/blog/posts/${id}`)
       .then((response) => {
        setPosts(response.data)
      }).catch((error)=>{
        setError(error.response.data.message)
      })
    
  },[id])
  
  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.put(`${apiUrl}/api/blog/update/${id}`,posts,
        {
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`   
          }
        })
        if(response.data.message){
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
        <NavLink to='/dashboard/blog' className='w-20 block flex items-center block bg-emerald-700  hover:bg-teal-600 space-x-1 text-white rounded py-2 px-3 text-decoration-none'><FaIcon.FaArrowLeft/>Back</NavLink>
        
        </div>
        <div className='max-w-2xl mx-auto mt-10  bg-white rounded-md shadow-lg w-98 p-1 px-2 py-2'>
        <h4 className='text-4xl font-bold text-center'>Edit blog Post</h4>
            {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleEditPost}>
              <div className='mt-3'>
                <label
                  htmlFor='title'
                  className='text-sm py-2 px-2 font-medium text-gray-700'
                >Title
                </label>
                <input
                  type='text'
                  name='title'
                  className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                  value={posts.title}
                  onChange={inputHandler}
                  id='title'
                />
                <label
                  htmlFor='category'
                  className='text-sm py-2 px-2 font-medium text-gray-700'
                >Category
                </label>
                <input
                  type='text'
                  name='category'
                  
                  className='mt-1 w-full p-2 border border-gray-400 rounded-md'
                  onChange={inputHandler}
                  id='category'
                  value={posts.category}
                />
                <label
                  htmlFor='description'
                  className='text-sm py-2 px-2 font-medium text-gray-700'
                >Description
                </label>
                <textarea
                  type='text'
                  name='description'
                  className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
                  rows='8'
                  onChange={inputHandler}
                  id='description'
                  value={posts.description}
                ></textarea>
                {/* <label htmlFor='fileUpload'>Select Image</label>
                <input
                  type='file'
                  accept='png,jpeg,jpg'
                  name='file'
                  className='block w-full border border-gray-400 rounded-md p-2 mt-1 py-2 px-3 mb-4'
                  onChange={inputHandler}
                  id='file'
                  value={posts.file}
                /> */}
              </div>
              <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Edit Blog Post</button>
            </form>
        </div>
      </section>
    </>
  )
}

export default EditPost