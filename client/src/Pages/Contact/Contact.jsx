import React, { useState } from 'react';
import ConImage from '../../assets/image/caim.gif';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { FaTelegramPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../Components/Hook/authContext';

const apiUrl = 'https://aim-for-more-server.onrender.com';

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
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="mt-20 container mx-auto px-4 flex flex-col md:flex-row items-start gap-10">
          
          {/* Image Side */}
          <div className="md:w-1/2 rounded-xl block md:hidden overflow-hidden shadow-lg bg-white">
            <img src={ConImage} alt="contact" className="w-full h-full object-cover" />
          </div>

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
