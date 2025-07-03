import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './Header';
import {
  FaStar,
  FaRegStar,
  FaClipboardCheck,
  FaTruckLoading,
  FaShippingFast,
  FaBoxOpen
} from 'react-icons/fa';

const sampleOrder = {
  id: 'ORD12345678',
  date: '2024-08-15',
  total: '₹4,299.00',
  status: 'Out for Delivery',
  items: [
    {
      title: 'Elegant Red Kurti',
      quantity: 2,
      price: '₹1,299',
      image: '/assets/sample1.jpg',
    },
    {
      title: 'Silk Embroidered Dupatta',
      quantity: 1,
      price: '₹1,699',
      image: '/assets/sample2.jpg',
    },
  ],
};

const statusIcons = {
  'Ordered': <FaClipboardCheck size={20} />,
  'Dispatched': <FaTruckLoading size={20} />,
  'Out for Delivery': <FaShippingFast size={20} />,
  'Delivered': <FaBoxOpen size={20} />,
};

const statuses = ['Ordered', 'Dispatched', 'Out for Delivery', 'Delivered'];

const OrderDetails = () => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
   <>
   <Header/>
    <div className="order-details-page">
      <h2 data-aos="fade-down">Order Details</h2>

      <div className="order-info" data-aos="fade-up">
        {/* <h3 className="info-heading">📦 Order Summary</h3> */}
        <div className="info-cards">
          <div className="info-card">
            <p className="label">Order ID</p>
            <p className="value">{sampleOrder.id}</p>
          </div>
          <div className="info-card">
            <p className="label">Order Date</p>
            <p className="value">{sampleOrder.date}</p>
          </div>
          <div className="info-card">
            <p className="label">Total</p>
            <p className="value">{sampleOrder.total}</p>
          </div>
        </div>
      </div>

      <div className="order-timeline" data-aos="fade-up">
        {statuses.map((step, i) => {
          const isActive = step === sampleOrder.status;
          const isDone = statuses.indexOf(sampleOrder.status) > i;
          return (
            <div
              key={i}
              className={`timeline-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
            >
              <span className="dot">{statusIcons[step]}</span>
              <span className="label">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="ordered-items" data-aos="fade-up">
        {sampleOrder.items.map((item, i) => (
          <div className="order-item-card" key={i}>
            <img src={item.image} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>Qty: {item.quantity}</p>
              <p className="price">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="review-section" data-aos="fade-up">
        <h3>Rate Your Experience</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span key={star} onClick={() => setRating(star)}>
              {rating >= star ? <FaStar color="#f1c40f" /> : <FaRegStar />}
            </span>
          ))}
        </div>
        <textarea placeholder="Write your review..." />
        <button className="submit-review">Submit Review</button>
      </div>
    </div>
   </>
  );
};

export default OrderDetails;
