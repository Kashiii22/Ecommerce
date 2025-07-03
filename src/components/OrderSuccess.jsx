// components/OrderSuccess.jsx
import React, { useEffect } from 'react';
import './OrderSuccess.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header';
const OrderSuccess = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
  <>
  <Header/>
    <div className="order-success">
      <div className="success-box" data-aos="zoom-in">
        <FaCheckCircle className="check-icon" />
        <h1>Your Order is Confirmed!</h1>
        <p className="desc">
          Thank you for shopping with us. You’ll receive an order confirmation email shortly.
        </p>

        <div className="btn-group" data-aos="fade-up" data-aos-delay="200">
          <Link to="/" className="success-btn outline">Continue Shopping</Link>
          <Link to="/orders" className="success-btn filled">View My Orders</Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default OrderSuccess;
