import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Stepper from './Stepper'


const Checkout = () => {

  return (
    <>
    <Navbar/>
    <section className='md:w-1/2 mx-auto shadow-xl rounded-2xl pb-6 bg-white'>
    <div className='container horizontal mt-5'>
      <Stepper 
       
      />
      </div>

    </section>
    </>
  )
}

export default Checkout