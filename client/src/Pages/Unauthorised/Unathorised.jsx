import React from 'react'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">🚫 403 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-200 text-decoration-none"
        >
          ← Go back to Home
        </Link>
      </div>
    </div>
  )
}

export default Unauthorized
