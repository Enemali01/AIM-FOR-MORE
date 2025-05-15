
import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/Hook/authContext';

const apiUrl = 'https://aim-for-more-server.onrender.com';

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  useEffect(() => {
    if (!user?._id) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/cart/cart/${user._id}`);
        console.log("Fetched cart:", response.data);

        const items = response.data.items || response.data.cart?.items || [];
        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user?._id]);

  // Remove item from cart
 
  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        // Remove item from UI
        const updated = cartItems.filter(item => item.ItemId !== productId);
        setCartItems(updated);
  
        // Send delete request to backend
        await axios.delete(`${apiUrl}/api/cart/remove`, {
          data: { userId: user._id, productId }
        });
      } else {
        // Optimistically update the UI
        const updated = cartItems.map(item =>
          item.ItemId === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updated);
  
        // Send the request to update quantity
        await axios.put(`${apiUrl}/api/cart/update`, {
          userId: user._id,
          productId,
          quantity: newQuantity,
        });
      }
  
      // Notify the navbar to refresh count
      window.dispatchEvent(new Event('cartUpdated'));
  
    } catch (err) {
      console.error('Error updating/removing cart item:', err.response?.data || err.message);
    }
  };
  
   // Calculate totals
  const totalUniqueItems = cartItems.length;
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Cart ({totalUniqueItems} items)
        </h2>

        {loading ? (
          <p className="text-center">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p className="text-center">
            Your cart is empty. <br /><br />
            <Link to="/product" className="bg-emerald-700 text-white px-3 py-2 rounded">
              Shop Page
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.ItemId} // Ensure using the correct field for unique key
                  className="border p-4 rounded shadow-md flex justify-between items-center"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.file}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p>₦{item.price} x {item.quantity}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateQuantity(item.ItemId, item.quantity - 1)} // Pass ItemId here
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          className="bg-emerald-700 text-white px-2 rounded"
                          onClick={() => updateQuantity(item.ItemId, item.quantity + 1)} // Pass ItemId here
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold">₦{item.price * item.quantity}</p>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="border p-4 rounded shadow-md h-fit">
              <h3 className="text-xl font-bold mb-4">Summary</h3>
              <p className="mb-2">
                Total Items: <span className="font-semibold">{totalUniqueItems}</span>
              </p>
              <p className="mb-4">
                Total Amount: <span className="font-bold text-xl">₦{cartTotal}</span>
              </p>
              <Link to="/checkout">
                <button className="w-full bg-emerald-700 text-white px-4 py-2 rounded">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
