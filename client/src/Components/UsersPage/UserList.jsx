import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, AdminButtons } from '../../utils/AdminHelpers'
import { toast } from 'react-toastify'
import axios from 'axios'

const apiUrl = 'http://localhost:5000'

function UserList() {
  const [adminUsers, setAdminUsers] = useState([])
  const [adminLoading, setAdminLoading] = useState(false)
  const [filterByLastname,setFilterByLastname ] = useState([])
    

const filterUsers = (e) => {
  const records = adminUsers.filter((user) => 
    user.lastname.toLowerCase().includes(e.target.value.toLowerCase()))
  setFilterByLastname(records)
}

useEffect(()=>{
  const fetchUsers = async () =>{
    setAdminLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/api/admin/all`,{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    
      if(response.data.message){
        let sno = 1;
        const data = await response.data.adminUsers.map((u)=>({
          _id: u._id,
          sno: sno++,
          firstname: u.userId.firstname,
          lastname: u.userId.lastname,
          phone:u.userId.phone,
          gender:u.gender,
          role:u.userId.role,
          email:u.userId.email,
          action: <AdminButtons id={u._id} />
        }))
        setAdminUsers(data);
        setFilterByLastname(data)
      }
    } catch (error) {
      toast.error(error)
    }finally{
      setAdminLoading(false)
    }
  }
  fetchUsers()
},[])



  return (
    <>
      <section>
      <div className='p-6 '>
            <h3 className='text-2xl text-center'>Manager Admin Users</h3>
            <div className='flex justify-between items-center'>
              <input 
              type='text' 
              placeholder='Search by Admin Name' className='px-3 py-2.5'
              onChange={filterUsers}
               />
              <Link to='/dashboard/users-list/add-admin' className='px-4 py-2 bg-teal-500 text-white rounded text-decoration-none'>Create Admin</Link>
            </div>
          </div>
      </section>
      {adminLoading ? <div>Loading..</div> : 
      <section>
          <div>
              <DataTable 
              columns={columns} 
              data={filterByLastname}
              pagination
              />
          </div>
        
      </section>
     }
      </>
  )
}

export default UserList


