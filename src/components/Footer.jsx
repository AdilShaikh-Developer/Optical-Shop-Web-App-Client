// code below is generated through chatGPT
import React from "react";
import { CiFacebook, CiTwitter, CiInstagram } from "react-icons/ci";
import { Link } from "react-router-dom"; // Import Link from 'react-router-dom' for navigation

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo">Your Optical Shop</h2>
            <p>
              Providing quality eyewear for a clearer vision. Visit us and
              experience the best eye care services.
            </p>
            <div className="contact">
              <span>Contact Us: contact@youropticalshop.com</span>
            </div>
            <div className="social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiInstagram />
              </a>
            </div>
          </div>
          <div className="footer-section quick-links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              {/* Add more quick links as needed */}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Optical Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
