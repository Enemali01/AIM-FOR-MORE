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
import { FaStar, FaShippingFast, FaHeadset } from 'react-icons/fa';
import heroImg from '../../assets/cop-img10.jpeg'


const apiUrl = 'https://aim-for-more-server.onrender.com';

function Home() {
  const [categories, setCategories] = useState([])
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false)

  const [popularProducts, setPopularProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

 useEffect(() => {
  setLoading(true);
  axios.get(`${apiUrl}/api/popular/`)
    .then(response => setTrending(response.data))
    .catch(error => console.error('Error fetching popular products', error))
    .finally(() => setLoading(false));
}, []);

useEffect(() => {
  setLoading(true);
  axios.get(`${apiUrl}/api/category/all`)
    .then(response => setCategories(response.data))
    .catch(error => console.error('Error fetching categories:', error))
    .finally(() => setLoading(false));
}, []);




  // useEffect(() => {
  //   axios.get(`${apiUrl}/api/category/all`)
  //     .then(response => {
  //       setCategories(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching categories:', error);
  //     });
  // }, [])
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen w-full" style={{backgroundImage:`url(${heroImg})`}}>
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
        {/* <Container>
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
        </Container> */}
        {/* {loading
  ? [...Array(4)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-lg text-center animate-pulse">
        <div className="h-6 bg-emerald-100 rounded w-2/3 mx-auto"></div>
      </div>
    ))
  : categories.map(category => (
      <div key={category._id} className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Link to={`/product`} className="text-decoration-none text-success">
          <h3 className="text-sm font-semibold text-emerald-800 cursor-pointer hover:text-emerald-600">
            {category.category}
          </h3>
        </Link>
      </div>
    ))} */}

      </section>
      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-8">Shop by Categories</h2>
    
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {loading
        ? [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-6 bg-emerald-100 rounded w-2/3 mx-auto mb-2"></div>
              <div className="h-4 bg-emerald-100 rounded w-1/3 mx-auto"></div>
            </div>
          ))
        : categories.map((category) => (
            <div key={category._id} className="bg-white p-6 rounded-lg shadow text-center">
              <Link to={`/product`} className="text-decoration-none text-success">
                <h3 className="text-sm font-semibold text-emerald-800 cursor-pointer hover:text-emerald-600">
                  {category.category}
                </h3>
              </Link>
            </div>
          ))}
    </div>
  </div>
</section>


      {/* Trending Products Section */}
      <section className="py-16 bg-white">
        {/* <Container>
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
        </Container> */}

        {loading
  ? [...Array(3)].map((_, i) => (
      <div key={i} className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between mt-2 px-4 py-3">
          <div className="w-1/2 h-4 bg-emerald-100 rounded"></div>
          <div className="w-1/4 h-4 bg-emerald-100 rounded"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
        <div className="mt-4 h-8 w-24 bg-emerald-300 rounded"></div>
      </div>
    ))
  : trending.map(product => (
      <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
        <img src={product.image} alt={product.product.name} className="w-90 h-38 object-cover rounded-t-lg" />
        <div className="flex justify-between mt-2 px-4 py-3">
          <h6 className="text-lg font-semibold text-emerald-800">{product.product.name}</h6>
          <h6 className="text-lg font-semibold text-emerald-800">N{product.product.amount}</h6>
        </div>
        <p className="text-gray-600">{product.product.description}</p>
        <Link to='/product' className='text-decoration-none'>
          <button className="px-4 py-2 bg-emerald-700 text-white text-sm rounded">View More</button>
        </Link>
      </div>
    ))}

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
