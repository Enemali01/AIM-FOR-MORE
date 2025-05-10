// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useAuth } from '../../Components/Hook/authContext';
// import Navbar from '../../Components/Navbar/Navbar';
// import Footer from '../../Components/Footer/Footer';



// const apiUrl = 'https://aim-for-more-server.onrender.com '

// const UserOrders = () => {
//   const { user } = useAuth(); // Fetch user data from the auth context
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (user && user._id) {
//           // Ensure the correct userId is being passed
//           const response = await axios.get(`${apiUrl}/api/order/completed/${user._id}`);
//           setOrders(response.data.orders);
//           setLoading(false);
//         } else {
//           throw new Error("User is not authenticated");
//         }
//       } catch (err) {
//         setError("Orders are pending verification, check back in few mins");
//         setLoading(false);
//       }
//     };
  
//     fetchOrders();
//   }, [user]);
  
//   const totalSpent = orders.reduce((acc, order) => acc + (order.bill || 0), 0)

//   if (loading) return <div className="text-center mt-8 text-lg text-gray-500">Loading orders...</div>
//   if (error) return <div className="text-center mt-8 text-red-500">{error}</div>
//   if (orders.length === 0) return <div className="text-center mt-8 text-gray-600">You have no completed orders yet.</div>

//   return (
//     <>
//     <Navbar/>
//     <section>
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6 text-emerald-700">Completed Orders</h2>
//       <div className="grid gap-6">
//         {orders.map((order) => (
//           <div key={order._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-md transition-all">
//             <div className="mb-2 text-sm text-gray-500">Order ID: <span className="text-gray-800 font-medium">{order._id}</span></div>
//             <div className="text-sm text-gray-500 mb-1">Status: <span className="text-green-600 font-semibold capitalize">{order.status}</span></div>
//             <div className="text-sm text-gray-500 mb-1">Total Items: <span className="text-gray-800">{order.items.length}</span></div>
//             <div className="text-sm text-gray-500 mb-1">Total Bill: <span className="text-gray-800 font-medium">₦{order.bill?.toLocaleString()}</span></div>
//             <div className="text-sm text-gray-500 mb-1">Date: <span className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span></div>

//             <details className="mt-4">
//               <summary className="text-emerald-600 font-medium cursor-pointer">View Items</summary>
//               <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
//                 {order.items.map((item, idx) => (
//                   <li key={idx}>
//                     {item.name} - Qty: {item.quantity} - ₦{item.itemTotal?.toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             </details>
//           </div>
//         ))}
//       </div>

//       {/* Total Summary Section */}
//       <div className="mt-10 border-t pt-6 text-right">
//         <p className="text-lg font-semibold text-gray-700">
//           Total Spent: <span className="text-emerald-700 font-bold">₦{totalSpent.toLocaleString()}</span>
//         </p>
//       </div>
//     </div>
//     </section>
//     <Footer/>
//     </>


//   )
// }

// export default UserOrders;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Components/Hook/authContext';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const apiUrl = 'https://aim-for-more-server.onrender.com ';

const UserOrders = () => {
  const { user } = useAuth(); // Fetch user data from the auth context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user._id) {
          // Ensure the correct userId is being passed
          const response = await axios.get(`${apiUrl}/api/order/completed/${user._id}`);
          setOrders(response.data.orders);
          setLoading(false);
        } else {
          throw new Error("User is not authenticated");
        }
      } catch (err) {
        setError("Orders are pending verification, check back in few mins");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="text-center mt-8 text-lg text-gray-500">Loading orders...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (orders.length === 0) return <div className="text-center mt-8 text-gray-600">You have no completed orders yet.</div>;

  return (
    <>
      <Navbar />
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

                <details className="mt-4">
                  <summary className="text-emerald-600 font-medium cursor-pointer">View Items</summary>
                  <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} - Qty: {item.quantity} - ₦{item.itemTotal?.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserOrders;
