import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, ProductButtons } from '../../utils/ProductsHelpers'
import axios from 'axios'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'

const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com'

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
    
    </>
  )
}

export default Product