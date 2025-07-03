import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './Header';
import Footer from './Footer';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // 🧪 Sample order data with placeholder images
    const sampleOrders = [
      {
        id: '1001',
        status: 'Delivered',
        total: 1598,
        date: '2024-07-20',
        items: [
          {
            product_name: 'Elegant Kurti',
            product_img: 'https://via.placeholder.com/120x150.png?text=Product+1',
            size: 'M',
            quantity: 2,
            total_price: 799 * 2,
          },
        ],
      },
      {
        id: '1002',
        status: 'Out for Delivery',
        total: 2199,
        date: '2024-07-22',
        items: [
          {
            product_name: 'Royal Blue Gown',
            product_img: 'https://via.placeholder.com/120x150.png?text=Product+2',
            size: 'L',
            quantity: 1,
            total_price: 2199,
          },
        ],
      },
    ];

    setOrders(sampleOrders);
  }, []);

  return (
    <>
      <Header />
      <div className="my-orders">
        <h2 data-aos="fade-down">My Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders" data-aos="fade-up">No orders placed yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order, index) => (
              <div key={index} className="order-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="order-header">
                  <h4>Order #{order.id}</h4>
                  <span className={`status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-body">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <img src={item.product_img} alt={item.product_name} />
                      <div className="details">
                        <h5>{item.product_name}</h5>
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>₹{item.total_price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p><strong>Placed On:</strong> {order.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
