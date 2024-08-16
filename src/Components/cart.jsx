import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, updateCart }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from localStorage if cartItems is not provided
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems && cartItems.length > 0) {
      setCart(cartItems);
      updateLocalStorage(cartItems);
    } else if (savedCart.length > 0) {
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, [cartItems]);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log('Updated local storage:', JSON.parse(localStorage.getItem('cart')));
  };

  const removeFromCart = (productId) => {
    // Remove item from the cart
    const updatedCart = cart.filter(item => item.id !== productId);
    
    // Log the updated cart
    console.log('Updated cart:', updatedCart);
    
    // Update state and local storage
    setCart(updatedCart);
    updateCart(updatedCart);
    
    // Log local storage update
    updateLocalStorage(updatedCart);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    updateCart(updatedCart);
    updateLocalStorage(updatedCart); 
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return <div className="empty-cart">Your cart is empty!</div>;
  }

  // Calculate total amount
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h3>Shopping Cart for RayGen Properties</h3>
      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td><img src={item.image_url} alt={item.name} className="cart-image" /></td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cart-summary">
        <h3>Total Amount</h3>
        <p>${totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      </div>
    </div>
  );
}

export default Cart;