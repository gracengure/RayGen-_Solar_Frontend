import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button, Paper, Typography } from '@mui/material';

function Cart({ cartItems, updateCart }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('Standard');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [showDeliveryCard, setShowDeliveryCard] = useState(true); // Control the visibility of the card
  const [checkoutInitiated, setCheckoutInitiated] = useState(false); // Track checkout initiation
  const paymentCardRef = useRef(null);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paymentCardRef.current && !paymentCardRef.current.contains(event.target)) {
        setShowDeliveryCard(false); // Hide the payment card when clicking outside
      }
    };

    if (checkoutInitiated) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [checkoutInitiated]);

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

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0) + deliveryFee;

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
          amount: totalAmount,
          location: location,
          option: deliveryOption,
          notes: additionalNotes
        }),
      });

      if (response.ok) {
        const paymentResponse = await response.json();

        if (paymentResponse.success) {
          setPaymentStatus('Payment successful!');

          setCart([]);
          localStorage.removeItem('cart');
          updateCart([]);

          setShowDeliveryCard(false); // Hide delivery card after successful payment
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

  const handleProceedToCheckout = () => {
    setCheckoutInitiated(true);
    setShowDeliveryCard(true); // Show the card when proceeding to checkout
  };

  if (cart.length === 0) {
    return <div className="empty-cart">Your cart is empty!</div>;
  }

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalPrice = totalAmount + deliveryFee;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box flex="1">
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
      </Box>

      {checkoutInitiated && showDeliveryCard ? (
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Paper
            ref={paymentCardRef}
            elevation={3}
            style={{ width: 300, padding: '16px', position: 'fixed', bottom: 0, right: 0 }}
          >
            <Typography variant="h6">Delivery Information</Typography>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <InputLabel>Delivery Option</InputLabel>
                <Select
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  label="Delivery Option"
                >
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Express">Express</MenuItem>
                  <MenuItem value="Same-day">Same-day</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                label="Additional Notes"
                variant="outlined"
                multiline
                rows={4}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body1">Delivery Fee: Ksh {deliveryFee.toFixed(2)}</Typography>
              <Typography variant="h6">Total Price: Ksh {totalPrice.toFixed(2)}</Typography>
            </Box>
            <Button
              onClick={handleCheckout}
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              style={{
                marginTop: '16px',
                backgroundColor: '#009344', // M-Pesa green
                color: '#ffffff', // White text
                borderRadius: '4px', // Rounded corners
                textTransform: 'none', // Preserve text case
              }}
            >
              {loading ? 'Processing...' : 'Pay with M-Pesa'}
            </Button>
            {paymentStatus && (
              <Box mt={2} textAlign="center">
                {loading && <ClipLoader size={25} color={"#123abc"} />}
                <Typography variant="body1" color={paymentStatus.includes('successful') ? 'success' : 'error'}>
                  {paymentStatus}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
