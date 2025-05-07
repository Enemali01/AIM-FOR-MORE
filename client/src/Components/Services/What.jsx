import React from 'react'
import { motion } from 'framer-motion';
import * as FaIcon from 'react-icons/fa'
import * as CiIcon from 'react-icons/ci'
import * as FcIcon from 'react-icons/fc'
import { FaUsers, FaShoppingCart, FaPhoneAlt, FaRocket, FaStore, FaChartLine, FaAward } from 'react-icons/fa';

const Services = () => {
  const style = { fontSize: '3.5rem' }
  return (
    <>
    <section className='container mt-4'>
       {/* Icons Section */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center mb-16"
>
  <div>
    <FaUsers className="text-4xl text-emerald-600 mx-auto mb-2" />
    <h3 className="font-bold text-lg">10K+ Users</h3>
    <p className="text-gray-600">Trusted by a growing community</p>
  </div>
  <div>
    <FaShoppingCart className="text-4xl text-emerald-600 mx-auto mb-2" />
    <h3 className="font-bold text-lg">Seamless Shopping</h3>
    <p className="text-gray-600">Easy and secure checkout experience</p>
  </div>
  <div>
    <FaPhoneAlt className="text-4xl text-emerald-600 mx-auto mb-2" />
    <h3 className="font-bold text-lg">24/7 Support</h3>
    <p className="text-gray-600">We’re here when you need us</p>
  </div>
  <div>
    <FaAward className="text-4xl text-emerald-600 mx-auto mb-2" />
    <h3 className="font-bold text-lg">Award Winning</h3>
    <p className="text-gray-600">Recognized for excellence in service</p>
  </div>
  <div>
    <FaChartLine className="text-4xl text-emerald-600 mx-auto mb-2" />
    <h3 className="font-bold text-lg">Growth Driven</h3>
    <p className="text-gray-600">Constantly evolving to serve you better</p>
  </div>
</motion.div>
</section>

    </>
  )
}

export default Services