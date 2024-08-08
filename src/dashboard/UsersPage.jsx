import React from 'react';
import './UsersPage.css'; // We'll create this file for styling

const CustomersPage = () => {
    return (
        <div className="customers-page">
            <h1>Customers</h1>
            <input type="text" placeholder="Search Customer ..." className="search-bar" />
            <table className="customers-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Location</th>
                        <th>Orders</th>
                        <th>Total Expenditure</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {}
                </tbody>
            </table>
        </div>
    );
};

export default CustomersPage;
