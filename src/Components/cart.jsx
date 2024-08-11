import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import a spinner from react-spinners

function Cart({ cartItems, updateCart }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    updateCart(updatedCart);
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

  const handleCheckout = async () => {
    let phoneNumber = localStorage.getItem('phone_number');
    
    if (phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.substring(1);
    }
  
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
    setLoading(true);
    setPaymentStatus('Prompt sent, waiting for payment...');
  
    try {
      const response = await fetch('http://127.0.0.1:5000/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: totalAmount
        }),
      });
  
      if (response.ok) {
        const paymentResponse = await response.json(); 
  
        if (paymentResponse.success) { 
          setPaymentStatus('Payment successful!');
  
          setCart([]);
          localStorage.removeItem('cart');
          updateCart([]);
  
          navigate('/checkout');
        } else {
          setPaymentStatus('Payment failed. Please try again.');
        }
      } else {
        setPaymentStatus('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setPaymentStatus('Payment failed due to a network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };  

  if (cart.length === 0) {
    return <div className="empty-cart">Your cart is empty!</div>;
  }

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
                <td>Ksh {item.price}</td>
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
        <p>Ksh {totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout} className="checkout-button" disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>
        {paymentStatus && (
          <div className="payment-status">
            {loading && <ClipLoader size={25} color={"#123abc"} />} {/* Loader icon */}
            <p className={paymentStatus.includes('successful') ? 'success-message' : 'error-message'}>
              {paymentStatus}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
