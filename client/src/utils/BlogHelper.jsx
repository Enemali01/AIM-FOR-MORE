import axios from 'axios'
import * as FaIcon from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const apiUrl = 'https://aim-for-more.vercel.app/'
export const colums = [
    {
      name: 'SN',
      selector: (row) => row.sno,
      width:'80px',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      // width:'100px',
      sortable: true,
      center:'true',
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      width:'180px',
      center:'true',
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      center:'true',
      sortable: true,
    },
    {
      name: 'Prouct Image',
      selector: (row) => row.file,
      cell:(row)=> (
        <div className='align-items-center d-flex rounded'>
          <img src={`https://aim-for-more.vercel.app//images/${row.file}`}  style={{width: '38px', height:'38px'}}/>
        </div>
      ),
      center:'true',
    },
    {
      name: 'Action',
      selector: (row) => row.action,
      center: 'true'
      // maxWidth:'100px',
    },
]

export const BlogButton=({id, postDelete})=> {
  const navigate = useNavigate();

  const handleDelete = async(id) =>{
    const confirm = window.confirm('Are you sure you want to delete')
    if(confirm){
      try {
        const response =  await axios.delete(`${apiUrl}/api/blog/${id}`,
          {
            headers: {
              'Authorization' : `Bearer ${localStorage.getItem('token')}`   
            }
         });
        if(response.data.message){
          toast.success(response.data.message)
          postDelete(id)
          window.location.reload()
         }
          
      } catch (error) {
        alert(error)
      }
    }
  }
  return (
   <div className='flex space-x-3'>
         <div>
           <button className='' onClick={()=> navigate(`/dashboard/post/${id}`)}>
             <FaIcon.FaPencilAlt style={{color:'gray'}}/></button> 
           </div>
           <button className='' onClick={()=>handleDelete(id)}><FaIcon.FaTrash style={{color:'red'}}/></button>
       </div>
  )
}