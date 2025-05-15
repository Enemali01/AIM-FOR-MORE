import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './Components/Hook/authContext';
import { useCart } from 'react-use-cart';
import axios from 'axios';

<<<<<<< HEAD
const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';
=======
const apiUrl = 'https://aim-for-more-server.onrender.com ';
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e

// function App() {
//   const { user } = useAuth();
//   const { items, addItem, emptyCart } = useCart();
//   const [isCartInitialized, setIsCartInitialized] = useState(false); 
//   const prevUserId = useRef(null);

//   // ✅ Restore cart on login
//   useEffect(() => {
//     const syncCartOnLogin = async () => {
//       if (user?._id && user._id !== prevUserId.current) {
//         try {
//           const res = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
//           const savedCartItems = res.data.cart?.items || [];

//           emptyCart(); // Clear react-use-cart state first
//           savedCartItems.forEach(item => {
//             addItem({
//               id: item.id || item.ItemId,
//               _id: item.ItemId,
//               name: item.name,
//               price: item.price,
//               file: item.file,
//             }, item.quantity);
//           });

//           prevUserId.current = user._id;
//           setIsCartInitialized(true); // ✅ Ensure sync-to-DB only runs after this
//         } catch (err) {
//           console.error('Failed to sync cart on login:', err);
//         }
//       } else if (!user?._id) {
//         emptyCart();
//         localStorage.removeItem('custom-cart');
//         setIsCartInitialized(false);
//       }
//     };

//     syncCartOnLogin();
//   }, [user]);

//   // ✅ Sync local cart changes to DB — only if cart was initialized first
//   useEffect(() => {
//     const syncCartToDB = async () => {
//       if (!user?._id || !isCartInitialized) return;

//       const cartItems = items.map(item => ({
//         ItemId: item._id,
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         file: item.file,
//       }));

//       try {
//         if (items.length === 0) {
//           await axios.post(`${apiUrl}/api/cart/clear-cart`, { userId: user._id });
//         } else {
//           await axios.post(`${apiUrl}/api/cart/add-to-cart`, {
//             userId: user._id,
//             cartItems,
//           });
//         }
//       } catch (err) {
//         console.error('Cart sync failed:', err);
//       }
//     };

//     syncCartToDB();
//   }, [items, user, isCartInitialized]);

//   return (
//     <>
//       <AppRoutes />
    

//     </>
//   );
// }
function App() {
  // const { user } = useAuth();
  // const { items, addItem, emptyCart } = useCart();
  // const [isCartInitialized, setIsCartInitialized] = useState(false); 
  // const prevUserId = useRef(null);

<<<<<<< HEAD

  // useEffect(() => {
  //   const syncCartOnLogin = async () => {
  //     if (user?._id && user._id !== prevUserId.current) {
  //       try {
  //         const res = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
  //         const savedCartItems = res.data.cart?.items || [];

  //         emptyCart(); // Clear react-use-cart state first
  //         savedCartItems.forEach(item => {
  //           addItem({
  //             id: item.id || item.ItemId,
  //             _id: item.ItemId,
  //             name: item.name,
  //             price: item.price,
  //             file: item.file,
  //           }, item.quantity);
  //         });
         
  //         prevUserId.current = user._id;
  //         setIsCartInitialized(true); // Ensure sync-to-DB only runs after this
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else if (!user?._id) {
  //       emptyCart();
  //       localStorage.removeItem('custom-cart');
  //       setIsCartInitialized(false);
  //     }
  //   };
=======
  //Restore cart on login
  useEffect(() => {
    const syncCartOnLogin = async () => {
      if (user?._id && user._id !== prevUserId.current) {
        try {
          const res = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
          const savedCartItems = res.data.cart?.items || [];

          emptyCart(); // Clear react-use-cart state first
          
          // Re-populate react-use-cart
          for (const item of savedCartItems) {
            addItem({
              id: item.id || item.ItemId,
              _id: item.ItemId,
              name: item.name,
              price: item.price,
              file: item.file,
            }, item.quantity);
          }

          prevUserId.current = user._id;
          setIsCartInitialized(true); // Now syncing to DB is safe
        } catch (err) {
          console.error('Failed to sync cart on login:', err);
        }
      } else if (!user?._id) {
        emptyCart(); // Logged out: clear cart
        setIsCartInitialized(false);
        prevUserId.current = null;
      }
    };
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e

  //   syncCartOnLogin();
  // }, [user]);

<<<<<<< HEAD
  // ✅ Sync local cart changes to DB — only if cart was initialized first
  // useEffect(() => {
  //   const syncCartToDB = async () => {
  //     if (!user?._id || !isCartInitialized) return;
=======
  // Sync cart changes to DB — only if initialized from backend
  useEffect(() => {
    const syncCartToDB = async () => {
      if (!user?._id || !isCartInitialized) return;
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e

  //     const cartItems = items.map(item => ({
  //       ItemId: item._id,
  //       id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //       file: item.file,
  //     }));

  //     try {
  //       if (items.length === 0) {
  //         await axios.post(`${apiUrl}/api/cart/clear-cart`, { userId: user._id });
  //       } else {
  //         await axios.post(`${apiUrl}/api/cart/add-to-cart`, {
  //           userId: user._id,
  //           cartItems,
  //         });
  //       }
  //     } catch (err) {
  //       console.error('Cart sync failed:', err);
  //     }
  //   };

  //   syncCartToDB();
  // }, [items, user, isCartInitialized]);


  if (user && !isCartInitialized) return <p className="text-center p-10">Loading your cart...</p>;

  return (
    <>
      <AppRoutes />
    </>
  );
}


export default App;
