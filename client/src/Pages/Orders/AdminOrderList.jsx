import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = 'https://aim-for-more.vercel.app/'

const AdminOrderList = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/order/all`)
      setOrders(res.data.orders)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId) => {
    try {
      await axios.put(`${apiUrl}/api/order/status/${orderId}`, {
        status: 'completed',
      })
      toast.success('Order marked as completed!')
      fetchOrders()
    } catch (err) {
      toast.error('Failed to update order')
    }
  }

  if (loading) return <div className="text-center py-10">Loading orders...</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders List</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">User ID</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3 border">
                    <p className="font-semibold">{order.userId?.lastname}</p>
                    <p className="text-sm text-gray-500">{order.userId?.email}</p>
                    <p className="text-sm text-gray-500">{order.userId?.phone}</p>
                  </td>

                  <td className="p-3 border">
                    <ul className="list-disc pl-4">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 border font-semibold">₦{order.bill.toLocaleString()}</td>
                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border">
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => updateOrderStatus(order._id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Confirm
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">Confirmed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminOrderList
