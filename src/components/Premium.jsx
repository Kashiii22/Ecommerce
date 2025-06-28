import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import WebFont from 'webfontloader';
import './Premium.css';

const features = [
  {
    img: 'https://img.icons8.com/ios-filled/100/000000/delivery.png',
    title: 'Free & Fast Delivery',
    desc: 'Get your orders quickly with no extra cost.',
    delay: 0,
  },
  {
    img: 'https://img.icons8.com/ios-filled/100/000000/return.png',
    title: 'Easy Returns',
    desc: 'Hassle-free 7-day return policy.',
    delay: 100,
  },
  {
    img: 'https://img.icons8.com/ios-filled/100/000000/happy.png',
    title: 'Customer Satisfaction',
    desc: 'Rated 4.8/5 by thousands of happy customers.',
    delay: 200,
  },
  {
    img: 'https://img.icons8.com/ios-filled/100/000000/customer-support.png',
    title: 'Instant Support',
    desc: '24/7 live chat and quick email assistance.',
    delay: 300,
  },
];

const Premium = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:400,600'],
      },
    });
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="premium-section">
      <h2 data-aos="fade-up">Premium Benefits</h2>
      <div className="premium-grid">
        {features.map((item, i) => (
          <div
            className="premium-card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={item.delay}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Premium;
