import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardModal from '../../Components/CardModal/CardModal'; 

const Details = ({ formData, setFormData }) => {
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    if (formData.payment === 'card') {
      setShowCardModal(true);
    }
  }, [formData.payment]);

  const handleCardSubmit = (cardDetails) => {
    setFormData({ ...formData, cardDetails });
    console.log('Card data saved:', cardDetails);
    initiatePayment();
  };

  // Step 3: Create function to initiate payment with Paystack
  const initiatePayment = async () => {
    // Set up payment details (including amount and email) - you will get this dynamically
    const amount = 5000; // For example, ₦5000, replace with actual amount
    const email = 'useremail@example.com'; // Use dynamic email from user

    try {
      const response = await axios.post('http://localhost:5000https://aim-for-more-server.onrender.com/api/paystack/initialize', {
        amount, // Amount to be charged
        email,
      });

      const { authorization_url, reference } = response.data;

      // Step 4: Open the Paystack payment modal
      const handler = window.PaystackPop.setup({
        key: 'pk_test_your_paystack_public_key_here', // Replace with your Paystack public key
        email,
        amount: amount * 100, // Paystack expects the amount in kobo (₦5000 becomes 500000)
        currency: 'NGN',
        ref: reference,
        callback: function (response) {
          // Payment was successful
          console.log(response);
          alert(`Payment successful! Reference: ${response.reference}`);
          // Optionally, send payment success data to backend for record-keeping
        },
        onClose: function () {
          alert('Transaction was not completed!');
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <>
      <section>
        <div className=''>
          <div className='mx-auto rounded-md px-3 py-3'>
            <h6>Delivery Address Details</h6>
            <div className='card container py-3'>
              <form>
                <div>
                  <label className='text-sm font-medium text-gray-700'>Address</label>
                  <input
                    type='text'
                    placeholder='Address'
                    name='address'
                    className='mt-1 w-full p-2 border rounded-md'
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>Additional Phone number</label>
                  <input
                    type='tel'
                    placeholder='+234-0000-000-000'
                    name='phone'
                    className='mt-1 w-full p-2 border rounded-md'
                    maxLength='12'
                    value={formData.phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      setFormData({ ...formData, phone: numericValue });
                    }}
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>Payment Option</label>
                  <select
                    name='payment'
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                    required
                    value={formData.payment}
                    onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                  >
                    <option value='cash'>Pay on delivery</option>
                    <option value='card'>Pay via card</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Card Details Modal */}
      <CardModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSubmit={handleCardSubmit}
      />
    </>
  );
};

export default Details;
