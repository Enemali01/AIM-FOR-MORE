import { Router } from "express"
import {create,deleteProduct,editProduct,getProduct, productById,getProductsByCategory,searchProduct } from '../controller/productController.js'
import upload from "../midlleware/imageMiddleware.js";
import authMiddleware from '../midlleware/authMiddleware.js'

const router = Router();

router.get('/all', getProduct)
router.get('/search', searchProduct)
router.get('/all-product', authMiddleware, getProduct)
router.post('/add', upload.single('file'), create)
router.get('/all-product/:id', authMiddleware,productById)
router.get('/:id', productById)
router.get('/category/:id', getProductsByCategory);
router.put('/update/:id', upload.single('file'),authMiddleware, editProduct);
router.delete('/:id', deleteProduct)

export default router