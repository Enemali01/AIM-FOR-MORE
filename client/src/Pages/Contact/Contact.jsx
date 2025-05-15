import React, { useState } from 'react';
import ConImage from '../../assets/image/caim.gif';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { FaTelegramPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../Components/Hook/authContext';

const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';

const Contact = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lastname.trim() || !firstname.trim() || !message.trim()) {
      toast.error('All fields required');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/contact/`, {
        userId: user?._id,
        lastname,
        firstname,
        message
      });
      if (response.data.success) {
        setFirstname('');
        setLastname('');
        setMessage('');
        setError('');
        toast.success(response.data.message);
      } else {
        setError(response.data.message);
        setTimeout(() => setError(''), 5000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
<<<<<<< HEAD
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="mt-20 container mx-auto px-4 flex flex-col md:flex-row items-start gap-10">
          
          {/* Image Side */}
          <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg bg-white">
            <img src={ConImage} alt="contact" className="w-full h-full object-cover" />
          </div>
=======
    <> 
    <Navbar/>
    <section>
     <div className='flex flex-col md:flex-row justify-between space-x-10 mt-15 container'>
        <div className='md:w-2/3 '>
            <div className='shadow-xl border'>
              <img src={ConImage} alt='contact image' className='object-contain hidden md:block'/>
            </div>
        </div>
        <div className='md:w-2/3 bg-white pb-8'>
            <div className=' shadow-md border p-4'>
              <p className='text-bold text-2xl text-center  mx-auto '>Contact Us</p>
              {error && (
                <><Alert variant="danger" className='relative rounded text-red-100'>{error}  
                <button onClick={() =>setError('')} className='absolute  top-0 buttom-0 right-0  text-red-700 '>
                <span className='text-4xl px-3 py-5'>&times;</span>
              </button>
              </Alert> 
              
              </>
              )}
              <form onSubmit={handleSubmit}>
              <label 
              htmlFor='Lastname' 
              className='text-sm font-medium text-gray-700'>
                Lastname
              </label>
              <input type='text'
              value={lastname}
              name='lastname'
               placeholder='Lastname' 
                className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
                onChange={(e) => setLastname(e.target.value)}
                />
                <label 
              htmlFor='Firstname' 
              className='text-sm font-medium text-gray-700'>
                Firstname
              </label>
              <input 
              type='text'
              name='firstname'
              value={firstname}
               placeholder='Firstname'  
               className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
               onChange={(e) => setFirstname(e.target.value)}
               />
                <label 
              htmlFor='Email Address' 
              className='text-sm font-medium text-gray-700'>
                Message
              </label>
              <textarea type='text'
                  name='message'
                  value={message}
                  placeholder='Enter message'
                  className='mt-1 p-2 block w-full border border-gray-400 rounded-md'
                  rows='6'
                  onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className='items-center text-center py-3'>
                   <button type='submit' className='w-full justify-center flex gap-1 bg-emerald-700 py-2 px-4  items-center text-white text-center space-x-2 rounded text-decoration-none text-white'>
                      Message                 
                      <FaTelegramPlane/>
                  </button>
                  </div>
              </form>
            </div>
        </div>
     </div>
    </section>
    <Footer/>
    </>
  )
}
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e

          {/* Form Side */}
          <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-semibold text-center mb-4 text-emerald-700">Contact Us</h2>

            {error && (
              <Alert variant="danger" className="relative text-sm text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
                {error}
                <button
                  onClick={() => setError('')}
                  className="absolute top-0 bottom-0 right-2 text-xl font-bold text-red-700"
                >
                  &times;
                </button>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Lastname</label>
                <input
                  type="text"
                  value={lastname}
                  name="lastname"
                  placeholder="Enter your lastname"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Firstname</label>
                <input
                  type="text"
                  value={firstname}
                  name="firstname"
                  placeholder="Enter your firstname"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={message}
                  placeholder="Enter your message"
                  rows="5"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 text-white font-semibold py-3 px-4 rounded-md flex justify-center items-center gap-2"
                >
                  Send Message <FaTelegramPlane />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
