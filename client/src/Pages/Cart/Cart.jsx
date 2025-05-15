// import React, { useEffect, useState } from 'react';
// import Navbar from '../../Components/Navbar/Navbar';
// import axios from 'axios';
// import { useCart } from 'react-use-cart';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Components/Hook/authContext';

// const apiUrl = 'https://aim-for-more-server.onrender.com';

<<<<<<< HEAD
// const Cart = () => {
//   const [userId, setUserId] = useState(null);
//   const {user} = useAuth()
=======
// const apiUrl = 'https://aim-for-more-server.onrender.com ';

// const Cart = ({ userId }) => {
//   const { totalUniqueItems, items, updateItemQuantity, cartTotal } = useCart()
//   const [cart, setCart] = useState([]);
//   const [bill, setBill] = useState(0);
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
//   const [loading, setLoading] = useState(false);

//   const {
//     items,
//     totalUniqueItems,
//     cartTotal,
//     updateItemQuantity,
//     emptyCart,
//     addItem,
//   } = useCart();


// useEffect(() => {
//   const fetchCart = async () => {
//     if (!userId) {
//       console.warn('Invalid or missing userId:', userId);
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.get(`${apiUrl}/api/cart/cart/${userId}`);
//     } catch (error) {
//       console.error('Failed to fetch cart:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCart();
// }, [userId]);


// useEffect(() => {
//   const fetchCart = async () => {
//     if (!user?._id) return;

//     setLoading(true);
//     try {
//       const response = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
//       const storedItems = response.data.items; // adjust based on your backend format

//       if (Array.isArray(storedItems)) {
//         emptyCart(); // Clear before restoring to avoid duplication
//         storedItems.forEach(item => {
//           addItem({
//             id: item.productId, // or your backend’s unique identifier
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity,
//             file: item.file,
//           });
//         });
//       }
//     } catch (error) {
//       console.error('Failed to load cart from backend:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCart();
// }, [user]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!user?._id || items.length > 0) return; 

//       setLoading(true);
//       try {
//         const response = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
//         const storedItems = response.data.items;

//         if (Array.isArray(storedItems) && storedItems.length > 0) {
//           emptyCart(); // clear localStorage cart before restoring
//           storedItems.forEach(item => {
//             addItem({
//               id: item.productId,
//               name: item.name,
//               price: item.price,
//               quantity: item.quantity,
//               file: item.file,
//             });
//           });
//         }
//       } catch (error) {
//         console.error('Failed to load cart from backend:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [user]);


//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-5 mt-10">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Your Cart ({totalUniqueItems} items)
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading cart...</p>
//         ) : items.length === 0 ? (
//           <p className="text-center">
//             Your cart is empty. <br /><br />
//             <Link to="/product" className="bg-emerald-700 text-white px-3 py-2 rounded">
//               Shop Page
//             </Link>
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Cart Items */}
//             <div className="lg:col-span-2 space-y-4">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border p-4 rounded shadow-md flex justify-between items-center"
//                 >
//                   <div className="flex gap-4 items-center">
//                     <img
//                       src={item.file}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{item.name}</h4>
//                       <p>₦{item.price} x {item.quantity}</p>
//                       <div className="flex gap-2 mt-2">
//                         <button
//                           className="bg-emerald-700 text-white px-2 rounded"
//                           onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}
//                         >
//                           -
//                         </button>
//                         <span className="px-2">{item.quantity}</span>
//                         <button
//                           className="bg-emerald-700 text-white px-2 rounded"
//                           onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-lg font-bold">₦{item.price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Summary */}
//             <div className="border p-4 rounded shadow-md h-fit">
//               <h3 className="text-xl font-bold mb-4">Summary</h3>
//               <p className="mb-2">
//                 Total Items: <span className="font-semibold">{totalUniqueItems}</span>
//               </p>
//               <p className="mb-4">
//                 Total Amount: <span className="font-bold text-xl">₦{cartTotal}</span>
//               </p>
//               <Link to="/checkout">
//                 <button className="w-full bg-emerald-700 text-white px-4 py-2 rounded">
//                   Proceed to Checkout
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from '../../Components/Navbar/Navbar';
// import axios from 'axios';
// import { useCart } from 'react-use-cart';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../Components/Hook/authContext';

// const apiUrl = 'https://aim-for-more-server.onrender.com';

// const Cart = () => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const {
//     items,
//     totalUniqueItems,
//     cartTotal,
//     updateItemQuantity,
//     emptyCart,
//     addItem,
//   } = useCart();

//   const cartInitialized = useRef(false);
//   const hasSyncedWithBackend = useRef(false);

//   useEffect(() => {
//     if (!user?._id) return;

//     // Delay sync until cart is hydrated from localStorage
//     const syncCart = async () => {
//       if (hasSyncedWithBackend.current || items.length === 0) return;

//       setLoading(true);
//       try {
//         const response = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
//         const storedItems = response.data.items;

//         // Optional: compare items in backend vs local cart if needed
//         if (Array.isArray(storedItems)) {
//           await emptyCart();
//           storedItems.forEach(item => {
//             addItem({
//               id: item.productId,
//               name: item.name,
//               price: item.price,
//               quantity: item.quantity,
//               file: item.file,
//             });
//           });
//         }

//         hasSyncedWithBackend.current = true;
//       } catch (error) {
//         console.error('Failed to sync cart:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timeout = setTimeout(syncCart, 500); // short delay to allow hydration

//     return () => clearTimeout(timeout);
//   }, [user, items]);

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-5 mt-10">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Your Cart ({totalUniqueItems} items)
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading cart...</p>
//         ) : items.length === 0 ? (
//           <p className="text-center">
//             Your cart is empty. <br /><br />
//             <Link to="/product" className="bg-emerald-700 text-white px-3 py-2 rounded">
//               Shop Page
//             </Link>
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-4">
//               {items.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border p-4 rounded shadow-md flex justify-between items-center"
//                 >
//                   <div className="flex gap-4 items-center">
//                     <img
//                       src={item.file}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{item.name}</h4>
//                       <p>₦{item.price} x {item.quantity}</p>
//                       <div className="flex gap-2 mt-2">
//                         <button
//                           className="bg-emerald-700 text-white px-2 rounded"
//                           onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}
//                         >
//                           -
//                         </button>
//                         <span className="px-2">{item.quantity}</span>
//                         <button
//                           className="bg-emerald-700 text-white px-2 rounded"
//                           onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <p className="text-lg font-bold">₦{item.price * item.quantity}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="border p-4 rounded shadow-md h-fit">
//               <h3 className="text-xl font-bold mb-4">Summary</h3>
//               <p className="mb-2">
//                 Total Items: <span className="font-semibold">{totalUniqueItems}</span>
//               </p>
//               <p className="mb-4">
//                 Total Amount: <span className="font-bold text-xl">₦{cartTotal}</span>
//               </p>
//               <Link to="/checkout">
//                 <button className="w-full bg-emerald-700 text-white px-4 py-2 rounded">
//                   Proceed to Checkout
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/Hook/authContext';

const apiUrl = 'https://aim-for-more-server.onrender.com';

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  useEffect(() => {
    if (!user?._id) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
        console.log("Fetched cart:", response.data);

        const items = response.data.items || response.data.cart?.items || [];
        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user?._id]);


  // const updateQuantity = async (productId, newQuantity) => {
  //   if (typeof newQuantity !== 'number' || newQuantity <= 0) {
  //     console.error('Invalid quantity:', newQuantity);
  //     return;
  //   }

  //   try {
  //     // Optimistically update the UI before sending the request
  //     const updated = cartItems.map(item =>
  //       item.ItemId === productId ? { ...item, quantity: newQuantity } : item  // Update to ItemId
  //     );
  //     setCartItems(updated);

  //     // Prepare the payload to send to the backend
  //     const payload = {
  //       userId: user._id,
  //       productId: productId, // Ensure productId is correctly passed
  //       quantity: newQuantity,
  //     };

  //     // Send the request to update the cart item quantity
  //     await axios.put(`${apiUrl}/api/cart/update`, payload);
  //   } catch (err) {
  //     console.error('Error updating cart item:', err.message || 'Unknown error');
  //     if (err.response) {
  //       console.error(err.response.data);
  //     }
  //   }
  // };




  // Remove item from cart
 
  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        // Remove item from UI
        const updated = cartItems.filter(item => item.ItemId !== productId);
        setCartItems(updated);
  
        // Send delete request to backend
        await axios.delete(`${apiUrl}/api/cart/remove`, {
          data: { userId: user._id, productId }
        });
      } else {
        // Optimistically update the UI
        const updated = cartItems.map(item =>
          item.ItemId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updated);
  
        // Send the request to update quantity
        await axios.put(`${apiUrl}/api/cart/update`, {
          userId: user._id,
          productId,
          quantity: newQuantity,
        });
      }
  
      // Notify the navbar to refresh count
      window.dispatchEvent(new Event('cartUpdated'));
  
    } catch (err) {
      console.error('Error updating/removing cart item:', err.response?.data || err.message);
    }
  };
  
 
  // const removeItem = async (productId) => {
  //   try {
  //     const filtered = cartItems.filter(item => item.productId !== productId);
  //     setCartItems(filtered);

  //     await axios.delete(`${apiUrl}/api/cart/remove`, {
  //       data: { userId: user._id, productId }
  //     });
  //   } catch (err) {
  //     console.error("Error removing item:", err);
  //   }
  // };

  // Calculate totals
  const totalUniqueItems = cartItems.length;
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Cart ({totalUniqueItems} items)
        </h2>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">
            Your cart is empty. <br /><br />
            <Link to="/product" className="bg-emerald-700 text-white px-3 py-2 rounded">
              Shop Page
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.ItemId} // Ensure using the correct field for unique key
                  className="border p-4 rounded shadow-md flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.file}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p>₦{item.price} x {item.quantity}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateQuantity(item.ItemId, item.quantity - 1)} // Pass ItemId here
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateQuantity(item.ItemId, item.quantity + 1)} // Pass ItemId here
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold">₦{item.price * item.quantity}</p>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="border p-4 rounded shadow-md h-fit">
              <h3 className="text-xl font-bold mb-4">Summary</h3>
              <p className="mb-2">
                Total Items: <span className="font-semibold">{totalUniqueItems}</span>
              </p>
              <p className="mb-4">
                Total Amount: <span className="font-bold text-xl">₦{cartTotal}</span>
              </p>
              <Link to="/checkout">
                <button className="w-full bg-emerald-700 text-white px-4 py-2 rounded">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
