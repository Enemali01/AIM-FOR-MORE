import React, { useState } from 'react';
import './stepper.css';
import Account from '../Steps/Account';
import Details from '../Steps/Details';
import Final from '../Steps/Final';
import Payment from '../Steps/Payment';
import axios from 'axios';
import { useAuth } from '../Hook/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const apiUrl = 'https://aim-for-more-server.onrender.com';

const Stepper = ({ cartItems, cartTotal }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const formTitle = ['Account', 'Delivery Address Details', 'Cart Summary'];

  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    payment: '',
  });

  const pageDisplay = () => {
    if (page === 0) return <Account />;
    if (page === 1) return <Details formData={formData} setFormData={setFormData} />;
    if (page === 2) return <Final cartItems={cartItems} cartTotal={cartTotal} />;
    return <Payment />;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('User not logged in');
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!formData.address || !formData.phone || !formData.payment) {
      toast.error('Please fill all delivery details');
      return;
    }

    // Transform items if necessary
    const mappedItems = cartItems.map(item => ({
      ItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      file: item.file || item.image,
    }));

    try {
      const res = await axios.post(`${apiUrl}/api/order`, {
        userId: user._id,
        items: mappedItems,
        bill: cartTotal,
        address: formData.address,
        phone: formData.phone,
        payment: formData.payment,
      });

      if (res.data.success) {
        await axios.post(`${apiUrl}/api/cart/clear-cart`, { userId: user._id });

        navigate('/order-summary', { state: { order: res.data.order } });
      } else {
        toast.error('Order failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Checkout failed. Please try again.');
    }
  };

  return (
    <section>
      <div className='relative py-3'>
        <div className='progressBar mx-auto absolute'>
          <div style={{ width: page === 0 ? '35%' : page === 1 ? '70%' : '100%' }}></div>
        </div>
      </div>

      <div className='form-container'>
        <div className='header relative'>
          <p className='mx-9 px-2'>{formTitle[page]}</p>
        </div>

        <div className='body'>{pageDisplay()}</div>

        <div className='footer'>
          <div className='container flex justify-around mt-4 mb-8'>
            <button
              className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer hover:text-emerald transition-200 ease-in-out'
              disabled={page === 0}
              onClick={() => setPage(prev => prev - 1)}
            >
              Prev
            </button>

            <button
              className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer border-2 border-emerald-700 hover:text-emerald transition-200 ease-in-out'
              onClick={() => {
                if (page === formTitle.length - 1) {
                  handleSubmit();
                } else {
                  setPage(prev => prev + 1);
                }
              }}
            >
              {page === formTitle.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stepper;
