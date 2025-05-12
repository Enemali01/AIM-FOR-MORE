import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShoppingCart, FaPhoneAlt, FaRocket, FaStore, FaChartLine, FaAward } from 'react-icons/fa';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer'

const timelineData = [
  {
    year: '2021',
    icon: <FaRocket />,
    title: 'Launch Year',
    description: 'We launched with a mission to simplify shopping for everyone.',
  },
  {
    year: '2022',
    icon: <FaStore />,
    title: '1K+ Products Listed',
    description: 'Expanded our inventory and onboarded quality sellers.',
  },
  {
    year: '2023',
    icon: <FaChartLine />,
    title: 'Massive Growth',
    description: 'Surpassed 10K users and scaled up operations.',
  },
  {
    year: '2024',
    icon: <FaAward />,
    title: 'Award Winning Service',
    description: 'Recognized for excellent customer satisfaction and innovation.',
  },
];

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="px-4 py-10 md:px-20 bg-gray-50 container mt-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center text-emerald-700 mb-6">About Us</h1>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
          We are a customer-first e-commerce platform dedicated to delivering quality products quickly and reliably. Our mission is to make online shopping easy, affordable, and accessible to everyone.
        </p>
      </motion.div>

      {/* Icons Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16"
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
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center bg-emerald-600 text-white py-10 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to start shopping?</h2>
        <p className="mb-6">Explore our wide range of quality products today.</p>
        <a href="/" className="bg-white text-emerald-700 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition">Shop Now</a>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">Our Journey</h2>
        <div className="relative border-l-4 border-emerald-600 pl-6 space-y-10">
          {timelineData.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -left-8 top-1 text-emerald-600 text-xl bg-emerald-100 rounded-full p-2">
                {event.icon}
              </div>
              <h3 className="text-xl font-semibold text-emerald-800">{event.year} - {event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
