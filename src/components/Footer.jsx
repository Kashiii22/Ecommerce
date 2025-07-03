import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section brand" data-aos="fade-up">
          <h2>Shopify</h2>
          <p>Your go-to destination for stylish, affordable fashion. We deliver trends with quality and care.</p>
        </div>

        <div className="footer-section links" data-aos="fade-up" data-aos-delay="100">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section service" data-aos="fade-up" data-aos-delay="200">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section newsletter" data-aos="fade-up" data-aos-delay="300">
          <h4>Subscribe</h4>
          <p>Get the latest news and exclusive offers.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaYoutube />
          </div>
        </div>

      </div>

    
    </footer>
  );
};

export default Footer;
