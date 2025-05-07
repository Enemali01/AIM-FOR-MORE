
import { useState } from 'react'



export const getColumns = 
(handleViewMessage, viewedMessages) =>[
    {
      name: 'Firstname',
      selector: (row) => row.userId.firstname,
      center:'true',
      width:'140px',
    },
    {
      name: 'Email',
      selector: (row) => row.userId && typeof row.userId === 'object' ? row.userId.email : 'N/A',
      width:'200px',
      center:'true',
    },
    {
      name: 'phone',
      selector: (row) => row.userId && typeof row.userId === 'object' ? row.userId.phone : 'N/A',
      width:'150px',
      center:'true',
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      center:'true',
       width:'150px',
      sortable: true,
    },    
    {
      name: 'Action',
      cell: row => (
        <button
          className={`px-2 py-1 rounded ${
            viewedMessages.includes(row._id)
              ? 'bg-teal-500 text-white'
              : 'bg-gray-600 text-white'
          }`}
          onClick={() => handleViewMessage(row)}
        >
          {viewedMessages.includes(row._id) ? 'Viewed' : 'View'}
        </button>
      )
    }
    
]

// export const MessgaeButton=({id, contactDelete})=> {
//   const navigate = useNavigate();

//   const handleDelete = async(id) =>{
//     const confirm = window.confirm('Are you sure you want to delete')
//     // if(confirm){
//     //   try {
//     //     const response =  await axios.delete(`${apiUrl}/api/blog/${id}`,
//     //       {
//     //         headers: {
//     //           'Authorization' : `Bearer ${localStorage.getItem('token')}`   
//     //         }
//     //      });
//     //     if(response.data.message){
//     //       toast.success(response.data.message)
//     //       postDelete(id)
//     //       window.location.reload()
//     //      }
          
//     //   } catch (error) {
//     //     alert(error)
//     //   }
//     // }
//   }
//   return (
//    <div className='flex space-x-3'>
//          <div>
//            {/* <button className='' onClick={()=> navigate(`/dashboard/post/${id}`)}>
//              <FaIcon.FaPencilAlt style={{color:'gray'}}/></button>  */}
//            </div>
//            <button className='' onClick={()=>handleDelete(id)}><FaIcon.FaTrash style={{color:'red'}}/></button>
//        </div>
//   )
// }