import React, { useState } from 'react'
import ConImage from '../../assets/image/caim.gif'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { FaTelegramPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../../Components/Hook/authContext'


const apiUrl = 'http://localhost:5000';


const Contact = () => {
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  // const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const {user} = useAuth()
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!lastname.trim() || !firstname.trim() || !message.trim()){
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
      if(response.data.success){
        setFirstname('');
        setLastname('');
        setMessage('');
        setError('');
        toast.success(response.data.message)
      } else{
        setError(response.data.message)
        setTimeout(()=> setError(''), 5000);
      }
    } catch (error) {
      setError(error.response.data.message)
      setTimeout(()=> setError(''), 5000);
    }
   
  }

  return (
    <> 
    <Navbar/>
    <section>
     <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8 container'>
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

export default Contact