
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'


const OrderSummary = () => {
  const { state } = useLocation()
  const { order } = state || {}

  if (!order) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl text-gray-700">No order data found.</h2>
        <Link to="/" className="text-blue-600 underline">Go back home</Link>
      </div>
    )
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-green-600">🎉 Order Placed Successfully!</h1>
      
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <div className="mb-4">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Payment Method:</strong> {order.payment}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Bill:</strong> N{order.bill.toFixed(2)}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Items:</h3>
      <ul className="space-y-2">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between border-b pb-1">
            <span>{item.name} (x{item.quantity})</span>
            <span>N{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <Link to="/" className="block mt-6 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Back to Home
      </Link>
    </div>
    </>
  )
}

export default OrderSummary
