import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Hook/authContext'


const apiUrl = 'https://aim-for-more-server.onrender.com'
const Details = () => {
const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
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

// Calculate totals
const totalUniqueItems = cartItems.length;
const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    <section>
        <div className='px-4 container card'>
          <div className=' rounded-md  px-3 py-3'>
            <div className='py-2 px-3'>
            <h2 className="text-2xl font-bold text-center mb-6">
          Your Cart ({totalUniqueItems} items)
        </h2>
              {cartItems.map((item)=>(
                <div key={item.id}>
                  <div >
                    <img
                  src={item.file}
                  className='w-10 object-fit h-10 rounded-3xl hover:scale-110 transition-all item-center justify-center'/>
                  </div>
                  {/* <p>Unit Price: {item.price}</p> */}
                  <p>Quantity : {item.quantity}</p>
                  <p>Toatl Items Price : {item.price}</p>                 
                </div>
              ))}
               <span className='text-2xl'>Grand Total: N{cartTotal}</span>
            </div>
          </div>
        </div>
    </section>
  </>
  )
}

export default Details