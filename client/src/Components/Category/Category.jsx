import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import { toast } from 'react-toastify'

const apiUrl = 'https://aim-for-more-server.onrender.com '

function Category() {
  const {id} = useParams();
  const [category, setCategory] = useState('')


  const getAll = async() =>{
    try {
      const displayCategory = await axios.get(`${apiUrl}/api/category/all`)
      setCategory(displayCategory.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleTrash = (id) =>{
    try {
      const res =  axios.delete(`${apiUrl}/api/category/remove/:id`, +id);
        toast.success('Deleted Successfully')
        window.location.reload();
    } catch (error) {
      toast.error(error.res.data.message)
    }
  }

  useEffect(()=>{
    getAll()
  },[])

  return (
    <>
    <section className='p-4 '>
    <div className='text-center'>
      <h4 className='text-2xl font-bold'>Manage Categories</h4>
    </div>
    <div className='flex justify-between items-center'>
      <input type='text' placeholder='Search by category'  className='px-3 py-2.5'/>
      <Link to='/dashboard/category/add-category' className='px-4 py-2 bg-teal-500 text-white rounded text-decoration-none'>Add to Category</Link>
    </div>
    </section>
    <section>
      <div className='w-full p-4 flex-auto '>
        {/* <h2 className='text-center text-2xl'>Category</h2> */}
        <div className=' text-center flex  w-180 h-full text-teal-700 bg-white shadow-md rounded-xl'>
          <table className='w-full text-left table-auto min-w-max py-2 px-2'>
            <thead>
              <tr>
                <th className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>SN
                </th>
                <th className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>Category
                </th>
                <th className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>Description
                </th>
                <th className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(category) && category.length > 0 ? (
                category.map((item,index) => (
                <tr key={item.id}>
                  <td className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>{index + 1}</td>
                  <td className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>{item.category}</td>
                  <td className='p-2 text-center border-b border-blue-gray-100 bg-blue-gray-50'>{item.description}</td>
                  <td className='p-2 justify-end space-x-7 text-center border-b border-blue-gray-100 bg-blue-gray-50 block flex'>
                    <Link to={'/dashboard/edit-category/' +item._id} className='text-decoration-none'>
                    <button type='submit' className='flex items-center block rounded'><FaIcons.FaPencilAlt style={{color:'gray'}}/></button>
                    </Link>
                                 
                    <button type='submit' className='w-20 flex items-center block  rounded' onClick={()=>handleTrash()}><FaIcons.FaTrash style={{color:'red'}}/></button>
                  </td>
                  </tr>
                ))
                ): (
                <p className='items-center'>No Category Added</p>
              )}
              
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  )
}

export default Category