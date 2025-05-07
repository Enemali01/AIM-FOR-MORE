import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import {Container, Row, Col} from 'react-bootstrap'
import Search from '../../Components/Search/Search'
import Slider from '../../Components/Slider/Slider'
import Thumbnails from '../Thumbnails/Thumbnails'
import What from '../../Components/Services/What'
import Services from '../../Components/Services/Services'
import Frequent from '../../Components/Frequent/Frequent'
import Footer from '../../Components/Footer/Footer'
// import { useAuth } from '../../Hooks/useAuth'

function Home() {
  // const {user} = useAuth()
  return (
    <>
    <Navbar/>
    <Slider/>
    <section>
      <Thumbnails/>
      <What/>
      <Services/>
      <Frequent/>
      <Footer/>
    </section>
  
    </>
  )
}

export default Home