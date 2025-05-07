import { useNavigate } from "react-router-dom"
import * as FaIcons from 'react-icons/fa'


export const columns = [
  {
    name:'SN',
    selector: (row) => row.sno,
    maxWidth:'5px',
  },
  {
    name:'Lastname',
    selector: (row) => row.lastname,
    maxWidth:'5px',
    sortable: true,
  },
  {
    name:'Firstname',
    selector: (row) => row.firstname,
    center:'true',
    maxWidth:'10px',

  },
  {
    name:'Phone',
    selector: (row) => row.phone,
    center:'true',
    maxWidth:'10px',
  },
  {
    name:'Gender',
    selector: (row) => row.gender,
    maxWidth:'10px',
    center:'true'
  },
  {
    name:'Role',
    selector: (row) => row.role,
    maxWidth:'5px',

  },
  {
    name:'Email',
    selector: (row) => row.email,
    center: 'true'
  },
  {
    name: 'Action',
    selector: (row) => row.action,
    center: 'true'
     },
]


export const AdminButtons = ({id, onAdminDelete}) =>{
const navigate = useNavigate()
const handleDelete = async(id) =>{
  const confirm = window.confirm('Are you sure you want to delete')
  if(confirm){
    try {
      const response =  await axios.delete(`${apiUrl}/api/product/:id`,+id,
        // {
        //   headers: {
        //     'Authorization' : `Bearer ${localStorage.getItem('token')}`   
        //   }
        // }
        );
      
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
  <div className='flex space-x-2'>
    <div>
      <button className='px-1 py-1 rounded  text-sky' onClick={()=> navigate(`/dashboard/admin/view/${id}`)}>
        <FaIcons.FaEye style={{fontSize:'15px'}}/></button> 
        </div> 
        <div>
      <button className='px-1 py-1 rounded text-gray'><FaIcons.FaPencilAlt style={{fontSize:'15px'}}/></button>
      </div>
      <button className='px-1 py-1 rounded  text-danger' onClick={()=>handleDelete(id)}><FaIcons.FaTrashAlt style={{fontSize:'15px'}}/></button>
  </div>
)
}
