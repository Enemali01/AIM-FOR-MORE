import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'


export default function AddProducts() {
const navigate = useNavigate();
const [error, setError] = useState(false)
// const [name, setName] = useState('')
// const [price, setPrice] = useState('')
// const [quantity, setQuantity] = useState('')
// const [description, setDescription] = useState('')
// const [file, setFile] = useState('')
const [category, setCategory] = useState({})
const [formData, setFormData] = useState({})

useEffect(()=> {
  const getAll = async() =>{
  try {
    const displayCategory = await axios.get(`${apiUrl}/api/category/all`)
    setCategory(displayCategory.data)
  } catch (error) {
    console.log(error)
  }
}
getAll()
},[])


const handleChange = (e) =>{
  const {name, value, files} = e.target;
  if(name === 'file'){
    setFormData((prevData) =>({...prevData, [name] :files[0]}))
  }else{
    setFormData((prevData) =>({...prevData, [name] : value}))
  }
}


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const  formDataObj = new FormData()
    // formDataObj.append('name', name);
    // formDataObj.append('price', price);
    // formDataObj.append('quantity', quantity);
    // formDataObj.append('category', category);
    // formDataObj.append('description', description);
    // formDataObj.append('file', file);
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

  

    const response = await axios.post(`${apiUrl}/api/product/add`,  formDataObj, {
      headers: {
       'Authorization' : `Bearer ${localStorage.getItem('token')}`  
      }
    })
    console.log(response)
    if(response.data.message){
      toast.success(response.data.message)
      navigate('/dashboard/product')
    }
  } catch (error) {
    console.log(error)
  }
}




  return (
    <>
    <section className='h-screen'>
    <div className='mt-2 py-2 px-3'>
    <NavLink to='/dashboard/product' className='w-20 block flex items-center block bg-emerald-700  hover:bg-teal-600 space-x-1 text-white rounded py-2 px-3 text-decoration-none'><FaArrowLeft />Back</NavLink> </div>
        <div className='max-w-2xl mx-auto w-lg p-3 bg-white px-3 rounded-md shadow-md w-98'>
        <h3 className='text-2xl font-bold text-center'>Add Product</h3>
        {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                <label 
                 htmlFor='product name'
                 className='text-sm font-medium text-gray-700'
                 >
                  Product Name
                  </label>
                <input 
                  type='text'
                  placeholder='Enter Product name'
                  name='name'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={handleChange}
                />
                </div>
                <div>
                <label 
                htmlFor='price'
                 className='text-sm font-medium text-gray-700'
                >Price</label>
                <input 
                  type='number'
                   min='1'
                  max='100000'
                  placeholder='Enter Product Price'
                  name='price'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={handleChange}
                />
                </div>
                <div>
                <label 
                htmlFor='quantity'
                className='text-sm font-medium text-gray-700'
                >Quantity</label>
                <input 
                  type='number'
                  placeholder='Enter Product Quantity'
                  name='quantity'
                  min='1'
                  max='100000'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={handleChange}
                />
                </div>
                {/* <div>
              <label className='block text-sm font-medium text-gray-700'>Category</label>
              <select 
              name='category'
              className='mt-1 p-2 block w-full border-gray-300 rounded-md'
              required
              onChange={handleChange}
              >
              <option value='category'>Select Role</option>
              <option value='oil'>Oil</option>
              <option value='birds'>Bird</option>
              </select>
              </div> */}
                <div>
                  <label htmlFor='Category'>Category</label>
                  <select 
                  name='category'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={handleChange}
                  
                  >
                    <option value='' >Select Category</option>
                    {Array.isArray(category) && category.map((cat) =>(
                      <option key={cat.id} value={cat._id}>{cat.category}</option>
                    ))}
                  </select>
                </div>
                <div>
                <label 
                htmlFor='description'
                className='text-sm font-medium text-gray-700'
                >Description</label>
                <textarea 
                  type='text'
                  placeholder='Enter Product name'
                  name='description'
                  className='mt-1 w-full h-60 p-2 border border-gray-300 rounded-md'
                  row='8'
                  onChange={handleChange}
                  required
                ></textarea>
                </div>
                <div>
                <label 
                htmlFor='file'
                 className='text-sm font-medium text-gray-700'
                >Select Image</label>
                 <input
                  type='file'
                  accept='png,jpeg,jpg'
                  name='file'
                  className='block w-full border border-gray-400 rounded-md p-2 mt-1 py-2 px-3 mb-4'
                  onChange={handleChange}
                />
                </div>
                <div className='p-3'>
                <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Add Product</button>
                </div>
            </form>
          </div>
    </section>
    </>
  )
}

