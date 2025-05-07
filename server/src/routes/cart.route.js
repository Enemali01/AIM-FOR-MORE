import {Router} from 'express'
import {getCart,addToCart, clearCart} from '../controller/cartController.js'
import authMiddleware from '../midlleware/authMiddleware.js'

const router = Router();

router.get('/cart/:userId',  getCart) 
router.post('/add-to-cart', addToCart)
router.post('/clear-cart', clearCart)



export default router