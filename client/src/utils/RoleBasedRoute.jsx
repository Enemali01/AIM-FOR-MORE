
// import React from 'react'
// import { useAuth } from '../Components/Hook/authContext'
// import { Navigate } from 'react-router-dom'


// const RoleBasedRoute = ({children, requiredRole}) =>{
//    const {user, loading} = useAuth()
//     if(loading){
//       return <div>Loading..</div>
//     }
//     if(!requiredRole.includes(user.role)){
//       <Navigate to="/login" />
//     }
//     return user ? children : <Navigate to="/login" />
//   }

// export default RoleBasedRoute


import React from 'react'
import { useAuth } from '../Components/Hook/authContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" replace />
  }

  if (!requiredRole.includes(user.role)) {
    // User doesn't have the required role
    return <Navigate to="/unauthorized" replace />
  }

  // User is authorized
  return children
}

export default RoleBasedRoute
