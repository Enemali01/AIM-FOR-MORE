import {Router} from "express";
import {placeOrder, getUserOrders, updateOrderStatus, getAllOrders, getCompletedOrders, getTotalOrders, getPendingOrdersByStatus} from '../controller/orderController.js'


const router = Router()

router.post('/', placeOrder);
router.get('/all', getAllOrders);

// Then the dynamic route
router.get('/:userId', getUserOrders);
router.put('/status/:orderId', updateOrderStatus);
router.get('/completed/:userId', getCompletedOrders)
router.get('/total/count', getTotalOrders);
router.get('/total/pending', getPendingOrdersByStatus);

export default router;
