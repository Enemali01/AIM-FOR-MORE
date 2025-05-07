import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Services = () => {
  return (
    <>
    <section className='pb-5 '>
      <div  className='bg-white shadow-lg'>
        <h4 className='text-center pt-5'>Investment Option</h4>
        <div className='pb-5'>
            <Container>
              <Row>
                <Col sm={4}>
                  <p>
                 <b className='text-success text-2xl text-justify'>"    </b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
     <b className='text-success text-2xl'>"</b>
                  </p>
                  <button className='bg-emerald-700 text-white px-3 py-2'>Investment</button>
                </Col>
                <Col sm={8}></Col>
              </Row>
            </Container>
        </div>
      </div>
    </section>
    
    </> 
  )
}

export default Services