import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBox, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import ProductSalesChart from './ProductChart'; // Ensure correct casing

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0); // New state for products count
  const [totalOrders, setTotalOrders] = useState(0); // Placeholder for total orders if needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('access_token') || '';

  const optionsLeft = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDateLeft = startDate.toLocaleDateString('en-US', optionsLeft);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total customers
        const customerResponse = await fetch('http://127.0.0.1:5000/users', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!customerResponse.ok) {
          throw new Error('Network response was not ok: ' + customerResponse.statusText);
        }
        
        const customerData = await customerResponse.json();
        setTotalCustomers(customerData.length); // Adjust based on actual data structure
        
        // Fetch total products
        const productResponse = await fetch('http://127.0.0.1:5000/products', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!productResponse.ok) {
          throw new Error('Network response was not ok: ' + productResponse.statusText);
        }
        
        const productData = await productResponse.json();
        setTotalProducts(productData.length); 
        
        // Fetch total orders if needed
        const orderResponse = await fetch('http://127.0.0.1:5000/orders', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!orderResponse.ok) {
          throw new Error('Network response was not ok: ' + orderResponse.statusText);
        }
        const orderData = await orderResponse.json();
        setTotalOrders(orderData.length);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    } else {
      setError('No authorization token found.');
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div style={{ marginTop: '15px', marginLeft: '15px' }}>
        <h2 className="welcome-heading">Welcome to the Admin Dashboard</h2>
        <span className="date-display">{formattedDateLeft}</span>
        <Outlet />

        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <div className="card-icon" style={{ backgroundColor: '#BA0C2F', border: '2px solid #BA0C2F' }}>
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="card-details">
                <h4>Total Customers</h4>
                {loading ? (
                  <span className="card-value">Loading...</span>
                ) : error ? (
                  <span className="card-value" style={{ color: 'red' }}>Error: {error}</span>
                ) : (
                  <span className="card-value">{totalCustomers}</span>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon" style={{ backgroundColor: '#F7931A', border: '2px solid #F7931A' }}>
                <FontAwesomeIcon icon={faBox} />
              </div>
              <div className="card-details">
                <h4>Total Products</h4>
                {loading ? (
                  <span className="card-value">Loading...</span>
                ) : error ? (
                  <span className="card-value" style={{ color: 'red' }}>Error: {error}</span>
                ) : (
                  <span className="card-value">{totalProducts}</span>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-icon" style={{ backgroundColor: '#5D32D9', border: '2px solid #5D32D9' }}>
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <div className="card-details">
                <h4>Total Orders</h4>
                {loading ? (
                  <span className="card-value">Loading...</span>
                ) : error ? (
                  <span className="card-value" style={{ color: 'red' }}>Error: {error}</span>
                ) : (
                  <span className="card-value">{totalOrders}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <ProductSalesChart />
        </div>
      </div>
      {/* <div className="content_1">

        


      </div> */}
    </div>
  );
};

export default Dashboard;