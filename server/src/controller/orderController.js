import { Order } from "../model/orderModel.js";
import {UserModel} from '../model/userModel.js'

// Create an order
export const placeOrder = async (req, res) => {
 
  const { userId, items, bill, address, phone, payment } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required order data' });
  }

  try {
    const order = new Order({
      userId,
      items,
      bill,
      address, phone, payment,
      status: 'pending',
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', message: err.message });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', message: err.message });
  }
};



// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!['pending', 'completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ success: true, order: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order', message: err.message });
  }
};

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// };


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'lastname email phone') // <== populate user details

    res.status(200).json({ success: true, orders })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', message: err.message })
  }
}


export const getCompletedOrders = async (req, res) => {
  const { userId } = req.params;
  try {
   const orders = await Order.find({ userId, status: 'completed' }).sort({ createdAt: -1 });
    // Check if orders were returned
    if (orders.length === 0) {
      return res.status(404).json({ error: "No completed orders found for this user" });
    }
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.log(err)
     res.status(500).json({ error: 'Failed to fetch completed orders', message: err.message });
  }
};

export const getPendingOrdersByStatus = async (req, res) => {
  try {
   const orders = await Order.countDocuments({status: 'pending'});
    res.status(200).json({ total: orders });
  } catch (err) {
    console.log(err)
  //   res.status(500).json({ message: 'Error fetching total order count', error: err.message });
   }
};

export const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.status(200).json({ total: totalOrders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total order count', error: error.message });
  }
};






export default {placeOrder, getUserOrders, updateOrderStatus, getAllOrders, getCompletedOrders, getTotalOrders, getPendingOrdersByStatus}