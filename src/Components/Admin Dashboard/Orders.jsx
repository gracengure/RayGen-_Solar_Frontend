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
    </div>
  );
};

export default Order;
