import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from './Components/Hook/authContext.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import {CartProvider} from 'react-use-cart'


// Define a custom key for react-use-cart
const CUSTOM_CART_KEY = 'custom-cart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AuthContext>
    <CartProvider localStorageKey="custom-cart">
    <App />
    <ToastContainer 
         position='bottom-right'
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
         />
  </CartProvider>
  </AuthContext>
  </BrowserRouter>
  </StrictMode>,
)


