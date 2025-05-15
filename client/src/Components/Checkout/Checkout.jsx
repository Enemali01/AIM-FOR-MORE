import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Stepper from './Stepper';
import axios from 'axios';
import { useAuth } from '../Hook/authContext';
import { toast } from 'react-toastify';

const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';
const Checkout = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
        setCart(res.data.cart);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        toast.error('Failed to load cart');
      }
    };

    if (user?._id) {
      fetchCart();
    }
  }, [user]);

  if (!cart) return <p className="text-center my-10">Loading cart...</p>;

  return (
    <>
      <Navbar />
      <section className='md:w-1/2 mx-auto shadow-xl rounded-2xl pb-6 bg-white'>
        <div className='container horizontal mt-5'>
          <Stepper 
            cartItems={cart.items}
            cartTotal={cart.bill}
          />
        </div>
      </section>
    </>
  );
};

export default Checkout;
