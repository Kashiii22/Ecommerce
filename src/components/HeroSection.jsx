import React, { useEffect } from 'react';
import './HeroSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import hero1 from '../assets/img/hero/h1_hero1.png';
import hero2 from '../assets/img/hero/h1_hero2.png';
import hero3 from '../assets/img/hero/h1_hero3.png';

const slides = [
  {
    img: hero1,
    text: 'Discover Timeless Elegance',
  },
  {
    img: hero2,
    text: 'Unleash Your Inner Style',
  },
  {
    img: hero3,
    text: 'Step into Luxury Fashion',
  },
];

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="hero-slider">
      <div className="slides">
        {slides.map((slide, i) => (
          <div className="slide" key={i}>
            <img src={slide.img} alt={`slide-${i}`} />
            <div className="hero-text" data-aos="fade-up">
              <h1>{slide.text}</h1>
              <button className="shop-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
