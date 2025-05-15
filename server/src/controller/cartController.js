
// import { Cart } from "../model/cartModel.js";
// import mongoose from 'mongoose';

// // Save or update cart
// // export const addToCart = async (req, res) => {
// //   const { userId, cartItems } = req.body;

// //   if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
// //     return res.status(400).json({ error: 'Invalid or missing userId' });
// //   }

// //   try {
// //     const bill = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

// //     const updatedCart = await Cart.findOneAndUpdate(
// //       { userId },
// //       {
// //         $set: {
// //           items: cartItems.map(item => ({
// //             ...item,
// //             id: item.ItemId.toString(), // Ensure `id` is saved for react-use-cart compatibility
// //           })),
// //           bill,
// //         },
// //       },
// //       {
// //         new: true,
// //         upsert: true,
// //         runValidators: true,
// //       }
// //     );

// //     res.status(200).json({ message: 'Cart saved successfully', cart: updatedCart });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Error saving cart', message: err.message });
// //   }
// // };

// export const addToCart = async (req, res) => {
//   const { userId, cartItems } = req.body;

//   if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ error: 'Invalid or missing userId' });
//   }

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       // No cart exists, create new one
//       const bill = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//       cart = new Cart({
//         userId,
//         items: cartItems.map(item => ({
//           ItemId: item.ItemId,
//           id: item.ItemId.toString(),
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           file: item.file,
//         })),
//         bill,
//       });
//     } else {
//       // Merge items
//       cartItems.forEach(newItem => {
//         // const existingItem = cart.items.find(
//         //   item => item.ItemId.toString() === newItem.ItemId.toString()
//         // );
//         const newItemId = String(newItem.ItemId);
//         const existingItem = cart.items.find(item => String(item.ItemId) === newItemId);


//         if (existingItem) {
//           existingItem.quantity += newItem.quantity;
//         } else {
//           cart.items.push({
//             ItemId: newItem.ItemId,
//             id: newItem.ItemId.toString(),
//             name: newItem.name,
//             price: newItem.price,
//             quantity: newItem.quantity,
//             file: newItem.file,
//           });
//         }
//       });

//       // Recalculate total
//       cart.bill = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     }

//     const updatedCart = await cart.save();
//     res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });

//   } catch (err) {
//     console.error('Cart save error:', err);
//     res.status(500).json({ error: 'Error saving cart', message: err.message });
//   }
// };



// // Get cart
// // export const getCart = async (req, res) => {
// //   const { userId } = req.params;

// //   try {
// //     const userCart = await Cart.findOne({ userId });
// //     if (!userCart) {
// //       return res.status(404).json({ message: 'No cart found for this user' });
// //     }

// //     res.status(200).json({ cart: userCart });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Error retrieving cart', message: err.message });
// //   }
// // };

// export const getCart = async (req, res) => {
//   const { userId } = req.params;

//   // Validate and convert userId to ObjectId
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: 'Invalid userId format' });
//   }

//   try {
//     const objectId = new mongoose.Types.ObjectId(userId);

//     const userCart = await Cart.findOne({ userId: objectId });
//     if (!userCart) {
//       return res.status(404).json({ message: 'No cart found for this user' });
//     }

//     res.status(200).json({ cart: userCart });
//   } catch (err) {
//     res.status(500).json({ error: 'Error retrieving cart', message: err.message });
//   }
// };



// // Clear cart
// export const clearCart = async (req, res) => {
//   const { userId } = req.body;

//   try {
//     const result = await Cart.updateOne(
//       { userId },
//       { $set: { items: [], bill: 0 } }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(404).json({ success: false, message: "Cart not found or already empty" });
//     }

//     res.json({ success: true, message: "Cart cleared successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to clear cart" });
//   }
// };

// export default { getCart, addToCart, clearCart };



import jwt from 'jsonwebtoken';
import { Cart } from "../model/cartModel.js";
import mongoose from 'mongoose';

// Add items to the cart or update if they already exist
export const addToCart = async (req, res) => {
  const { userId, cartItems } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // No cart exists, create a new one
      const bill = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      cart = new Cart({
        userId,
        items: cartItems.map(item => ({
          ItemId: item.ItemId,
          id: item.ItemId.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          file: item.file,
        })),
        bill,
      });
    } else {
      // Merge items into the existing cart
      cartItems.forEach(newItem => {
        const newItemId = String(newItem.ItemId);
        const existingItem = cart.items.find(item => String(item.ItemId) === newItemId);

        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push({
            ItemId: newItem.ItemId,
            id: newItem.ItemId.toString(),
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity,
            file: newItem.file,
          });
        }
      });

      // Recalculate the total bill
      cart.bill = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    const updatedCart = await cart.save();
    res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });

  } catch (err) {
    console.error('Cart save error:', err);
    res.status(500).json({ error: 'Error saving cart', message: err.message });
  }
};

// Get cart items for the user
export const getCart = async (req, res) => {
  const { userId } = req.params;

  // Validate and convert userId to ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    const userCart = await Cart.findOne({ userId: objectId });
    if (!userCart) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    res.status(200).json({ cart: userCart });
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving cart', message: err.message });
  }
};

// Clear cart for the user
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


export const updateCartItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate presence and type
  if (!userId || !productId || typeof quantity !== 'number') {
    return res.status(400).json({ error: "Missing or invalid data", body: req.body });
  }

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid ObjectId format" });
  }

  try {
    console.log("Incoming update payload:", req.body);

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found for this user" });
    }
    const item = cart.items.find(item => String(item.ItemId) === String(productId));

    // const item = cart.items.find(
    //   item => String(item.ItemId) === String(productId)
    // );

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Update quantity
    item.quantity = quantity;

    // Recalculate bill
    cart.bill = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const updatedCart = await cart.save();

    return res.status(200).json({ success: true, cart: updatedCart });

  } catch (err) {
    console.error("Update cart item error:", err);
    return res.status(500).json({ error: "Update failed", message: err.message });
  }
};


export const removeCartItem = async (req, res) => {
  // console.log("Incoming delete request body:", req.body); 
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'Missing userId or productId' });
  }

  try {
    const cart = await Cart.updateOne(
      { userId },
      { $pull: { items: { ItemId: productId } } }
    );
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    
    

    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



export const cartCount = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await UserModel.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = await Cart.findOne({ userId: user._id });
    const itemCount = cart ? cart.items.length : 0;

    res.json({ itemCount });
  } catch (error) {
    console.error('Error fetching cart count:', error.message);
    res.status(500).json({ message: 'Error fetching cart count' });
  }
};



export default { getCart, addToCart, clearCart, updateCartItem, removeCartItem, cartCount };
