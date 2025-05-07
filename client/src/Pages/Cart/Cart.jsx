// import React, { useEffect, useState } from 'react';
// import Navbar from '../../Components/Navbar/Navbar'
// import axios from 'axios';
// import { useCart } from 'react-use-cart';
// import { Link } from 'react-router-dom';


// const apiUrl = 'http://localhost:5000';

// const Cart = ({ userId }) => {
//   const { totalUniqueItems, items, updateItemQuantity, cartTotal } = useCart()
//   const [cart, setCart] = useState([]);
//   const [bill, setBill] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/api/cart/getCart/${userId}`);
//         const data = res.data.cart;

//         setCart(data.items);
//         setBill(data.bill);
//       } catch (error) {
//         console.error('Failed to fetch cart:', error);
//       } finally {
//         setLoading(true);
//       }
//     };

//     if (userId) fetchCart();
//   }, [userId]);



 
//   return (
//     <> 
//     <Navbar />
//     <div className='container mx-auto p-5'>
//       <h6 className='text-2xl font-bold mb-4 text-center'>Your Items in Cart: ({totalUniqueItems})</h6>

//       {loading ? (
//         <p>Loading cart...</p>
//       ) : items.length === 0 ? (
//         <p className='text-center'>Your cart is empty. <br/> <br/><Link to='/' className='bg-emerald-700 text-white px-2 py-2 text-decoration-none '>Go to homepage</Link></p>
//       ) : (
//         <div className='grid gap-2'>
//           {items.map((item) => (
//             <div key={item.ItemId} className='border p-4 rounded-md shadow'>
//               <div className='flex items-center justify-between'>
//                 <div className='flex items-center gap-3'>
//                   <img
//                     src={`${apiUrl}/images/${item.file}`}
//                     alt={item.name}
//                     className='w-20 h-20 object-cover rounded-md'
//                   />
//                   <div>
//                     <h4 className='font-semibold'>{item.name}</h4>
//                     <p>₦{item.price} x {item.quantity}</p>
//                     <button
//                  className='rounded-circle px-2  bg-emerald-700 text-white'
//                        onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}
//                     >
//                        <b>-</b></button>
//                        <button className='px-2'><b>{item.quantity}</b></button>
//                        <button
//                         className='rounded-circle px-2 bg-emerald-700 text-white'
//                         onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}

//                       ><b>+</b></button>
//                   </div>
//                 </div>
//                 <p className='text-lg font-bold'>₦{item.price * item.quantity}</p>
//               </div>
//             </div>
//           ))}

//           <div className='justify-between mt-5 flex'>
//           <Link to='/checkout' className='text-center  '>
//             <button className='text-center bg-emerald-700 text-white px-3 py-2 rounded'>CheckOut</button>
//           </Link>
//             <h5 className='text-xl font-bold'>Total: ₦{cartTotal}</h5>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';

const apiUrl = 'http://localhost:5000';

const Cart = ({ userId }) => {
  const { totalUniqueItems, items, updateItemQuantity, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        await axios.get(`${apiUrl}/api/cart/getCart/${userId}`);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Cart ({totalUniqueItems} items)
        </h2>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : items.length === 0 ? (
          <p className="text-center">
            Your cart is empty. <br /><br />
            <Link to="/product" className="bg-emerald-700 text-white px-3 py-2 rounded text-decoration-none">
              Shop Page
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border p-4 rounded shadow-md flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img
                      src={`${apiUrl}/images/${item.file}`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p>₦{item.price} x {item.quantity}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) - 1)}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateItemQuantity(item.id, (item.quantity ?? 0) + 1)}
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
              <p className="mb-2">Total Items: <span className="font-semibold">{totalUniqueItems}</span></p>
              <p className="mb-4">Total Amount: <span className="font-bold text-xl">₦{cartTotal}</span></p>
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
