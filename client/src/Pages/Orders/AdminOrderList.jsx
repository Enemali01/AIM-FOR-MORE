import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryDates, setDeliveryDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/order/all`);
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, estimatedDelivery) => {
    try {
      const payload = { status: newStatus };
      if (newStatus === 'shipped' && estimatedDelivery) {
        payload.estimatedDelivery = estimatedDelivery;
      }

      await axios.put(`${apiUrl}/api/order/status/${orderId}`, payload);
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  const handleDateChange = (orderId, value) => {
    setDeliveryDates(prev => ({ ...prev, [orderId]: value }));
  };

  const filteredOrders = orders
    .filter(order => {
      const query = searchQuery.toLowerCase();
      const user = order.userId || {};
      return (
        order._id.toLowerCase().includes(query) ||
        user?.lastname?.toLowerCase().includes(query) ||
        user?.email?.toLowerCase().includes(query)
      );
    })
    .filter(order => (filterStatus === 'all' ? true : order.status === filterStatus))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-emerald-800">All Orders</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Name or Email"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/2"
        />

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded w-full sm:w-1/3"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Status & Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order._id} className="border-t">
                  <td className="p-3 border text-sm">
                    <p className="font-medium">{order.userId?.lastname}</p>
                    <p className="text-gray-500">{order.userId?.email}</p>
                    <p className="text-gray-500">{order.userId?.phone}</p>
                    <p className="text-xs text-gray-400 mt-1">Order ID: {order._id}</p>
                  </td>

                  <td className="p-3 border text-sm">
                    <ul className="list-disc pl-4">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="p-3 border font-semibold text-sm">
                    ₦{order.bill.toLocaleString()}
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    {order.status === 'shipped' && order.estimatedDelivery && (
                      <div className="text-xs text-blue-600">
                        ETA: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </div>
                    )}
                  </td>

                  <td className="p-3 border text-sm">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order._id, 'confirmed')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Confirm
                      </button>
                    )}

                    {order.status === 'confirmed' && (
                      <div className="flex flex-col gap-2">
                        <input
                          type="date"
                          value={deliveryDates[order._id] || ''}
                          onChange={(e) => handleDateChange(order._id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => {
                            if (!deliveryDates[order._id]) {
                              toast.warn('Please select a delivery date');
                              return;
                            }
                            updateOrderStatus(order._id, 'shipped', deliveryDates[order._id]);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Mark as Shipped
                        </button>
                      </div>
                    )}

                    {order.status === 'shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order._id, 'completed')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Complete Order
                      </button>
                    )}

                    {order.status === 'completed' && (
                      <span className="text-green-600 font-semibold">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
