import {Router} from 'express'
import { contactUs, getAllContactUs } from '../controller/contactController.js'
import authMiddleware from '../midlleware/authMiddleware.js'

const route = Router();

route.post('/', contactUs)
route.get('/contact', authMiddleware, getAllContactUs)


export default route