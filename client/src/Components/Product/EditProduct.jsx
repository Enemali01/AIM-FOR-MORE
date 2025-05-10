import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import { toast } from 'react-toastify'



const apiUrl = 'https://aim-for-more-server.onrender.com'
  
function EditProduct() {
  const products = {
    name: '',
    price:'',
    quantity: '',
    description:'',
    // category:'',
    file: '',
  }

const naviagte = useNavigate();
const [error, setError] = useState(false)
const {id} = useParams();
const [product, setProduct] = useState(products)
 
  useEffect(()=>{
        axios.get(`${apiUrl}/api/product/all-product/${id}`,{
          headers: {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
          }
        })
       .then((response)=>{
        setProduct(response.data)
       })
  },[])


const inputHandler = (e) =>{
  const {name, value} = e.target;
  setProduct({...product, [name]: value})
}


const handleEditProduct = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.put(`${apiUrl}/api/product/update/${id}`,products,
      {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`   
        }
      })
      if(response.data.message){
        toast.success('Updated')
        naviagte('/dashboard/product')
      }
      } catch (error) {
       console.log(error)
      }
  
}

  return (
    <>
    {/* {productLoading ? <div>Loading</div> :  */}
      <section>
      <div className='max-w-2xl mx-auto w-lg p-3 bg-white px-3 rounded-md shadow-md w-98'>
        <h3 className='text-2xl font-bold text-center'>Edit Product</h3>
        {error && <Alert variant='danger'>{error}</Alert>}
            <form onSubmit={handleEditProduct} encType='multipart/form-data'>
                <div>
                <label 
                 htmlFor='name'
                 className='text-sm font-medium text-gray-700'
                 >
                  Product Name
                  </label>
                <input 
                  type='text'
                  name='name'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={inputHandler}
                  value={product.name}
                  id='name'
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
                  
                  onChange={inputHandler}
                  value={product.price}
                  id='price'
                />
                </div>
                <div>
                <label 
                htmlFor='quantity'
                className='text-sm font-medium text-gray-700'
                >Quantity</label>
                <input 
                  type='number'
                  
                  name='quantity'
                  min='1'
                  max='100000'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={inputHandler}
                  value={product.quantity}
                  id='quantity'
                />
                </div>
                {/* <div>
                <label 
                htmlFor='Stars'
                className='text-sm font-medium text-gray-700'
                >Stars</label>
                <input 
                  type='number'
                
                  name='stars'
                  className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                  onChange={inputHandler}
                  value={product.category}
                  id='stars'
                />
                </div> */}
                <div>
                <label 
                htmlFor='description'
                className='text-sm font-medium text-gray-700'
                >Description</label>
                <textarea 
                  type='text'
                  
                  name='description'
                  className='mt-1 w-full h-60 p-2 border border-gray-300 rounded-md'
                  row='8'
                  onChange={inputHandler}
                  value={product.description}
                  id='description'
                ></textarea>
                </div>
                <div>
                <label 
                htmlFor='file'
                 className='text-sm font-medium text-gray-700'
                >Select Image</label>
                 {/* <input
                  type='file'
                  accept='png,jpeg,jpg'
                  name='file'
                  className='block w-full border border-gray-400 rounded-md p-2 mt-1 py-2 px-3 mb-4'
                  onChange={inputHandler[0]}
                  
                /> */}
                </div>
                <div className='p-3'>
                <button type='submit' className='w-full bg-emerald-700 py-2 px-2 text-white hover:bg-teal-600'>Edit Product</button>
                </div>
            </form>
          </div>
      </section>
    {/* } */}
    </>
  )
}

export default EditProduct