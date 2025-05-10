
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Form,Button,Container, Card, Alert } from "react-bootstrap";
import useAuth from "../../Components/Hook/authContext";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from 'react-toastify'
import axios from "axios";

const apiUrl = 'https://aim-for-more-server.onrender.com '

function Register() {
  const [email, setEmail] = useState() 
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  

  const handleSubmit = async (e) => {
   e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/users/register`,{email, password, confirmPassword, lastname, firstname, phone})
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.message)
    }
  }

  return (
    <>
    <Navbar/>
    <Container className="d-flex align-items-center justify-center px-4 py-3 mx-auto mt-20" style={{minHeight: "60vh"}}>
      <div className="w-100"  style={{maxWidth: "400px"}}>
        <>
        <Card className="shadow-lg">
                <Card.Body>
                  <h2 className="text-center mb-1">Register</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="firstname">
                      <Form.Label>Firstname</Form.Label>
                      <Form.Control 
                      type="text"
                       name="firstname" 
                       required 
                       onChange={e => setFirstname(e.target.value)}
                       />
                    </Form.Group>
                    <Form.Group id="lastname">
                      <Form.Label>Lastname</Form.Label>
                      <Form.Control 
                      type="lastname"
                      name="lastname"
                      required 
                      onChange={e => setLastname(e.target.value)}
                      />
                      </Form.Group>
                      <Form.Group id="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                      type="number"
                      name="phone"
                      required 
                      onChange={e => setPhone(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group id="email">
                      <Form.Label>Enail</Form.Label>
                      <Form.Control 
                      type="email"
                      name="email"
                      required 
                      onChange={e => setEmail(e.target.value)}
                      />
                    </Form.Group>
                      <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                      type="password"
                      name="password"
                      required 
                      onChange={e => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group id="Confirmpassword">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control 
                      type="password"
                      name="password"
                      required 
                      onChange={e => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Button disabled={loading} variant="success" className="w-100 mt-2" type="submit">
                     Register
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-2">Already have an Account? <Link to='/login'>Login</Link></div>
                </Card.Body>
              </Card>
        </>
      </div>
    </Container>
    </>
  )
}

export default Register