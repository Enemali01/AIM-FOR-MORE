import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as FaIcons from 'react-icons/fa'

const apiUrl = 'https://aim-for-more-server.onrender.com'

export const columns= [
  {
    name: 'SN',
    selector: (row) => row.sno,
    width:'80px',
  },
  {
    name: 'Prouct Name',
    selector: (row) => row.name,
    // width:'100px',
    sortable: true,
    center:'true',
  },
  {
    name: 'Price',
    selector: (row) => row.price,
    width:'90px',
  },
  {
    name: 'Qty',
    selector: (row) => row.quantity,
    width:'90px',
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    width:'180px',
    center:'true',
  },
  {
    name: 'Category',
    selector: (row) => row.category?.category,
    center:'true',
    sortable: true,
  },
  // {
  //   name: 'Prouct Image',
  //   selector: (row) => row.file,
  //   cell:(row)=> (
  //     <div className='align-items-center d-flex rounded'>
  //       <img src={`https://aim-for-more-server.onrender.com/images/${row.file}`}  style={{width: '38px', height:'38px'}}/>
  //     </div>
  //   ),
  //   center:'true',
  // },
  {
    name: "Prouct Image",
    selector: row => row.file,
    cell: row => (
      <img
        src={row.file}
        alt={row.name}
        className="w-12 h-12 object-cover rounded-md border"
      />
    ),
    sortable: false,
    center: true,
  },
  
  {
    name: 'Action',
    selector: (row) => row.action,
    center: 'true'
    // maxWidth:'100px',
  },
]

export const ProductButtons = ({id, onProductDelete}) =>{
  const navigate = useNavigate()

  const handleDelete = async(id) =>{
    const confirm = window.confirm('Are you sure you want to delete')
    if(confirm){
      try {
        const response =  await axios.delete(`${apiUrl}/api/product/${id}`,
          {
            headers: {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`   
            }
         });
        if(response.data.message){
          toast.success(response.data.message)
          onProductDelete(id)
          window.location.reload()
         }
          
      } catch (error) {
        alert(error)
      }
    }
  }

  return(
    <div className='flex space-x-3'>
      <div>
        <button className='' onClick={()=> navigate(`/dashboard/product/edit-product/${id}`)}>
          <FaIcons.FaPencilAlt style={{color:'gray'}}/></button> 
        </div>
        <button className='' onClick={()=>handleDelete(id)}><FaIcons.FaTrash style={{color:'red'}}/></button>
    </div>
  )
}