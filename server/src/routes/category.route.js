import { Router } from "express";
import authMiddleware from '../midlleware/authMiddleware.js'
import {createCategory, getAllCategory, deleteCategory, editCategory, getById} from "../controller/categoryController.js";

const router = Router()

router.post('/add', authMiddleware, createCategory)
router.get('/all', getAllCategory)
router.get('/category/:id', getById)

router.put('/update/:id', authMiddleware, editCategory)
router.delete('/remove/:id', authMiddleware,deleteCategory)


export default router;