import {Router} from 'express'
import {login, register, verify,  logout, getUserById, editUser} from '../controller/userController.js'
import authMiddleware from '../midlleware/authMiddleware.js'

const router = Router();

router.post('/login', login)
router.post('/register', register)
router.get('/verify', authMiddleware, verify)
router.get('/user/:id',authMiddleware ,getUserById)
router.put('/:id', authMiddleware, editUser)
// router.get('/', auth)



export default router