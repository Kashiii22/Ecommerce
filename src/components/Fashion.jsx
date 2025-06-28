import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Fashion.css';

import img1 from '../assets/img/gallery/p1.png';
import img2 from '../assets/img/gallery/p2.png';

const Fashion = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:400,600', 'Playfair Display:600,700'],
      },
    });
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="fashion-section">
      <h2 data-aos="fade-up" className="fashion-title">
        Fashion
      </h2>
      <div className="fashion-grid">
        <div className="fashion-card" data-aos="fade-right">
          <img src={img1} alt="Men's Fashion" />
          <div className="fashion-text">
            <p>Beauty in Red</p>
          </div>
        </div>
        <div className="fashion-card" data-aos="fade-left">
          <img src={img2} alt="Women's Fashion" />
          <div className="fashion-text">
            <p>Shades that style you well</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fashion;
