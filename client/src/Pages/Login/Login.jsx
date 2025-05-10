import { useEffect, useState } from "react"
import { Button, Form, Col, Container, Row, Card, Alert } from "react-bootstrap"
import {useNavigate, useSearchParams,  Link, } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Components/Hook/authContext";
import Navbar from "../../Components/Navbar/Navbar";


const apiUrl = 'https://aim-for-more.vercel.app'

export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async(e)=>{
    e.preventDefault();
  try {
    setLoading(true)
    const response = await axios.post(`${apiUrl}/api/users/login`, {email,password});
      console.log(response);
      if(response.data.message){
        login(response.data.user)
       localStorage.setItem('token', response.data.token)
       if(response.data.user.role === 'user'){
        navigate('/')
      toast.success(response.data.message)
      }else{
        navigate('/dashboard')
      toast.success(response.data.message)
      }
      }
  } catch (error) {
    setLoading(false);
      toast.error(error.response.data.message);
      setError(error.response.data.message)
  }finally{
    setLoading(false)
  }
}
  return (
    <>
    <Navbar/>

    <section className="pt-3">
      <Container className="d-flex align-items-center justify-center" style={{minHeight: "70vh"}}>
        <div className="w-100"  style={{maxWidth: "400px"}}>
          <>
              <Card className="shadow-lg">
                <Card.Body>
                  <h2 className="text-center mb-1">Login</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" required onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" required onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button disabled={loading} variant="success" className="w-100 mt-2" type="submit">
                      Log in
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-2">Need an account? <Link to='/register'>Register</Link></div>
                </Card.Body>
              </Card>
             
          </>
        </div>
      </Container>
    </section>
    </>
  )
}
