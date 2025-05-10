import React, { useState } from 'react'
import './stepper.css'
import Account from '../Steps/Account'
import Details from '../Steps/Details'
import Final from '../Steps/Final'
import Payment from '../Steps/Payment'
import axios from 'axios'
import { useAuth } from '../Hook/authContext'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { toast } from 'react-toastify'



const apiUrl = 'https://aim-for-more-server.onrender.com'

const Stepper = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const {user} = useAuth()
  const { items, cartTotal, isEmpty, emptyCart } = useCart()

  const formTitle = ['Account', 'Delivery Address Details', 'Cart Summary']
  const [formData, setFormData] = useState({
    address:'',
    phone:'',
    payment:'',
  })

  const pageDisplay = () =>{
    if(page === 0){
      return <Account/>
    }else if (page === 1){
      return <Details formData={formData} setFormData={setFormData}/>
    }else if (page === 2){
      return <Final/>
    }else{
      return <Payment/>
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/order/`, {
        userId: user?._id,
        items,
        bill: cartTotal,
        address: formData.address,
        phone: formData.phone,
        payment: formData.payment,
      });
  
      if (res.data.success) {
        await axios.post(`${apiUrl}/api/cart/clear-cart`, { userId: user._id });
      
        emptyCart(); // Clear from react-use-cart
        localStorage.removeItem('guestCart'); // Just in case
        localStorage.removeItem('custom-cart'); // Clear the custom react-use-cart key
      
        navigate('/order-summary', { state: { order: res.data.order } });
      }
    } catch (error) {
      toast.error('Checkout failed');
    }
  };
  

  


  return (
    <>
    
      <section>
        <div className='relative py-3'>
        <div className='progressBar mx-auto absolute'>
        <div style={{width: page === 0 ? '35%': page === 1 ? '70%': '100%'}}></div>
{/* 
          <div style={{width: page === 0 ? '25%': page === 1 ? '50%': page === 2 ? '75%' : '100%' }}></div> */}
        </div>
        </div>
        <div className='form-container'>
          <div className='header relative'>
            <p className='mx-9 px-2  abosolute'>{formTitle[page]}</p>
          </div>
          <div className='body'>
            {pageDisplay()}
          </div>
          <div className='footer'>
            <div className='container flex justify-around mt-4 mb-8'>
              <button className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer  hover:text-emerald transistion-200 ease-in-out'
                disabled={page == 0}
                onClick={() => {
                  setPage((currentPage) => currentPage - 1)
                }}
              >
                Prev
              </button>
              <button className='bg-emerald-700 text-white uppercase py-2 px-4 rounded font-semibold cursor-pointer border-2 border-emerald-700  hover:text-emerald transistion-200 ease-in-out'
              // disabled={page == formTitle.length - 1}
                onClick={() => {
                  if(page === formTitle.length - 1 ){
                    handleSubmit();
                  }else{
                     setPage((currentPage) => currentPage + 1)
                  }
                }}
              >
                {page === formTitle.length - 1  ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </section>
    
    </>
  )
}

export default Stepper