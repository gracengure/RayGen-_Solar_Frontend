import React from 'react';
import './Dashboard.css'; // Make sure to create this CSS file

const Dashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <nav className="dashboard-nav">
                    <ul>
                        <li><a href="#profile">Profile</a></li>
                        <li><a href="#settings">Settings</a></li>
                        <li><a href="#logout">Logout</a></li>
                    </ul>
                </nav>
            </header>
            <div className="dashboard-body">
                <aside className="dashboard-sidebar">
                    <ul>
                        <li><a href="#overview">Overview</a></li>
                        <li><a href="#analytics">Analytics</a></li>
                        <li><a href="#reports">Reports</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <section className="dashboard-cards">
                        <div className="card">
                            <h2>Total Sales</h2>
                            <p>$10,000</p>
                        </div>
                        <div className="card">
                            <h2>New Users</h2>
                            <p>150</p>
                        </div>
                        {/* Add more cards as needed */}
                    </section>
                    <section className="dashboard-charts">
                        {/* Add charts here */}
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
