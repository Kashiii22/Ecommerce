import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import './HeroSection.css';

import img1 from '../assets/img/gallery/gallery1.png';
import img2 from '../assets/img/gallery/gallery2.png';
import img3 from '../assets/img/gallery/gallery3.png';
import img4 from '../assets/img/gallery/gallery4.png';

const arrivals = [
  { title: 'Knitted Jumper', price: '₹1,299', img: img1 },
  { title: 'Hoodie', price: '₹999', img: img2 },
  { title: 'Sneakers', price: '₹1,999', img: img3 },
  { title: 'Smart Casuals', price: '₹799', img: img4 },
];

const NewArrivals = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Playfair Display:600,700', 'Poppins:400,500,600'],
      },
    });
  }, []);

  return (
    <section className="new-arrivals">
      <h2 data-aos="fade-up" style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem' }}>
        New Arrivals
      </h2>

      <div className="arrivals-grid">
        {arrivals.map((item, i) => (
          <div
            className="arrival-card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={`${i * 100}`}
          >
            <img src={item.img} alt={item.title} />
            <div className="arrival-info" style={{ fontFamily: 'Poppins' }}>
              <h4>{item.title}</h4>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="browse-btn-container" data-aos="fade-up">
        <button className="browse-more-btn">Browse More</button>
      </div>
    </section>
  );
};

export default NewArrivals;
