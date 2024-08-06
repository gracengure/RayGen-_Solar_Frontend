import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="sb_footer section_padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links_div">
                        <h4>Company</h4>
                        <p>About us</p>
                        <p>Our services</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Get Help</h4>
                        <p>Resources</p>
                        <p>FAQs</p>
                        <p>Payment methods</p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>Online Shops</h4>
                        <p>Solar Products</p>
                        <p>Solar Wall Lighting</p>
                        <p>Solar Street Lighting</p>
                    </div>
                    <div className="sb__footer-links_div">
                        <h4>More Info</h4>
                        <p>About us</p>
                        <p>Press</p>
                        <p>Careers</p>
                        <p>Contact</p>
                    </div>
                </div>
                
                <div className="contact-info-and-links">
                    <div className="contact-info">
                        <h4>Contact Us</h4>
                        <div className="contact-info-details">
                            <p>Phone:  07 34 457 284</p>
                            <p>Email: <a href="mailto:info@raygen.com">RayGen@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="sb__footer-below-links">
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Security</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="social-media-section">
                <h4></h4>
                <div className="socialmedia">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="[fb]" alt="" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="[twitter]" alt="" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="[ass]" alt="" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="[insta]" alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
