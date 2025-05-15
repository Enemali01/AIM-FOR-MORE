<<<<<<< HEAD
=======

>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Components/Hook/authContext';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${apiUrl}/api/order/${user._id}`);
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

<<<<<<< HEAD
  return (
    <>
      <Navbar />
      {loading ? (
        <div className="text-center mt-8 mx-auto text-lg text-gray-500">Loading orders...</div>
      ) : (
        <section>
          <div className="max-w-5xl mx-auto p-6 mb-30">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">Your Orders</h2>
=======
  // if (loading) return <div className="text-center mt-8 text-lg text-gray-500">Loading orders...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (orders.length === 0) return <div className="text-center mt-8 text-gray-600">You have no completed orders yet.</div>;

  return (
    <>
      <Navbar />
      {loading ? <div className="text-center mt-8 mx-auto text-lg text-gray-500">Loading orders...</div> : 
      <section>
        <div className="max-w-5xl mx-auto p-6 mb-30">
          <h2 className="text-2xl font-bold mb-6 text-emerald-700">Completed Orders</h2>
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-all">
                <div className="mb-2 text-sm text-gray-500">Order ID: <span className="text-gray-800 font-medium">{order._id}</span></div>
                <div className="text-sm text-gray-500 mb-1">Status: <span className="text-green-600 font-semibold capitalize">{order.status}</span></div>
                <div className="text-sm text-gray-500 mb-1">Total Items: <span className="text-gray-800">{order.items.length}</span></div>
                <div className="text-sm text-gray-500 mb-1">Total Bill: <span className="text-gray-800 font-medium">₦{order.bill?.toLocaleString()}</span></div>
                <div className="text-sm text-gray-500 mb-1">Date: <span className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span></div>
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e

            {['pending', 'confirmed', 'shipped', 'completed'].map((status) => (
              <div key={status}>
                <h3 className="text-xl font-semibold mt-6 mb-2 capitalize text-gray-800">{status} Orders</h3>
                {orders.filter(o => o.status === status).length === 0 ? (
                  <p className="text-sm text-gray-500">No {status} orders.</p>
                ) : (
                  orders
                    .filter(order => order.status === status)
                    .map(order => (
                      <div key={order._id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-all">
                        <p className="text-sm mb-1">Order ID: <span className="font-medium">{order._id}</span></p>
                        <p className="text-sm mb-1">Status: <span className="capitalize text-emerald-600 font-medium">{order.status}</span></p>
                        <p className="text-sm mb-1">Total Bill: <span className="font-medium">₦{order.bill.toLocaleString()}</span></p>
                        <p className="text-sm mb-1">Order Date: <span>{new Date(order.createdAt).toLocaleDateString()}</span></p>

                        {order.status === 'shipped' && order.estimatedDelivery && (
                          <p className="text-sm mb-1">Estimated Delivery: <span className="text-blue-600">{new Date(order.estimatedDelivery).toLocaleDateString()}</span></p>
                        )}

                        <details className="mt-3 text-sm">
                          <summary className="text-emerald-700 font-medium cursor-pointer">View Items</summary>
                          <ul className="list-disc pl-6 mt-2 text-gray-700">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} – Qty: {item.quantity} – ₦{item.price?.toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </details>
                      </div>
                    ))
                )}
              </div>
            ))}
          </div>
<<<<<<< HEAD
        </section>
      )}
=======
        </div>
      </section>
       }
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
      <Footer />
    </>
  );
};

export default UserOrders;
