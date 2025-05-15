import {Router} from 'express'
import {getCart,addToCart, clearCart,  updateCartItem,
  removeCartItem, cartCount} from '../controller/cartController.js'
import authMiddleware from '../midlleware/authMiddleware.js'

const router = Router();

router.get('/cart/:userId',  getCart) 
router.get('/count', authMiddleware, cartCount); 
router.delete('/remove', removeCartItem);
router.post('/add-to-cart', addToCart)
router.post('/clear-cart', clearCart)
router.put('/update', updateCartItem);    




export default router