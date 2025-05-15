// import React from 'react'
// import Navbar from '../../Components/Navbar/Navbar'
// import {Container, Row, Col} from 'react-bootstrap'
// import Search from '../../Components/Search/Search'
// import Slider from '../../Components/Slider/Slider'
// import Thumbnails from '../Thumbnails/Thumbnails'
// import What from '../../Components/Services/What'
// import Services from '../../Components/Services/Services'
// import Frequent from '../../Components/Frequent/Frequent'
// import Footer from '../../Components/Footer/Footer'


// function Home() {

//   return (
//     <>
//     <Navbar/>
//     <Slider/>
//     <section>
//       <Thumbnails/>
//       <What/>
//       <Services/>
//       <Frequent/>
//       <Footer/>
//     </section>

//     </>
//   )
// }

// export default Home


// import React, { useState } from 'react';
// import Navbar from '../../Components/Navbar/Navbar';
// import { Container, Row, Col } from 'react-bootstrap';
// import Slider from '../../Components/Slider/Slider';
// import Thumbnails from '../Thumbnails/Thumbnails';
// import What from '../../Components/Services/What';
// import Services from '../../Components/Services/Services';
// import Frequent from '../../Components/Frequent/Frequent';
// import Footer from '../../Components/Footer/Footer';
// import Testimonial from '../../Components/Testimonial/Testimonial';

// function Home() {
//   const [showAllProducts, setShowAllProducts] = useState(false);

//   const toggleShowAllProducts = () => {
//     setShowAllProducts(prevState => !prevState);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Slider Section */}
//       <Slider />

//       {/* Main Content Section */}
//       <section className="bg-gray-50 py-10">
//         <Container>
//           <Row className="justify-content-center">
//             <Col lg={10} className="text-center">
//               <h2 className="text-3xl font-bold text-emerald-800 mb-4">Discover Amazing Products and Services</h2>
//               <p className="text-lg text-gray-600 mb-6">Explore our diverse offerings that suit all your needs.</p>
//             </Col>
//           </Row>

//           {/* Thumbnails Section - Limited to 3 products initially */}
//           <Row className="mb-12">
//             <Col lg={12}>
//               <Thumbnails limit={showAllProducts ? 100 : 3} />

//             </Col>
//           </Row>

//           {/* What We Offer Section */}
//           <Row className="mb-12">
//             <Col lg={12}>
//               <What />
//             </Col>
//           </Row>

//           {/* Services Section */}
//           <Row className="mb-12">
//             <Col lg={12}>
//               <Services />
//             </Col>
//           </Row>

//           {/* Frequently Asked Questions */}
//           <Row className="mb-12">
//             <Col lg={12}>
//               <Frequent />
//             </Col>
//           </Row>

//           {/* Customer Testimonials Section with Slider */}
//          <Testimonial/>
//         </Container>
//       </section>

//       {/* Footer Section */}
//       <Footer />
//     </>
//   );
// }

// export default Home;



import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Container, Row, Col } from 'react-bootstrap'
import Slider from '../../Components/Slider/Slider'
import Thumbnails from '../Thumbnails/Thumbnails'
import What from '../../Components/Services/What'
import Services from '../../Components/Services/Services'
import Frequent from '../../Components/Frequent/Frequent'
import Footer from '../../Components/Footer/Footer'
import Testimonial from '../../Components/Testimonial/Testimonial'
import axios from 'axios'
import { Link, Links } from 'react-router-dom'
import { FaStar, FaShippingFast, FaHeadset } from 'react-icons/fa'; // Add this at the top of your Home.jsx


const apiUrl = 'http://localhost:5000https://aim-for-more-server.onrender.com';

function Home() {
  const [categories, setCategories] = useState([])
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false)

  const [popularProducts, setPopularProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all popular products
    axios.get(`${apiUrl}/api/popular/`)
      .then(response => {
        setTrending(response.data);
      })
      .catch(error => console.error('Error fetching popular products', error));
  }, []);



  useEffect(() => {
    axios.get(`${apiUrl}/api/category/all`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [])
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(../src/assets/cop-img10.jpeg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our E-commerce Store</h1>
          <p className="text-lg mb-8">Discover amazing products, just a click away</p>
          <button className="px-8 py-3 bg-emerald-600 text-white text-lg rounded hover:bg-emerald-700 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-8">Shop by Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {categories.map(category => (
                  <div key={category._id} className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <Link to={`/product`} className='text-decoration-none text-success'>
                      <h3 className="text-sm font-semibold text-emerald-800 cursor-pointer hover:text-emerald-600">
                        {category.category}
                      </h3>
                    </Link>

                  </div>
                ))}

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 bg-white">
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-8">Trending Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {trending.map(product => (
                  <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
                    <img src={product.image} alt={product.product.name} className="w-90 h-38 object-cover rounded-t-lg" />
                    <div className='flex justify-between mt-2 px-4 py-3'>
                    <h6 className="text-lg font-semibold text-emerald-800">{product.product.name}</h6>
                    <h6 className="text-lg font-semibold text-emerald-800">N{product.product.amount}</h6>
                    </div>
                    <p className="text-gray-600">{product.product.description}</p>
                    <Link to='/product' className='text-decoration-none'><button className=" px-4 py-2 bg-emerald-700 text-white text-sm rounded">View More</button>
                    </Link>
                  </div>
                ))}

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Shop With Us Section */}


      {/* Why Shop With Us Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <Container>
          <Row className="text-center">
            <Col lg={12}>
              <h2 className="text-3xl font-semibold mb-6">Why Shop With Us?</h2>
              <p className="text-lg mb-12 max-w-2xl mx-auto">
                We offer the best products at unbeatable prices, backed by excellent customer service and fast delivery.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-emerald-700 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4 text-4xl text-yellow-300">
                    <FaStar />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Top Quality</h3>
                  <p>All our products are carefully selected to ensure the best quality for our customers.</p>
                </div>
                <div className="p-6 bg-emerald-700 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4 text-4xl text-blue-200">
                    <FaShippingFast />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
                  <p>We ship quickly and securely to get your orders to your doorstep in no time.</p>
                </div>
                <div className="p-6 bg-emerald-700 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4 text-4xl text-pink-200">
                    <FaHeadset />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                  <p>Have questions? Our friendly support team is always ready to help you.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <Testimonial />

      {/* FAQ Section */}
      <Frequent />

      {/* Footer Section */}
      <Footer />
    </>
  );
}

export default Home;
