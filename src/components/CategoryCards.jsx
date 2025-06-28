import React from 'react';
import './HeroSection.css';
import img1 from '../assets/img/gallery/popular1.png';
import img2 from '../assets/img/gallery/popular2.png';
import img3 from '../assets/img/gallery/popular3.png';
import img4 from '../assets/img/gallery/popular4.png';

const categories = [
  { title: 'Glasses', img: img1 },
  { title: 'Watches', img: img2 },
  { title: 'Jackets', img: img3 },
  { title: 'Clothes', img: img4 },
];

const CategoryCards = () => {
  return (
    <section className="categories-section">
      <div className="category-grid">
        {categories.map((cat, i) => (
          <div className="category-card" key={i} data-aos="zoom-in">
            <img src={cat.img} alt={cat.title} />
            <div className="hover-info">
              <h3>{cat.title}</h3>
              <button>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
