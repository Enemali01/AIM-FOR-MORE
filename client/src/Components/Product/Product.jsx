import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, ProductButtons } from '../../utils/ProductsHelpers'
import axios from 'axios'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const apiUrl = 'http://localhost:5000'

function Product() {

  const [filteredProduct, setFilteredProudcts] = useState([])
  const [products, setProducts] = useState([])
  const [productLoading,setProductLoading] = useState(false)

const onProductDelete = (id) => {
  const data = products.filter(product => product._id !== id)
  setProducts(data)
}

useEffect(() => {     
  const fetchProduct = async () => {
    try {
      setProductLoading(true)
      const response = await axios.get(`${apiUrl}/api/product/all-product`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.message){
        let sno = 1 ;
        const data = await response.data.products.map((product) => ({
          _id:product._id,
          sno: sno++,
          name: product.name,
          price: product.price,
          quantity:product.quantity,
          description:product.description,
          category: product.category,
          file:product.file,
          action: <ProductButtons id={product._id} onProductDelete={onProductDelete}/>,
        }))
        setProducts(data)
        setFilteredProudcts(data)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setProductLoading(false)
    }
  }
    fetchProduct();
  }, [])

const filterProduct = async(e) => {
  const records = products.filter((product) => 
    product.name.toLowerCase().includes(e.target.value.toLowerCase()))
  setFilteredProudcts(records);
}


  return (
    <>
  {productLoading ? <div>Loading</div> : 
      <section>
        <div className='p-6 '>
          <h3 className='text-2xl text-center'>Manage Products</h3>
          <div className='flex justify-between items-center'>
            <input
              type='text'
              placeholder='Search by Product Name' className='px-3 py-2.5'
              onChange={filterProduct}
            />
            <Link to='/dashboard/product/add-products' className='px-4 py-2 bg-teal-500 text-white rounded text-decoration-none'>Add to Product</Link>
          </div>
          <div>
                  <DataTable 
                  columns={columns} 
                  data={filteredProduct}
                  pagination
                  />
                </div>
          </div>
      
      </section>
    }
      {/* <section>
        <div className='relative flex flex-col w-full h-full overflow-scroll bg-white shadow-md rounded-xl'>
        <table className='w-80 text-right table-auto min-w-max py-2 px-2'>
          <thead>
            <tr>
              <th className='px-3 p-3 text-center border-b border-blue-gray-100 bg-blue-gray-50'>SN
              </th>
              <th className='px-3 p-3  text-center border-b border-blue-gray-100 bg-blue-gray-50'>Product Name
              </th>
              <th className='px-3 p-3  text-center border-b border-blue-gray-100 bg-blue-gray-50'>Description
              </th>
              <th className='px-3 p-3 border-b border-blue-gray-100 bg-blue-gray-50'>Product Image
              </th>
              <th className='px-3 p-3 border-b border-blue-gray-100 bg-blue-gray-50'>Star
              </th>
              <th className='px-3 p-3 border-b border-blue-gray-100 bg-blue-gray-50'>Category
              </th>
              <th className='px-3 p-3 justify-center text-center border-b border-blue-gray-100 bg-blue-gray-50'>Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <td className=' text-center border-b border-blue-gray-100 bg-blue-gray-50'>
                     {index + 1} 
                  </td>
                  <td className='text-center border-b'>
                     {product.name}
                  </td>
                  <td className='text-center border-b border-blue-gray-100 bg-blue-gray-50'>
                    {product.description.length > 100 ? `${product.description.substring(0, 10)}....` : product.description}
                  </td>
                  <td className='p-1 justify-center items-center text-center'>
                    <img className='w-10 h-10 mx-auto rounded'
                      src={`${apiUrl}/images/${product.file}`}
                      alt='blopost'
                    />
                  </td>
                  <td className='text-center border-b'>
                     {product.stars}
                  </td>
                  <td className='text-center border-b'>
                     {product.category}
                  </td>
                  <td className='justify-between space-x-2 text-center border-b border-blue-gray-100 bg-blue-gray-50 block flex'>
                    <Link to={`/dashboard/product/edit-product/${product._id}`} className='text-decoration-none '>
                      <span><FaPencilAlt style={{ color: 'green' }} /></span>
                    </Link>

                    <button type='submit' className=' flex items-center block  text-gray ' onClick={() => handleTrash()}><FaTrash style={{ color: 'red' }} /></button>
                  </td>

                </tr>
              ))
            ) : (
              <p className='items-center'>There are no records to display</p>
            )}

          </tbody>
        </table>
        </div>
      </section> */}
    </>
  )
}

export default Product