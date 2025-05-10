import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useCart } from 'react-use-cart'

const apiUrl = 'https://aim-for-more.vercel.app'

function ViewProduct() {
  const {addItem, updateItemQuantity, items} = useCart()

  const {id} = useParams()
  const [productId, setProductId] = useState([])

  useEffect(()=>{
         axios.get(`${apiUrl}/api/product/${id}`)
        .then((response)=>{
          setProductId(response.data)
        }).catch((err)=>{console.log(err)})
       
  },[])


  return (
    <>
    <Navbar/>
    {productId ? (
    <section>
      <div className='shadow-md max-w-2xl mx-auto mt-10 bg-white rounded px-6 py-3 mb-5'>
        <h3 className='text-center px-1 py-3 text-success'>Product Details</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <div>
          <img 
          src={`${apiUrl}/images/${productId.file}`}  
          alt='productImage'
          className='rounded border w-full'
          />
          </div>
          <div> 
          <div className='flex space-x-3'>
            <p className='text-sm font-bold'>Name</p>
            <p className='font-medium bg-gray-500 text-white py-1 px-3 rounded'>{productId.name}</p>
          </div>
          <div className='flex space-x-3'>
            <p className='text-sm font-bold'>Price:</p>
            <p className='font-medium bg-emerald-700 text-white py-1 px-3 rounded'>N {productId.price}.00</p>
          </div>
          <div className='flex gap-2 justify-center items-center mb-5'>
  
          {/* <button 
          onClick={() => updateItemQuantity(productId.id, (productId.quantity ?? 0) - 1)}
          className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>-</button>
          <span className='h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{productId.quantity}</span>
          
          <button
            onClick={() => updateItemQuantity(productId.id, (productId.quantity ?? 0) + 1)}
            className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>+</button> */}
          </div>
          
          <button 
           onClick={() => addItem(productId)}
          
          className='bg-emerald-700 px-3 py-2 w-full rounded mb-3 text-white'>Add to Cart</button>
          </div>
          </div>
          <div className='space-x-3'>
            <p className='text-lg font-bold'>Description</p>
            <p className='font-medium'>{productId.description}</p>
            
  
        </div>
      </div>
    </section>
    ): <div>Loading..</div>}
 
    </>
  )
}

export default ViewProduct