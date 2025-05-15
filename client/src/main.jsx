import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from './Components/Hook/authContext.jsx'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
// import {CartProvider} from 'react-use-cart'


<<<<<<< HEAD
// Define a custom key for react-use-cart
=======
// // Define a custom key for react-use-cart
>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
// const CUSTOM_CART_KEY = 'custom-cart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AuthContext>
<<<<<<< HEAD
    {/* <CartProvider localStorageKey="custom-cart"> */}
=======
  <CartProvider storage={typeof window !== 'undefined' ? localStorage : null} storageKey="custom-cart">

>>>>>>> 084b55a81113ef0de4db035d2fb9573fe07c907e
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
  {/* </CartProvider> */}
  </AuthContext>
  </BrowserRouter>
  </StrictMode>,
)


