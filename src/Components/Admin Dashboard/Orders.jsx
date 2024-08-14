<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './orders.css';


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ name: "", items: "", order_date: "", delivery_date: "", order_status: "", total_expenditure: "" });
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrderName, setEditOrderName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch('http://127.0.0.1:5000/orders');
    const data = await response.json();
    setOrders(data);
  };

  const addOrder = async () => {
    const response = await fetch('http://127.0.0.1:5000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    });

    const data = await response.json();
    if (response.ok) {
      setOrders([...orders, data]);
      setNewOrder({ name: "", items: "", order_date: "", delivery_date: "", order_status: "", total_expenditure: "" });
      setShowModal(false);
    } else {
      console.error("Failed to add order:", data);
    }
  };

  const deleteOrder = async (id) => {
    await fetch(`http://127.0.0.1:5000/orders/${id}`, { method: 'DELETE' });
    setOrders(orders.filter(order => order.id !== id));
  };

  const startEditOrder = (id, name) => {
    setEditOrderId(id);
    setEditOrderName(name);
  };

  const updateOrder = async () => {
    const response = await fetch(`http://127.0.0.1:5000/orders/${editOrderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editOrderName }),
    });

    const updatedOrder = await response.json();
    if (response.ok) {
      setOrders(orders.map(order => (order.id === editOrderId ? updatedOrder : order)));
      setEditOrderId(null);
      setEditOrderName("");
    } else {
      console.error("Failed to update order:", updatedOrder);
    }
  };

  return (
    <div className="order-container">
      <h1>Orders</h1>
      <input
        type="text"
        value={newOrder.name}
        onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
        placeholder="Search Order ..."
      />
      <button onClick={() => setShowModal(true)}>Add Order</button>
      <table className="order-table">
        <thead>
          <tr>
            <th>Customer name</th>
            <th>Items</th>
            <th>Order_date</th>
            <th>Delivery_date</th>
            <th>Order_status</th>
            <th>Total_expenditure</th>
           
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>{order.items}</td>
              <td>{order.order_date}</td>
              <td>{order.delivery_date}</td>
              <td>{order.order_status}</td>
              <td>{order.total_expenditure}</td>
              <td>
                {editOrderId === order.id ? (
                  <input
                    type="text"
                    value={editOrderName}
                    onChange={(e) => setEditOrderName(e.target.value)}
                  />
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => startEditOrder(order.id, order.name)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
                  </>
                )}
                {editOrderId === order.id && (
                  <button className="save-btn" onClick={updateOrder}>Save</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Order</h2>
            <input
              type="text"
              placeholder="Customer name"
              value={newOrder.name}
              onChange={(e) => setNewOrder({ ...newOrder, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Items"
              value={newOrder.items}
              onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
            />
            <input
              type="date"
              placeholder="Order date"
              value={newOrder.order_date}
              onChange={(e) => setNewOrder({ ...newOrder, order_date: e.target.value })}
            />
            <input
              type="date"
              placeholder="Delivery date"
              value={newOrder.delivery_date}
              onChange={(e) => setNewOrder({ ...newOrder, delivery_date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Order status"
              value={newOrder.order_status}
              onChange={(e) => setNewOrder({ ...newOrder, order_status: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total expenditure"
              value={newOrder.total_expenditure}
              onChange={(e) => setNewOrder({ ...newOrder, total_expenditure: e.target.value })}
            />
            <button onClick={addOrder}>Add Order</button>
          </div>
        </div>
      )}
=======
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment
} from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material';
import './orders.css'; // Import custom styles

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchStatus, setSearchStatus] = useState(''); // State for search box input
  const [formData, setFormData] = useState({
    order_date: '',
    total_price: '',
    order_status: '',
    delivery_date: '',
    order_products: []
  });

  // Fetch orders on initial load and when searchStatus changes
  useEffect(() => {
    if (searchStatus) {
      searchOrders();
    } else {
      fetchOrders();
    }
  }, [searchStatus]);

  // Function to fetch orders from the backend
  const fetchOrders = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch('http://127.0.0.1:5000/orders', {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (err) {
      setError('Error fetching orders.');
    }
  };

  // Function to search orders by status
  const searchOrders = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/status?status=${searchStatus}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError('Failed to search orders.');
      }
    } catch (err) {
      setError('Error searching orders.');
    }
  };

  // Function to handle the edit button click
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setFormData({
      order_date: order.order_date ? new Date(order.order_date).toISOString().split('T')[0] : '',
      total_price: order.total_price,
      order_status: order.order_status,
      delivery_date: order.delivery_date ? new Date(order.delivery_date).toISOString().split('T')[0] : '',
      order_products: order.order_products || [] // Ensure this is handled
    });
    setDialogOpen(true);
  };

  // Function to handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/${selectedOrder.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order =>
          order.id === selectedOrder.id ? updatedOrder : order
        ));
        setDialogOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error updating order.');
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setError('Error updating order.');
    }
  };

  // Function to handle delete button click
  const handleDeleteClick = async (orderId) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        setError('Failed to delete the order.');
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      setError('Error deleting the order.');
    }
  };

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    setSearchStatus(e.target.value);
  };

  return (
    <div className="orders-container">
      <div className="header">
        <Typography variant="h4" sx={{ color: 'dodgerblue' }} gutterBottom>
          Orders
        </Typography>
        <TextField
          variant="outlined"
          className="search-bar"
          placeholder="Search by order status..."
          value={searchStatus} // Bind the search box to searchStatus
          onChange={handleSearchChange} // Update searchStatus on change
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: '70px',
            '& fieldset': {
              borderRadius: '70px',
              borderColor: 'dodgerblue',
            },
            '& input': {
              color: 'navy',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'dodgerblue',
              },
              '&:hover fieldset': {
                borderColor: 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'dodgerblue',
              },
            },
          }}
        />
      </div>

      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header-cell">Customer Name</TableCell>
              <TableCell className="table-header-cell">Order Date</TableCell>
              <TableCell className="table-header-cell">Total Expenditure</TableCell>
              <TableCell className="table-header-cell">Order Status</TableCell>
              <TableCell className="table-header-cell">Delivery Date</TableCell>
              <TableCell className="table-header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="table-row">
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>Ksh {order.total_price}</TableCell>
                <TableCell>{order.order_status}</TableCell>
                <TableCell>{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditClick(order)}
                    sx={{ color: 'blue' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(order.id)}
                    sx={{ color: 'red' }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          <TextField
            label="Order Date"
            type="date"
            name="order_date"
            value={formData.order_date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Total Price"
            type="number"
            name="total_price"
            value={formData.total_price}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Order Status"
            name="order_status"
            value={formData.order_status}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Delivery Date"
            type="date"
            name="delivery_date"
            value={formData.delivery_date}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          {/* Handle order_products if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
>>>>>>> 43c84fa25fbcf17a856c6b4e3ae07519c6141a97
    </div>
  );
};

export default Order;
