
import { Cart } from "../model/cartModel.js";
import mongoose from 'mongoose';

// Save or update cart
export const addToCart = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

  try {
    const bill = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          items: cartItems.map(item => ({
            ...item,
            id: item.ItemId.toString(), // Ensure `id` is saved for react-use-cart compatibility
          })),
          bill,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({ message: 'Cart saved successfully', cart: updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error saving cart', message: err.message });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    res.status(200).json({ cart: userCart });
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving cart', message: err.message });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const result = await Cart.updateOne(
      { userId },
      { $set: { items: [], bill: 0 } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "Cart not found or already empty" });
    }

    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};

export default { getCart, addToCart, clearCart };
