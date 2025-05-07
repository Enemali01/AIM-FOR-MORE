import {Router} from 'express'
import authMiddleware from '../midlleware/authMiddleware.js'
import {addAdmin, getAdmin, getAdminById} from '../controller/adminController.js'

const router = Router()

router.get('/all',authMiddleware, getAdmin)
router.post('/add',authMiddleware, addAdmin)
router.get('/:id',authMiddleware, getAdminById)

export default router