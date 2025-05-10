import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../Hook/authContext'



const apiUrl = 'https://aim-for-more-server.onrender.com '


const Account = () => {
 
  const {user} = useAuth();
  const [loading] = useState(false)

 
  return (
    <>
   {loading ? <div className='mx-auto text-bold text-center'>Loading</div> :
    <section>
      <div className=''>
      <Container className="d-flex align-items-center justify-center px-4 py-3" style={{minHeight: "60vh"}}>
      <div className="w-100"  style={{maxWidth: "400px"}}>
        <>
        <h6>User's Account Details</h6>
        <Card className="shadow-lg">
                <Card.Body>
                  <Form>
                    <Form.Group id="firstname">
                      <Form.Label>Firstname</Form.Label>
                      <Form.Control 
                       name="firstname" 
                        id='firstname'
                      disabled
                      value={user.firstname}
                      
                       />
                    </Form.Group>
                    <Form.Group id="lastname">
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control 
                      
                      disabled
                      name="lastname"
                      id='lastname'
                      value={user.lastname}
                     
                      />
                      </Form.Group>
                      <Form.Group id="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                      id='phone' 
                      disabled
                      name="phone"
                      value={user.phone}
                                          />
                      </Form.Group>
                      <Form.Group id="email">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                      id='email' 
                      disabled
                      name="email"
                      value={user.email}
                    />
                    </Form.Group>
                   
                  </Form>

                </Card.Body>
              </Card>
        </>
      </div>
    </Container>
      </div>
    </section>
    }
    </>
  )
}

export default Account