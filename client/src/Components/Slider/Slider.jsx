import { Container, Carousel } from 'react-bootstrap'
import img1 from '../../../src/assets/cop-img11.jpeg'
import img2 from '../../../src/assets/cop-img5.jpeg'
import img3 from '../../../src/assets/cop-img10.jpeg'
import './slider.css'

function Slider() {

  return (
    <>
      <section className=''>
      
      <Carousel fade>
      <Carousel.Item interval={10000}>
        <img
          className='slider'
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
      <img
          className='slider'         
          src={img2}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={10000}>
      <img
          className='slider' 
          src={img3}
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
       
      </section>
      <section>
    
      </section>

    </>
  )
}


export default Slider