import React from 'react'
import { useAuth } from '../../Components/Hook/authContext'
useAuth
function Navbar() {
  const {user, logout} = useAuth();
  return (
    <>
    <section className='flex pt-1 items-center justify-between h-12 bg-teal-500 text-white px-5'>
      <p>Welcome {user.lastname}</p>
      <button className='px-4 py-1 bg-teal-800 rounded hover:bg-red-700' onClick={logout}>Logout</button>
    </section>
    </>
  )
}

export default Navbar