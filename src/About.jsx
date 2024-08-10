import React from "react";
import './About.css';
import image from './assets/solar_lamp_post.jpg'; // Ensure this path is correct

const About = () => {
    return (
        <div className="container">
            <div className="about-card">
                <div className="details-card">
                    <div className="details-container">
                        <h1 className="about-title">About Raygen</h1>
                        <p className="about-intro">
                            Welcome to Raygen, your comprehensive platform for exploring, purchasing, and managing solar lighting and equipment solutions. Designed with user convenience and sustainability in mind, our app provides a seamless experience from discovering solar products to managing your energy needs. Here’s what you can expect from our app:
                        </p>
                        <div className="about-section">
                            <h2>Our Mission</h2>
                            <p>
                                At Raygen, our mission is to empower individuals and communities by providing accessible, high-quality solar lighting and equipment solutions. We are committed to promoting sustainable energy practices and enhancing the quality of life through innovative solar technology.
                            </p>
                        </div>
                        <div className="about-section">
                            <h2>Our Provisions</h2>
                            <ul>
                                <li>Comprehensive Installation Services</li>
                                <li>High-Quality Solar Products</li>
                                <li>Maintenance and Support</li>
                                <li>Educational Resources</li>
                                <li>Financial Solutions</li>
                                <li>Eco-Friendly Practices</li>
                                <li>Customer-Centric Solutions</li>
                                <li>Community Engagement</li>
                            </ul>
                        </div>
                        <div className="about-section">
                            <h2>Location</h2>
                            <p>
                                At Raygen, we are strategically positioned to serve you better. Our headquarters are located in the heart of Nairobi City, Kenya, providing us with a central base to efficiently manage and support our growing customer base. Our office is equipped with state-of-the-art facilities and a dedicated team of professionals committed to delivering the best solar solutions and customer service.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="image-card">
                    <img src={image} alt="Solar Energy" className="about-image" />
                </div>
            </div>
        </div>
    );
}

export default About;
